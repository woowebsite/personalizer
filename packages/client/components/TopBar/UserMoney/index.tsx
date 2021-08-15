import { useContext } from 'react';
import { UserContext } from '~/layout/AdminLayout';
import { formatMoney } from '~/shared/formatHelper';

const UserMoney = () => {
  const session = useContext(UserContext);
  return (
    <span className="text-danger">
      {formatMoney(session.user.account_money || 0)}
    </span>
  );
};

export default UserMoney;
