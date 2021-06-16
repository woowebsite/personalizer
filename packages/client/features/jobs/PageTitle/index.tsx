import { Layout, Button, PageHeader, Row, Col, Typography } from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';

import RedirectButton from '~/components/RedirectButton';

const PageTitle = ({ data, messages, t, onSave }, ref) => {
  const initialTitle = data.job.title || t('pageHeader.title');
  const [title, setTitle] = useState(initialTitle);

  useImperativeHandle(ref, () => ({
    setTitle,
  }));

  return (
    <PageHeader
      title={title}
      className="mb-4 pl-0 pr-0"
      subTitle={messages.subTitle}
      extra={[
        <RedirectButton url={'/customer/jobs'}>
          {t('pageHeader.buttons.all')}
        </RedirectButton>,
        <Button key="2" danger>
          {t('buttons.delete')}
        </Button>,
        <RedirectButton url={'/customer/jobs/new'} type="primary" ghost>
          {t('buttons.create')}
        </RedirectButton>,
        <Button key="1" type="primary" onClick={onSave}>
          {t('buttons.save')}
        </Button>,
      ]}
    />
  );
};

export default forwardRef(PageTitle);
