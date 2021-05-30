import { Button, Card, Form, Input, InputNumber, Typography } from 'antd';
import React, { forwardRef, useImperativeHandle } from 'react';
import { useIntl } from 'react-intl';
import { TaxonomyType } from '~/components/ComboBoxTaxonomy';
import TextEditable from '~/components/TextEditable';
import userService from '~/services/userService';
import { formatMoney } from '~/shared/formatHelper';
import { fieldsToMetadata } from '~/shared/metadataHelper';

interface AccountMoneyProps {
  className?: string;
  user: any;
}
const { Search } = Input;

const AccountMoney = forwardRef<any, AccountMoneyProps>((props, ref) => {
  const { className, user, ...rest } = props;
  const { formatMessage } = useIntl();
  const t = (id, values?) => formatMessage({ id }, values);
  const [form] = Form.useForm();
  const [transactionMoney] = userService.accountTransactionMoney(); //(userQueries.UPSERT_USER);
  const initialValues = {
    money: 0,
  };

  /// EVENTS
  useImperativeHandle(ref, () => ({
    getFieldsValue,
    validateFields,
  }));

  const getFieldsValue = () => form.getFieldsValue();
  const validateFields = () => form.validateFields();

  const handleDeposit = () => {
    const fieldsValue = form.getFieldsValue();
    const metadata = fieldsToMetadata(fieldsValue.metadata);
    console.log('fieldsValue.taxonomies', fieldsValue.taxonomies);

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
        extra={<span> {initialValues.money}</span>}
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
          <TextEditable
            defaultValue={initialValues.money}
            defaultText={formatMoney(initialValues.money)}
            renderInput={({ handleOnChange, ref, ...rest }) => {
              return (
                <Input
                  ref={ref}
                  onChange={e =>
                    handleOnChange(e.target.value, formatMoney(e.target.value))
                  }
                  style={{ width: '150px', textAlign: 'right' }}
                  {...rest}
                />
              );
            }}
          />
        </Form.Item>
      </Card>
    </Form>
  );
});

export default AccountMoney;
