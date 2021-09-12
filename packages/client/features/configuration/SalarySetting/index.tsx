import { Button, Card, Form, Input, notification } from 'antd';
import React, {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { useIntl } from 'react-intl';
import { fieldsToMetadata } from '~/shared/metadataHelper';
import { UserContext } from '~/layout/AdminLayout';
import PercentInput from '~/components/PercentInput';
import optionService from '~/services/optionService';
import SalarySettingConstant from '../constants/SalarySettingConstant';

interface SalarySettingProps {
  initialValues?: any;
  className?: string;
}
const { Search } = Input;
const layoutForm = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};

const SalarySetting = forwardRef<any, SalarySettingProps>((props, ref) => {
  const { className, initialValues, ...rest } = props;
  const session = useContext(UserContext);
  const [user, setUser] = useState(session.user);
  const { formatMessage } = useIntl();
  const t = (id, values?) => formatMessage({ id }, values);
  const [form] = Form.useForm();

  // EFFECT
  useEffect(
    () => {
      if (initialValues) {
        formSetFields(initialValues);
      }
    },
    [initialValues],
  );

  /// EVENTS
  useImperativeHandle(ref, () => ({
    getFieldsValue,
    validateFields,
  }));

  const formSetFields = data => {
    form.setFields([
      {
        name: ['data', SalarySettingConstant.Retoucher],
        value: data[SalarySettingConstant.Retoucher],
      },
      {
        name: ['data', SalarySettingConstant.Blender],
        value: data[SalarySettingConstant.Blender],
      },
      {
        name: ['data', SalarySettingConstant.Leader],
        value: data[SalarySettingConstant.Leader],
      },
    ]);
  };

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
        title={t('salarySetting.title')}
        className={`${className} status-form`}
        extra={[
          <Button type="primary" onClick={handleSave}>
            {t('buttons.save')}
          </Button>,
        ]}
        {...rest}
      >
        <Form.Item
          name={['data', SalarySettingConstant.Retoucher]}
          label={t('salarySetting.labels.retoucher')}
        >
          <PercentInput />
        </Form.Item>

        <Form.Item
          name={['data', SalarySettingConstant.Blender]}
          label={t('salarySetting.labels.blend')}
        >
          <PercentInput />
        </Form.Item>

        <Form.Item
          name={['data', SalarySettingConstant.Leader]}
          label={t('salarySetting.labels.leader')}
        >
          <PercentInput />
        </Form.Item>
      </Card>
    </Form>
  );
});

export default SalarySetting;
