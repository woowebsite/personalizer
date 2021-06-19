import React from 'react';
import { Divider } from 'antd';
import style from './style.module.scss';

const DividerVertical = (props) => {
  return (
    <Divider
      plain
      className={style.dividerVertical}
      orientation="left"
      type="vertical"
    >
      <span>{props.text}</span>
    </Divider>
  );
};

export default DividerVertical;
