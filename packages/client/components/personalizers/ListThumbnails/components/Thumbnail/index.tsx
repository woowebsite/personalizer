import { Card } from "antd";

const { Meta } = Card;

const Thumbnail = ({ title }) => {
  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={
        <img
          alt="example"
          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        />
      }
    >
      <Meta title={title} description="www.instagram.com" />
    </Card>
  );
};

export default Thumbnail;
