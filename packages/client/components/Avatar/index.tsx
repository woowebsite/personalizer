import React from 'react';
import { Avatar as AntdAvatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const Avatar = ({ src, ...others }) => {
  if (!src) return <AntdAvatar icon={<UserOutlined />} />;

  return (
    <AntdAvatar
      {...others}
      shape="circle"
      size="default"
      icon="user"
      src={'/images/' + src}
    />
  );
};

export default Avatar;
