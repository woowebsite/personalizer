import React from 'react';
import { Avatar as AntdAvatar } from 'antd';
import EmptyImage from 'components/EmptyImage';

const Avatar = ({ src, ...others }) => {
  let _src =
    src.startsWith('https://') || src.startsWith('http://')
      ? src
      : '/images/' + src;

  if (_src) {
    return <AntdAvatar {...others} src={_src} />;
  }

  return <EmptyImage width={50} height={50} />;
};

export default Avatar;
