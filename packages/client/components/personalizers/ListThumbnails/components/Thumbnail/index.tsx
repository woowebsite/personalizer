import { Card } from "antd";

const { Meta } = Card;

const Thumbnail = ({ title, desc }) => {
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
      <Meta title={title} description={desc} />
    </Card>
  );
};

export default Thumbnail;
