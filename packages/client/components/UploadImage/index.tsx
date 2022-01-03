import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

import Upload from 'components/Upload';
import albumService from 'services/albumService';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(t, file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error(t('validator.typeImgUpload'));
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error(t('validator.maxSize'));
  }
  return isJpgOrPng && isLt2M;
}

const imageFolder = '/images/';

const UploadImage = props => {
  // DECLARES
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [uploadImage] = albumService.uploadImage();
  const { formatMessage } = useIntl();
  const t = (id, values?) => formatMessage({ id }, values);

  // EFFECT
  useEffect(
    () => {
      setImageUrl(props.value);
    },
    [props.value],
  );

  // EVENTS
  const onSetImageUrl = file => {
    const promise = uploadImage({ variables: { file } });
    promise.then(resp => {
      const { filename } = resp.data.uploadFile;
      props.setImageUrl(filename);
    });
  };

  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => {
        setLoading(false);
        onSetImageUrl(info.file.originFileObj);
      });
    }
  };

  // RENDER
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">{t('buttons.upload')}</div>
    </div>
  );

  return (
    <Upload
      name="avatar"
      listType="picture-card"
      className="avatar-uploader overflow-hidden"
      showUploadList={false}
      beforeUpload={(file) => beforeUpload(t, file)}
      onChange={handleChange}
    >
      {imageUrl ? (
        <img width="100%" src={imageFolder + imageUrl} />
      ) : (
        uploadButton
      )}
    </Upload>
  );
};

export default UploadImage;
