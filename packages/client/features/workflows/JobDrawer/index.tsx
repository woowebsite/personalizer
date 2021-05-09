import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { useIntl } from 'react-intl';
import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  Select,
  DatePicker,
} from 'antd';

// inner components
import Card from 'components/Card';
import JobForm from '~/features/jobs/JobForm';
import JobStatus from '~/features/jobs/JobStatus';
import JobMoney from '~/features/jobs/JobMoney';

// graphql
import { withApollo } from 'apollo/apollo';
import { useRouter } from 'next/dist/client/router';
import jobService from 'services/jobService';
import { fieldsToMetadata } from '~/shared/metadataHelper';

interface JobDrawerProps {
  id: number;
  onSaveCompleted: any;
}

const JobDrawer = forwardRef<any, JobDrawerProps>((props, ref) => {
  // DECLARE
  const { formatMessage } = useIntl();
  const t = (id, values?) => formatMessage({ id }, values);
  const [visible, setVisible] = useState(false);
  const formRef: any = React.createRef();
  const formStatusRef: any = React.createRef();
  const { data, loading, refetch } = jobService.getJob({
    variables: {
      where: { job: { id: props.id } },
    },
  });
  const [upsertJob, result] = jobService.upsert();

  useEffect(() => {
    if (props.id) {
      setVisible(true);
    } else setVisible(false);
  }, []);

  useImperativeHandle(ref, () => ({
    showDetail,
  }));

  const showDetail = id => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  const onSave = () => {
    const formValues = formRef.current.getFieldsValue();
    const statusValues = formStatusRef.current.getFieldsValue();

    // metadata fields
    const metadataFields = { ...formValues.metadata, ...statusValues.metadata };

    // taxonomies fields
    const taxonomyFields = {
      ...formValues.taxonomies,
      ...statusValues.taxonomies,
    };

    // parse
    const job = data.job
      ? { id: data.job.id, ...formValues.job }
      : formValues.job;

    const metadata = fieldsToMetadata(metadataFields);
    const taxonomies = taxonomyFields ? Object.values(taxonomyFields) : [];

    upsertJob({
      variables: { job, metadata, taxonomies },
    });
  };

  if (loading) return <div />;
  if (result.data) {
    props.onSaveCompleted();
  }

  return (
    <>
      <Drawer
        title={t('jobDrawer.title')}
        width={520}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              {t('buttons.cancel')}
            </Button>
            <Button key="1" type="primary" onClick={onSave}>
              {t('buttons.save')}
            </Button>
          </div>
        }
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={24}>
            <Col span="16">
              <JobForm
                ref={formRef}
                initialValues={data.job}
                layout={{
                  labelCol: { span: 24 },
                  wrapperCol: { span: 24 },
                }}
              />
            </Col>
            <Col span="8">
              <JobStatus ref={formStatusRef} initialValues={data.job} />
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
});

export default JobDrawer;
