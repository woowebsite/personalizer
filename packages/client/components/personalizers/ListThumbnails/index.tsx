import { List, Pagination } from 'antd';
import Thumbnail from './components/Thumbnail';
import ActionThumbnail from './components/ActionThumbnail';

import PAGINGATION from 'constants/paginations';

const ListThumbnails = (props) => {
  const { dataSource, dataPaging, onPagingChange, ...others } = props;
  const listThumbnails = [...dataSource];
  // Add a Thumbnail enable
  if (props.allowAddMore) {
    if (listThumbnails[0] && listThumbnails[0].type != 'action') {
      listThumbnails.unshift({
        type: 'action',
      });
    }
  }

  const renderItem = (item) => {
    switch (item.type) {
      case 'action':
        return (
          <ActionThumbnail onFinish={props.onReload} title='Add an album' />
        );

      default:
        return (
          <Thumbnail
            title={item.name}
            desc={item.description}
            localName={item.localName}
          />
        );
    }
  };
  return (
    <>
      <List
        {...others}
        dataSource={listThumbnails}
        grid={{ gutter: 16, column: 4 }}
        renderItem={(item) => <List.Item>{renderItem(item)}</List.Item>}
      />
      <Pagination
        onChange={onPagingChange}
        pageSize={dataPaging.pageSize || PAGINGATION.pageSize}
        total={dataPaging.total}
      />
    </>
  );
};

export default ListThumbnails;
