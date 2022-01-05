import React from 'react';
import { Input as AntdInput } from 'antd';

import style from './style.module.scss';

const { Group } = AntdInput;

const Input = (props) => {
  const { children } = props;

  return (
    <AntdInput {...props} className={style['custom-input']} >
      {children}
    </AntdInput>
  );
};

const Password = (props) => {
  const { children } = props;

  return (
    <AntdInput.Password {...props} className={style['custom-input-password']} >
      {children}
    </AntdInput.Password>
  );
};

const TextArea = (props) => {
  const { children } = props;

  return (
    <AntdInput.TextArea {...props} className={style['custom-input-textarea']} >
      {children}
    </AntdInput.TextArea>
  );
};

Input.Password = Password;
Input.TextArea = TextArea;
Input.Group = Group;

export default Input;
