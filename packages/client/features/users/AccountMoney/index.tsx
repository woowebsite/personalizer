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
import { TaxonomyType } from '~/components/ComboBoxTaxonomy';
import TextEditable from '~/components/TextEditable';
import UserMetaType from '~/features/users/constants/UserMetaType';
import userService from '~/services/userService';
import { formatMoney } from '~/shared/formatHelper';
import { fieldsToMetadata } from '~/shared/metadataHelper';

interface AccountMoneyProps {
  className?: string;
  user: any;
}
const { Search } = Input;

const AccountMoney = forwardRef<any, AccountMoneyProps>((props, ref) => {
  const { className, ...rest } = props;
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

  return (
    <Form form={form}>
      <Card
        title={t('accountMoney.title')}
        className={`${className} status-form`}
        extra={
          <span className="h5 text-primary">
            {' '}
            {formatMoney(user[UserMetaType.AccountMoney])}
          </span>
        }
        actions={[
          <>
            <Input.Group compact>
              <Form.Item
                name={['taxonomies', TaxonomyType.Account_Deposit]}
                className="field-number"
              >
                <InputNumber style={{ width: '100%' }} step={1000} />
              </Form.Item>
              <Button
                type="primary"
                onClick={handleDeposit}
                style={{ width: '30%' }}
              >
                {t('buttons.deposit')}
              </Button>
            </Input.Group>
          </>,
        ]}
        {...rest}
      >
        <Form.Item
          name={['metadata', 'account_holding']}
          className="field-number"
          label={t('accountMoney.label.holding')}
        >
          {formatMoney(user[UserMetaType.AccountHolding])}
        </Form.Item>
        <Form.Item
          name={['metadata', 'account_dept']}
          className="field-number"
          label={t('accountMoney.label.dept')}
        >
          <span className="text-danger">
            {formatMoney(user[UserMetaType.AccountDept])}
          </span>
        </Form.Item>
      </Card>
    </Form>
  );
});

export default AccountMoney;
