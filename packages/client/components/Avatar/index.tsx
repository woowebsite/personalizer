import React from 'react';
import { Avatar as AntdAvatar } from 'antd';
import EmptyImage from 'components/EmptyImage';

const Avatar = ({ src, ...others }) => {
  if (!src) return <EmptyImage width={50} height={50} />;

  let _src =
    src.startsWith('https://') || src.startsWith('http://')
      ? src
      : '/images/' + src;

  // if (_src) {
  //   return <AntdAvatar {...others} src={_src} />;
  // }

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
