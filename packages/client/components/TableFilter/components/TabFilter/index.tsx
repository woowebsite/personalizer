import { Tabs } from 'antd';

const { TabPane } = Tabs;

const TabFilter = ({ tabs, activeTab, onChange }) => (
  <Tabs defaultActiveKey={activeTab} onChange={onChange}>
    {tabs.map(tab => (
      <TabPane tab={tab.name} key={tab.id} />
    ))}
  </Tabs>
);

export default TabFilter;
