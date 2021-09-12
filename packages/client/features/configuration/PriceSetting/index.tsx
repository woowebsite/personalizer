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
import { fieldsToMetadata } from '~/shared/metadataHelper';
import { UserContext } from '~/layout/AdminLayout';
import MoneyInput from '~/components/MoneyInput';
import optionService from '~/services/optionService';
import PriceSettingConstant from '../constants/PriceSettingConstant';

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

  const handleSaveCompleted = result => {
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
  const [upsert] = optionService.upsertOption({
    onCompleted: handleSaveCompleted,
  });

  const getFieldsValue = () => form.getFieldsValue();
  const validateFields = () => form.validateFields();

  const handleSave = () => {
    const fieldsValue = form.getFieldsValue();
    const data = fieldsToMetadata(fieldsValue.data);

    upsert({
      variables: {
        data: data,
      },
    });
  };

  return (
    <Form form={form} {...layoutForm}>
      <Card
        extra={[
          <Button type="primary" onClick={handleSave}>
            {t('buttons.save')}
          </Button>,
        ]}
        title={t('priceSetting.title')}
        className={`${className}`}
        {...rest}
      >
        <Form.Item
          name={['data', PriceSettingConstant.Single]}
          label={t('priceSetting.labels.single')}
        >
          <MoneyInput style={{ width: '70%' }} />
        </Form.Item>
        <Form.Item
          name={['data', PriceSettingConstant.Zoom]}
          label={t('priceSetting.labels.zoom')}
        >
          <MoneyInput style={{ width: '70%' }} />
        </Form.Item>
      </Card>
    </Form>
  );
});

export default PriceSetting;
