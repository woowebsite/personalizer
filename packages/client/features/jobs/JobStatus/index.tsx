import React from 'react';
import { Form, Button } from 'antd';
import { useIntl } from 'react-intl';

// graphql

import accountService from 'services/accountService';

const JobStatus = props => {
  const { formatMessage } = useIntl();
  const { userId } = props;
  const t = (id, values?) => formatMessage({ id }, values);

  return (
    <>
      <Form size="small">
        <Form.Item
          name={['metadata', 'link']}
          label={t('jobStatus.label.status')}
        >
          <Button type="link"> Đã chấm sửa </Button>
        </Form.Item>
        <Form.Item
          name={['metadata', 'link']}
          label={t('jobStatus.label.employee')}
        >
          <Button type="link"> Mai Bảo Anh </Button>
        </Form.Item>
        <Form.Item
          name={['metadata', 'link']}
          label={t('jobStatus.label.leader')}
        >
          <Button type="link"> Lăng Tuấn Anh</Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default JobStatus;
