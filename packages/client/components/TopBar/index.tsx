import React from 'react';

import UserProfile from './UserProfile';
import TopMenu from './TopMenu';

import style from './style.module.scss';

function TopBar() {
  return (
    <div className={style.topbar}>
      <div className="logo mr-4">
        <a href="#">
          <img src="/assets/logo-jy.png" height="50" />
        </a>
      </div>
      <div className="mr-auto d-none d-sm-block float-left">
        <TopMenu />
      </div>
      <div className="mr-4">
        <UserProfile />
      </div>
    </div>
  );
}

export default TopBar;
