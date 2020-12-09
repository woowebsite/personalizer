import { List, Pagination } from 'antd';
import Thumbnail from './components/Thumbnail';
import ActionThumbnail from './components/ActionThumbnail';

import PAGINGATION from 'constants/paginations';

const ListThumbnails = (props) => {
  const { dataSource, dataPaging, onPagingChange, ...others } = props;

  // Add a Thumbnail enable
  if (props.addAction) {
    if (dataSource[0] && dataSource[0].type != 'action') {
      dataSource.unshift({
        type: 'action',
      });
    }
  }

  const renderItem = (item) => {
    switch (item.type) {
      case 'action':
        return <ActionThumbnail reload={props.reload} title={item.title} />;

      default:
        return <Thumbnail title={item.name} desc={item.description} />;
    }
  };
  return (
    <>
      <List
        {...others}
        dataSource={dataSource}
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
