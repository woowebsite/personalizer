import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { useIntl } from 'react-intl';
import { Button, Form, Table as AntdTable, CardProps } from 'antd';
import Card from 'components/Card';
import filterService from 'services/filterService';
import { MutationTuple, OperationVariables, QueryResult } from '@apollo/client';
import style from './style.module.scss'
import { fieldsToMetadata } from '~/shared/metadataHelper';
import EntityType from '~/constants/EntityType';
import TaxonomyType from '~/constants/TaxonomyType';
import metadataFactory from '~/services/metadataService';
import termService from '~/services/termService';
import metadataService from '~/services/metadataService';

interface CardFormProps extends CardProps {
  title: string;
  entityId: number,
  entityType: EntityType,
  taxonomyType: TaxonomyType,
  okText?: string;
  cancelText?: string;
  formRender: (any) => React.ReactNode;
}

const CardForm = forwardRef<any, CardFormProps>(({ title, ...props }, ref) => {
  // DECLARES ================================================================================================
  const { children, entityId, entityType, taxonomyType, formRender, okText, cancelText, className, ...others } = props;
  const { formatMessage } = useIntl();
  const t = (id, values?) => formatMessage({ id }, values);
  const [mutate, result] = metadataFactory(entityType).upsert()
  const [upsertTermRelationship] = metadataFactory(entityType).upsertTermRelationship();
  const [form] = Form.useForm();


  // METHODS ================================================================================================
  useImperativeHandle(ref, () => ({}));

  // HANDLERS ================================================================================================
  const handleOnSave = () => {
    const values = form.getFieldsValue();
    const metadata = fieldsToMetadata(values);
    mutate({
      variables: {
        entityType,
        metadata
      },
    });
  };

  const  handleOnSaveTerm = () => {
    form
    .validateFields()
    .then(values => {
      const term = values.term;
      const metadata = fieldsToMetadata(values.metadata);
      upsertTermRelationship({
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
      <Button type="primary"  onClick={handleOnSaveTerm}>
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
