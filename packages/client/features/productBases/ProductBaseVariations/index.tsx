import React, { forwardRef } from 'react';
import { useIntl } from 'react-intl';
import { Card, Tabs } from 'antd';
import GeneralForm from './components/GeneralForm';
import AttributeForm from './components/AttributeForm';
import VariationForm from './components/VariationForm';

const { TabPane } = Tabs;

interface IProps {
  initialValues: any;
}
const ProductBaseVariation = (props: IProps) => {
  const { formatMessage } = useIntl();
  const { initialValues } = props;
  const t = (id, values?) => formatMessage({ id }, values);

  const callback = key => {
    console.log(key);
  };

  return (
    <Tabs defaultActiveKey="1" onChange={callback}>
      <TabPane tab={t('productBaseVariation.tabs.general.title')} key="1">
        <GeneralForm initialValues={initialValues} />
      </TabPane>
      <TabPane tab={t('productBaseVariation.tabs.attributes')} key="2">
        <AttributeForm initialValues={initialValues} />
      </TabPane>
      <TabPane tab={t('productBaseVariation.tabs.variations')} key="3">
        <VariationForm initialValues={initialValues} />
      </TabPane>
      <TabPane tab={t('productBaseVariation.tabs.swatches')} key="4">
        Content of Tab Pane 3
      </TabPane>
    </Tabs>
  );
};

export default forwardRef<any, IProps & React.HTMLAttributes<HTMLDivElement>>(
  ProductBaseVariation,
);
