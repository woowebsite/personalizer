import React from 'react';
import { Button as AntdButton, ButtonProps } from 'antd';
import { ButtonGroupProps } from 'antd/lib/button';

import style from './style.module.scss';

interface CustomButtonProps extends React.FC<ButtonProps> {
  Group?: React.FC<ButtonGroupProps>;
}
const Button: CustomButtonProps = (props: ButtonProps) => {
  const { children, className } = props;

  return (
    <AntdButton {...props} className={`${style['custom-button']} ${className}`}>
      {children}
    </AntdButton>
  );
};

const Group = (props) => {
  const { children } = props;

  return (
    <AntdButton.Group {...props} className={style['custom-button-group']}>
      {children}
    </AntdButton.Group>
  );
};

Button.Group = Group;

export default Button;
