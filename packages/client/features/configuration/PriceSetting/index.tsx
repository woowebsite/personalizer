import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  notification,
  Typography,
} from 'antd';
import React, {
  forwardRef,
  useContext,
  useImperativeHandle,
  useState,
} from 'react';
import { useIntl } from 'react-intl';
import AuthorizedWrapper from '~/components/AuthorizedWrapper';
import { TaxonomyType } from '~/components/ComboBoxTaxonomy';
import TextEditable from '~/components/TextEditable';
import UserMetaType from '~/features/users/constants/UserMetaType';
import userService from '~/services/userService';
import { formatMoney } from '~/shared/formatHelper';
import { fieldsToMetadata } from '~/shared/metadataHelper';
import { hasPermission } from '~/shared/authHelper';
import { UserContext } from '~/layout/AdminLayout';
import MoneyInput from '~/components/MoneyInput';

interface PriceSetting {
  className?: string;
}
const { Search } = Input;
const layoutForm = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};

const PriceSetting = forwardRef<any, PriceSetting>((props, ref) => {
  const { className, ...rest } = props;
  const session = useContext(UserContext);
  const [user, setUser] = useState(session.user);
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
    <Form form={form} {...layoutForm}>
      <Card
        extra={[<Button type="primary">{t('buttons.save')}</Button>]}
        title={t('priceSetting.title')}
        className={`${className}`}
        {...rest}
      >
        <Form.Item label={t('priceSetting.labels.single')}>
          <MoneyInput style={{ width: '70%' }} />
        </Form.Item>
        <Form.Item label={t('priceSetting.labels.zoom')}>
          <MoneyInput style={{ width: '70%' }} />
        </Form.Item>
      </Card>
    </Form>
  );
});

export default PriceSetting;
