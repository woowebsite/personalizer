import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import JobStatus from '../../constants/jobStatus';
import RoleType from '../../constants/RoleType';
import { JobMeta, JobTerm, TermTaxonomy, User } from '../../models';
import { getEnumLabel } from '../../utils/enumUtil';

export const getAccountHolding = async (user: User) => {
  const roleName = getEnumLabel(RoleType, user.role_id).toLowerCase();
  console.log('roleName', roleName);

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
