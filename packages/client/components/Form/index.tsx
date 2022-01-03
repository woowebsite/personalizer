import React from 'react';
import { Form as AntdForm } from 'antd';

const { useForm, Item, List, Provider } = AntdForm;

const Form = ({ labelAlign="left", children, ...props}) => {
  return (
    <AntdForm labelAlign={labelAlign} {...props} >
      {children}
    </AntdForm>
  );
};

Form.useForm = useForm;
Form.Item = Item;
Form.List = List;
Form.Provider = Provider;

export default Form;
