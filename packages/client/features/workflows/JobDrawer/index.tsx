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
import AuthorizedWrapper from '~/components/AuthorizedWrapper';
import updateJobAuthConfig from '~/features/jobs/authorized/updateJob';

// utils
import style from './style.module.scss';

interface JobDrawerProps {
  id: number;
  onSaveCompleted: any;
  session: any;
}

const JobDrawer = forwardRef<any, JobDrawerProps>((props, ref) => {
  // DECLARE
  const { formatMessage } = useIntl();
  const t = (id, values?) => formatMessage({ id }, values);
  const [visible, setVisible] = useState(false);
  const formRef: any = React.createRef();
  const formStatusRef: any = React.createRef();
  const { data, loading, refetch } = jobService.getJob({
    fetchPolicy: 'no-cache',
    variables: {
      where: { job: { id: props.id } },
    },
  });

  // EFFECT
  useEffect(() => {
    if (props.id) {
      setVisible(true);
    } else setVisible(false);
  }, []);

  // METHOD
  useImperativeHandle(ref, () => ({
    showDetail,
  }));

  const showDetail = () => {
    setVisible(true);
  };

  // EVENTS
  const onClose = () => {
    setVisible(false);
  };

  const onSave = () => {
    formRef.current.submit();
    props.onSaveCompleted();
  };
  const initialTitle = (data && data.job.title) || t('pageHeader.title');
  const [title, setTitle] = useState(null);

  const handleFieldChanged = (path, title: string) => {
    setTitle(title);
  };

  // RENDER
  if (loading) return <div />;

  return (
    <>
      <Drawer
        title={title || initialTitle}
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
        <div className="jobDrawer d-flex">
          <div className={style.jobDrawerForm}>
            <JobForm
              ref={formRef}
              initialValues={data.job}
              layout={{
                labelCol: { span: 24 },
                wrapperCol: { span: 24 },
              }}
              onFieldChange={handleFieldChanged}
            />
          </div>

          <AuthorizedWrapper
            config={updateJobAuthConfig.JobStatusBox}
            session={props.session}
          >
            <div className="pl-4">
              <JobStatus ref={formStatusRef} initialValues={data.job} />
            </div>
          </AuthorizedWrapper>
        </div>
      </Drawer>
    </>
  );
});

export default JobDrawer;
