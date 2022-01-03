import React from 'react';

import TopMenu from './TopMenu';
import UserProfile from './UserProfile';

import style from './style.module.scss';

function TopBar(props) {
  return (
    <div className={style['top-bar']}>
      {/* Logo */}
      <div className={style['logo']}></div>
      {/* Top menu */}
      <div className="mr-auto d-none d-sm-block">
        <TopMenu data={props.data} />
      </div>

      {/* Right */}
      <div className={style['user-profile']}>
          <UserProfile />
      </div>
    </div>
  );
}

export default TopBar;
