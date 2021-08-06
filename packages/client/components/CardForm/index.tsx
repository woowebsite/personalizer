import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { useIntl } from 'react-intl';
import { Button, Form, Table as AntdTable, CardProps, notification } from 'antd';
import Card from 'components/Card';
import filterService from 'services/filterService';
import { MutationTuple, OperationVariables, QueryResult } from '@apollo/client';
import style from './style.module.scss'
import { fieldsToMetadata } from '~/shared/metadataHelper';
import EntityType from '~/constants/EntityType';
import TaxonomyType from '~/constants/TaxonomyType';

interface CardFormProps extends CardProps {
  title: string;
  entityId: number,
  entityType: EntityType,
  taxonomyType: TaxonomyType,
  onSaveCompleted?: any,
  mutation: (options?: any) => MutationTuple<any, OperationVariables>;
  okText?: string;
  cancelText?: string;
  formRender: (any) => React.ReactNode;
}

const CardForm = forwardRef<any, CardFormProps>(({ title, ...props }, ref) => {
  // DECLARES ================================================================================================
  const { children, entityId, entityType, mutation, taxonomyType, onSaveCompleted, formRender, okText, cancelText, className, ...others } = props;
  const { formatMessage } = useIntl();
  const t = (id, values?) => formatMessage({ id }, values);
  const [mutate, result] = mutation({
    onCompleted: ()=>{
      resetForm();

      notification.success({
        message: 'Notification Success',
        description: 'Save successfully',
        onClick: () => {
          console.log('Notification Clicked!');
        },
      });
      
      onSaveCompleted?.();
    }
  });
  const [form] = Form.useForm();

  // EVENTS
  const resetForm = ()=> {
    form.resetFields();
  }


  // METHODS ================================================================================================
  useImperativeHandle(ref, () => ({}));

  // HANDLERS ================================================================================================
  const  handleOnSaveTerm = () => {
    form
    .validateFields()
    .then(values => {
      const term = values.term;
      const metadata = fieldsToMetadata(values.metadata);
      mutate({
        variables: {
          entityId,
          entityType,
          taxonomy: taxonomyType,
          termMeta: metadata,
          term,
        },
      });
    })
    .catch(errorInfo => {
      console.log('Error: ', errorInfo);
    });
  }

  // RENDER
  const ActionButtons = () => (
    <div className={style.footer}>
      <Button type="default" >
        {cancelText ?? t('buttons.cancel')}
      </Button>
      <Button type="primary" onClick={handleOnSaveTerm}>
        {okText ?? t('buttons.save')}
      </Button>
    </div>
  );

  return (
    <>
      <Card className={`${style.cardForm} ${className}`} actions={[<ActionButtons />]} title={title}>
        <div className={style.content}>{children}</div>
        <div className={style.form}>{formRender({ form })}</div>
      </Card>
    </>
  );
});

export default CardForm;
