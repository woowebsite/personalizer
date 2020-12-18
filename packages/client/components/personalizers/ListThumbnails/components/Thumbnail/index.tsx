import { Card } from "antd";

const { Meta } = Card;

const Thumbnail = ({ title, desc, localName }) => {
  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={
        <img
          alt="example"
          src="https://scontent-xsp1-2.cdninstagram.com/v/t51.2885-15/e35/52520776_415100549265830_2928818326428939943_n.jpg?_nc_ht=scontent-xsp1-2.cdninstagram.com&_nc_cat=102&_nc_ohc=6gjtr1TOjI4AX-3-b12&tp=18&oh=a6a6a04bb056ed1ca25a48870ef60ac2&oe=5FE06A90"
        />
      }
    >
      <Meta title={title + localName} description={desc} />
    </Card>
  );
};

export default Thumbnail;
