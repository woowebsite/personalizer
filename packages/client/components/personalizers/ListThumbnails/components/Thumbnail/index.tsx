import { Card } from 'antd';
import Link from 'next/link';

const { Meta } = Card;

const Thumbnail = ({ title, desc, image, url, href, localName }) => {
  return (
    <Link as={url} href={href}>
      <Card
        hoverable
        cover={<img alt={title} src={url} />}
      >
        <Meta title={title + localName} description={desc} />
      </Card>
    </Link>
  );
};

export default Thumbnail;
