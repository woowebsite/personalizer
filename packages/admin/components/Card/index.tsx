import React from 'react';
import { Card as AntdCard, CardProps } from 'antd';

const Card: React.FC<CardProps> = (props) => {
  const { className, children, ...others } = props;
  return (
    <AntdCard className={`shadow-sm bg-white rounded ${className}`} {...others}>
      {children}
    </AntdCard>
  );
};

export default Card;
