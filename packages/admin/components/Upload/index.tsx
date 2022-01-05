import React from 'react';
import { Upload as AntdUpload } from 'antd';

import style from './style.module.scss';

const Upload = (props) => {
  const { children } = props;

  return (
    <AntdUpload {...props} className={style['custom-upload']} >
      {children}
    </AntdUpload>
  );
};

export default Upload;
