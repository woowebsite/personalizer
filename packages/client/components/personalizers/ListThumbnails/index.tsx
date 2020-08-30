import { List, Card } from "antd";
import Thumbnail from "./components/Thumbnail";
import ActionThumbnail from "./components/ActionThumbnail";



const ListThumbnails = (props) => {
  const renderItem = (item) => {
    switch (item.type) {
      case 'action':
        return <ActionThumbnail title={item.title} />

      default:
        return <Thumbnail title={item.name} desc={item.description} />
    }
  }
  return (
    <List
      {...props}
      grid={{ gutter: 16, column: 4 }}
      renderItem={(item) => (
        <List.Item>
          {
            renderItem(item)
          }
        </List.Item>
      )}
    />
  );
};

export default ListThumbnails;
