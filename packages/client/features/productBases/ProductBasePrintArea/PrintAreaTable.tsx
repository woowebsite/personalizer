import React, { forwardRef, useImperativeHandle, useState } from 'react';
import _ from 'lodash';
import { Table, Input, InputNumber, Popconfirm, Form, Typography } from 'antd';
import metadataFactory from '~/services/metadataService';
import EntityType from '~/constants/EntityType';
import TaxonomyType from '~/constants/TaxonomyType';
import { metadata2Fields } from '~/shared/metadataHelper';

interface IProps {
  entityId?: number;
}

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const PrintAreaTable = (props: IProps, ref) => {
  const { entityId } = props;
  const [form] = Form.useForm();
  const { data, loading, refetch, error } = metadataFactory(
    EntityType.ProductBase,
  ).getMetadata({
    variables: {
      where: {
        entityId: entityId,
        entityType: EntityType.ProductBase,
        taxonomy: TaxonomyType.ProductBase_PrintArea,
      },
    },
  });

  const [editingKey, setEditingKey] = useState('');

  const isEditing = record => record.key === editingKey;

  const edit = record => {
    form.setFieldsValue({
      name: '',
      age: '',
      address: '',
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async key => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex(item => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setEditingKey('');
      } else {
        newData.push(row);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  /// EVENTS
  useImperativeHandle(ref, () => ({
    refetch,
  }));

  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
      width: '25%',
      editable: true,
    },
    {
      title: 'front',
      dataIndex: 'front',
      width: '15%',
      editable: true,
    },
    {
      title: 'width',
      dataIndex: 'width',
      width: '40%',
      editable: true,
    },
    {
      title: 'height',
      dataIndex: 'height',
      width: '40%',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              href="javascript:;"
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ''}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
  ];
  const mergedColumns = columns.map(col => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: record => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const transformData = data => {
    if (!data || !data.termRelationships) return [];
    const result = _.map(data.termRelationships.rows, 'termTaxonomy.term').map(
      t => {
        const term = {
          ...t,
          ...metadata2Fields(t.metadata),
        };
        return term;
      },
    );

    return result;
  };
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        size="small"
        dataSource={transformData(data)}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={false}
      />
    </Form>
  );
};

export default forwardRef<any, IProps & React.HTMLAttributes<HTMLDivElement>>(
  PrintAreaTable,
);
