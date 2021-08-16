import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import UserTaxonomy from '../../constants/UserTaxonomy';
import JobStatus from '../../constants/JobStatus';
import RoleType from '../../constants/RoleType';
import StatusType from '../../constants/StatusType';
import TaxonomyType from '../../constants/TaxonomyType';
import UserMetaType from '../../constants/UserMetaType';
import {
  JobMeta,
  JobTerm,
  TermTaxonomy,
  User,
  UserMeta,
  UserTerm,
} from '../../models';
import { getEnumLabel } from '../../utils/enumUtil';

export const getAccountHolding = async (user: User) => {
  const roleName = getEnumLabel(RoleType, user.role_id).toLowerCase();

  const q = await JobMeta.findAll({
    where: {
      job_id: {
        [Op.in]: Sequelize.literal(
          `( SELECT j.id FROM JobMeta jm
              INNER JOIN Jobs j ON jm.job_id = j.id 
              WHERE jm.key='` +
            roleName +
            `' AND jm.value='` +
            user.id +
            `' AND j.Status='` +
            JobStatus.InProgress +
            `' )`,
        ),
      },
      key: 'cost',
    },
    raw: true,
  });

  const account_holding = q.reduce(
    (total: number, x) => total + parseInt(x.value),
    0,
  );
  return account_holding;
};

export const transactionMoney = async (
  userId: number,
  taxonomyAction: UserTaxonomy,
  money: number,
) => {
  let moneyCalculated = money;
  switch (taxonomyAction) {
    case UserTaxonomy.Pay:
      moneyCalculated = -moneyCalculated;
      break;
    case UserTaxonomy.Withdraw:
      moneyCalculated = -moneyCalculated;
      break;
    case UserTaxonomy.Holding:
      moneyCalculated = -moneyCalculated;
      break;
  }

  // 3. add UserTerm
  const userTerm: any = {
    term_taxonomy_id: taxonomyAction,
    user_id: userId,
    money: moneyCalculated,
    status: StatusType.Actived,
  };

  await UserTerm.create(userTerm);

  // 4. update account_money to metadata to use directly in session.user

  const accountMoneyMetadata = await UserMeta.findOne({
    where: {
      user_id: userId,
      key: UserMetaType.AccountMoney,
    },
    raw: true,
  });

  const prevMoney = accountMoneyMetadata ? accountMoneyMetadata.value : 0;
  const userMeta: any = {
    id: accountMoneyMetadata.id,
    key: UserMetaType.AccountMoney,
    type: 'number',
    data: +prevMoney + moneyCalculated,
    value: +prevMoney + moneyCalculated,
    status: StatusType.Actived,
    user_id: userId,
    updatedAt: Date.now(),
  };

  await UserMeta.upsert(userMeta);
};

export const upsertMetadata = (
  metadata: UserMeta[],
  old: UserMeta[],
  user_id,
) => {
  metadata.map((meta: UserMeta) => {
    const m = old.find(x => x.user_id === user_id && x.key === meta.key);
    const updateCodeJob: any = {
      id: m && m.id,
      user_id: user_id,
      key: meta.key,
      ...meta,
    };

    UserMeta.upsert(updateCodeJob);
  });
};
