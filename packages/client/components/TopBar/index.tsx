import React from 'react';

import UserProfile from './UserProfile';
import TopMenu from './TopMenu';

import style from './style.module.scss';
import { Divider, Space } from 'antd';
import UserMoney from './UserMoney';

function TopBar(props) {
  return (
    <div className={style.topbar}>
      {/* Left */}
      <div className="logo mr-4">
        <a href="#">
          <img src="/assets/logo-jy.png" height="50" />
        </a>
      </div>
      <div className="mr-auto d-none d-sm-block float-left">
        <TopMenu data={props.data} />
      </div>

      {/* Right */}
      <div className="mr-4">
        <Space align="baseline">
          <UserMoney />
        </Space>
        <Divider
          type="vertical"
          orientation="center"
          className={'border-light'}
          style={{ opacity: 0.3 }}
        />
        <Space align="baseline">
          <UserProfile />
        </Space>
      </div>
    </div>
  );
}

export default TopBar;
