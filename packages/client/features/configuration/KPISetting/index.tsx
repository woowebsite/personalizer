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
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { useIntl } from 'react-intl';
import AuthorizedWrapper from '~/components/AuthorizedWrapper';
import { TaxonomyType } from '~/components/ComboBoxTaxonomy';
import TextEditable from '~/components/TextEditable';
import UserMetaType from '~/features/users/constants/UserMetaType';
import optionService from '~/services/optionService';
import { formatMoney } from '~/shared/formatHelper';
import { fieldsToMetadata } from '~/shared/metadataHelper';
import { hasPermission } from '~/shared/authHelper';
import { UserContext } from '~/layout/AdminLayout';
import MoneyInput from '~/components/MoneyInput';
import PercentInput from '~/components/PercentInput';
import KPISettingConstant from '../constants/KPISettingConstant';

interface KPISettingProps {
  initialValues?: any;
  className?: string;
}
const { Search } = Input;
const layoutForm = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};

const KPISetting = forwardRef<any, KPISettingProps>((props, ref) => {
  const { className, initialValues, ...rest } = props;
  const session = useContext(UserContext);
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
        name: ['data', KPISettingConstant.Employee_Money],
        value: data[KPISettingConstant.Employee_Money],
      },
      {
        name: ['data', KPISettingConstant.Employee_Percent],
        value: data[KPISettingConstant.Employee_Percent],
      },
      {
        name: ['data', KPISettingConstant.Leader_Money],
        value: data[KPISettingConstant.Leader_Money],
      },
      {
        name: ['data', KPISettingConstant.Leader_Percent],
        value: data[KPISettingConstant.Leader_Percent],
      },
    ]);
  };

  const handleSaveCompleted = result => {
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
        title={t('kpiSetting.title')}
        className={`${className}`}
        extra={[
          <Button type="primary" onClick={handleSave}>
            {t('buttons.save')}
          </Button>,
        ]}
        {...rest}
      >
        <Form.Item
          extra={t('kpiSetting.labels.leaderDesc')}
          label={t('kpiSetting.labels.leader')}
        >
          <Form.Item
            name={['data', KPISettingConstant.Leader_Money]}
            style={{ display: 'inline-block; margin: 0 8px 0 0' }}
          >
            <MoneyInput style={{ width: '150px' }} />
          </Form.Item>
          <Form.Item
            name={['data', KPISettingConstant.Leader_Percent]}
            style={{ display: 'inline-block; margin: 0 8px 0 0' }}
          >
            <PercentInput />
          </Form.Item>
        </Form.Item>

        <Form.Item
          label={t('kpiSetting.labels.employee')}
          extra={t('kpiSetting.labels.employeeDesc')}
        >
          <Form.Item
            name={['data', KPISettingConstant.Employee_Money]}
            style={{ display: 'inline-block; margin: 0 8px 0 0' }}
          >
            <MoneyInput style={{ width: '150px' }} />
          </Form.Item>
          <Form.Item
            name={['data', KPISettingConstant.Employee_Percent]}
            style={{ display: 'inline-block; margin: 0 8px 0 0' }}
          >
            <PercentInput />
          </Form.Item>
        </Form.Item>
      </Card>
    </Form>
  );
});

export default KPISetting;
