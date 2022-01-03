import React from 'react';
import { Tabs as AntdTabs } from 'antd';

import style from './style.module.scss';

const { TabPane } = AntdTabs;

const Tabs = (props) => {
  const { children } = props;

  return (
    <AntdTabs {...props} className={style['custom-tabs']} >
      {children}
    </AntdTabs>
  );
};

Tabs.TabPane = TabPane;

export default Tabs;
