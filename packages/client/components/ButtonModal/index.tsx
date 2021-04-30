import React from 'react';
import { Modal, Button, ButtonProps } from 'antd';
import { ModalStaticFunctions } from 'antd/lib/modal/confirm';

interface ButtonModalProps {
  config: any;
}

const { confirm } = Modal;

const ButtonModal: React.FC<ButtonProps & ButtonModalProps> = props => {
  const [modal, contextHolder] = Modal.useModal();
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
