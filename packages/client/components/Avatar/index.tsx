import React from 'react';
import { Avatar as AntdAvatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import style from './style.module.scss';

const Avatar = ({ src, ...others }) => {
  if (!src) return <AntdAvatar className={style['custom-avatar']} icon={<UserOutlined />} />;

  return (
    <AntdAvatar
      {...others}
      shape="circle"
      size="default"
      icon={<UserOutlined />}
      src={'/images/' + src}
    />
  );
};

export default Avatar;
