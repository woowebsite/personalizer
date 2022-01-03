import Link from 'next/link';

import Button from 'components/Button';

const RedirectButton = (props) => {
  const { children, url, ...other } = props;
  return (
    <Link href={url} as={url}>
      <Button {...other}>{children}</Button>
    </Link>
  );
};

export default RedirectButton;
