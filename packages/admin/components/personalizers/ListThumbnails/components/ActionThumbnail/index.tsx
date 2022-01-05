import React, { useState } from 'react';
import { Card, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styles from './style.module.scss';
import modalsProvider from 'components/personalizers/Modals';

const ActionThumbnail = ({ title, onFinish }) => {
  const [visibleModal, setVisibleModal] = useState(false);

  const Modal = modalsProvider['CREATE_ALBUM']({
    title: title,
    visible: visibleModal,
    setVisible: setVisibleModal,
    onFinish,
  });
  return (
    <Card
      hoverable
      className={styles.add}
      onClick={() => setVisibleModal(true)}
    >
      <PlusOutlined />
      {Modal}
    </Card>
  );
};

export default ActionThumbnail;
