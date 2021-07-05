import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  notification,
  Typography,
} from 'antd';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { useIntl } from 'react-intl';
import AuthorizedWrapper from '~/components/AuthorizedWrapper';
import { TaxonomyType } from '~/components/ComboBoxTaxonomy';
import TextEditable from '~/components/TextEditable';
import UserMetaType from '~/features/users/constants/UserMetaType';
import userService from '~/services/userService';
import { formatMoney } from '~/shared/formatHelper';
import { fieldsToMetadata } from '~/shared/metadataHelper';
import settingProfileConfig from '../authorized/profile';
import { hasPermission } from '~/shared/authHelper';
interface AccountMoneyProps {
  className?: string;
  user: any;
  session: any;
}
const { Search } = Input;

const AccountMoney = forwardRef<any, AccountMoneyProps>((props, ref) => {
  const { className, session, ...rest } = props;
  const [user, setUser] = useState(props.user);
  const { formatMessage } = useIntl();
  const t = (id, values?) => formatMessage({ id }, values);
  const [form] = Form.useForm();

  /// EVENTS
  useImperativeHandle(ref, () => ({
    getFieldsValue,
    validateFields,
  }));

  const handleDepositCompleted = result => {
    // update balance
    setUser(result.accountTransactionMoney);
    form.resetFields();

    notification.success({
      message: 'Notification Success',
      description: 'Save successfully',
      placement: 'bottomLeft',
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  };

  const [transactionMoney] = userService.accountTransactionMoney({
    onCompleted: handleDepositCompleted,
  });

  const getFieldsValue = () => form.getFieldsValue();
  const validateFields = () => form.validateFields();

  const handleDeposit = () => {
    const fieldsValue = form.getFieldsValue();

    transactionMoney({
      variables: {
        user: { id: user.id, email: user.email },
        taxonomies: fieldsValue.taxonomies,
      },
    });
  };

  // RENDER
  const actions = hasPermission(settingProfileConfig.AccountMoney, session) && [
    <>
      <Input.Group className="d-flex">
        <Form.Item
          name={['taxonomies', TaxonomyType.Account_Deposit]}
          className="field-number"
        >
          <InputNumber style={{ width: '100%' }} step={1000} />
        </Form.Item>
        <Button type="primary" onClick={handleDeposit}>
          {t('buttons.deposit')}
        </Button>
      </Input.Group>
    </>,
  ];

  return (
    <Form form={form}>
      <Card
        title={t('accountMoney.title')}
        className={`${className} status-form`}
        extra={
          <span className="h5 text-primary">
            {formatMoney(user[UserMetaType.AccountMoney] || 0)}
          </span>
        }
        actions={actions}
        {...rest}
      >
        <Form.Item
          name={['metadata', 'account_holding']}
          className="field-number"
          label={t('accountMoney.label.holding')}
        >
          {formatMoney(user[UserMetaType.AccountHolding] || 0)}
        </Form.Item>

        <Form.Item
          name={['metadata', 'account_dept']}
          className="field-number"
          label={t('accountMoney.label.dept')}
        >
          <span className="text-danger">
            {formatMoney(user[UserMetaType.AccountDept] || 0)}
          </span>
        </Form.Item>
      </Card>
    </Form>
  );
});

export default AccountMoney;
