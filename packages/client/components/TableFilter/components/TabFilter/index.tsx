import { useIntl } from 'react-intl';

import Tabs from 'components/Tabs';

const { TabPane } = Tabs;

const TabFilter = ({ tabs, activeTab, onChange }) => {
  const { formatMessage } = useIntl();
  const t = id => formatMessage({ id: `tableFilter.${id}` });

  return (
    <Tabs defaultActiveKey={activeTab} onChange={onChange}>
      <TabPane tab={t('tabFilter.all')} key={0} />
      {tabs.map(tab => (
        <TabPane tab={tab.title} key={tab.id} />
      ))}
    </Tabs>
  );
};

export default TabFilter;
