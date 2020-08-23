import { List, Card } from "antd";
import Thumbnail from "./components/Thumbnail";

const data: any = [
  {
    title: "Title 1",
  },
  {
    title: "Title 2",
  },
  {
    title: "Title 3",
  },
  {
    title: "Title 4",
  },
];

const ListThumbnails = (props) => {
  return (
    <List
      {...props}
      grid={{ gutter: 16, column: 4 }}
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <Thumbnail title={item.title} />
        </List.Item>
      )}
    />
  );
};

export default ListThumbnails;
