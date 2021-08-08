import React, { forwardRef } from 'react';
import { useIntl } from 'react-intl';
import { Card, Tabs } from 'antd';
import GeneralForm from './components/GeneralForm';

const { TabPane } = Tabs;

interface IProps {}
const ProductBaseVariation = (props: IProps) => {
  const { formatMessage } = useIntl();
  const t = (id, values?) => formatMessage({ id }, values);

  const callback = key => {
    console.log(key);
  };

  return (
    <Tabs defaultActiveKey="1" onChange={callback}>
      <TabPane tab={t('productBaseVariation.tabs.general.title')} key="1">
        <GeneralForm />
      </TabPane>
      <TabPane tab={t('productBaseVariation.tabs.attributes')} key="2">
        Content of Tab Pane 2
      </TabPane>
      <TabPane tab={t('productBaseVariation.tabs.variations')} key="3">
        Content of Tab Pane 3
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
