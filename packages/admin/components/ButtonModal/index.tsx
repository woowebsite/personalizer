import React from 'react';
import { Modal, ButtonProps } from 'antd';

import Button from "components/Button";

interface ButtonModalProps {
  config: any;
}

const { confirm } = Modal;

const ButtonModal: React.FC<ButtonProps & ButtonModalProps> = props => {
  const { className, config, children, ...others } = props;
  return (
    <Button
      onClick={() => {
        confirm(config);
      }}
      {...others}
    >
      {children}
    </Button>
  );
};

export default ButtonModal;
