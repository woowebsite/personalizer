import React, { useState } from 'react';
import {
  Form,
  Button,
  Select,
  Typography,
  Input,
  Tooltip,
  Row,
  Col,
} from 'antd';
import { useIntl } from 'react-intl';
import Card from 'components/Card';
import PrintAreaTable from './PrintAreaTable';

const ProductBasePrintArea = ({ className, userId }) => {
  const { formatMessage } = useIntl();
  const t = (id, values?) => formatMessage({ id }, values);
  const [isShowForm, showForm] = useState(false);
  const [form] = Form.useForm();

  return (
    <>
      <Card
        title={t('printAreaBox.title')}
        className={className}
        actions={[
          <Button type="default" size="small" title="Cancel">
            {t('buttons.cancel')}
          </Button>,
          <Button type="primary" size="small" title="Add new">
            {t('buttons.addNew')}
          </Button>,
        ]}
      >
        <PrintAreaTable />
        <Form layout="vertical" size="small">
          <Row gutter={12}>
            <Col span={8}>
              <Form.Item label="Name" tooltip="This is a required field">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="FrontLabel" tooltip="This is a required field">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Dimensions" tooltip="This is a required field">
                <Row gutter={12}>
                  <Col span={12}>
                    <Form.Item name="width">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="height">
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </>
  );
};

export default ProductBasePrintArea;
