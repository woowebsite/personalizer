import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { useIntl } from 'react-intl';
import { Button, Form, Table as AntdTable, CardProps } from 'antd';
import Card from 'components/Card';
import filterService from 'services/filterService';
import { MutationTuple, OperationVariables, QueryResult } from '@apollo/client';
import camelCase from 'lodash/camelCase';

interface CardFormProps extends CardProps {
  title: string;
  okText?: string;
  cancelText?: string;
  mutation: (options?: any) => MutationTuple<any, OperationVariables>;
  formRender: (any) => React.ReactNode;
}

const CardForm = forwardRef<any, CardFormProps>(({ title, ...props }, ref) => {
  // DECLARES ================================================================================================
  const { children, formRender, okText, cancelText, ...others } = props;
  const { formatMessage } = useIntl();
  const t = (id, values?) => formatMessage({ id }, values);
  const [mutate, result] = others.mutation();
  const [form] = Form.useForm();


  // METHODS ================================================================================================
  useImperativeHandle(ref, () => ({}));

  // HANDLERS ================================================================================================
  const handleOnSave = () => {
    const values = form.getFieldsValue();
    console.log('values', values)
    mutate({
      variables: values,
    });
  };

  // RENDER
  const InlineForm = () => (
    <div className="">
      <Button type="default" size="small">
        {cancelText ?? t('buttons.cancel')}
      </Button>
      <Button type="primary" size="small" onClick={handleOnSave}>
        {okText ?? t('buttons.save')}
      </Button>
    </div>
  );

  return (
    <>
      <Card actions={[<InlineForm />]} title={title}>
        <div className="content-wrapper">{children}</div>
        <div className="form-wrapper">{formRender({ form })}</div>
      </Card>
    </>
  );
});

export default CardForm;
