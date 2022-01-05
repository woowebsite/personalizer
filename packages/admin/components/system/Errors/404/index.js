import React from 'react'
import Link from 'next/link';

const Error404 = () => {
  const { formatMessage } = useIntl();
  const t = (id) => formatMessage({ id });
  return (
    <div className="container pl-5 pr-5 pt-5 pb-5 mb-auto text-dark font-size-32">
      <div className="font-weight-bold mb-3">{t('errors.notFound.title')}</div>
      <div className="text-gray-6 font-size-24">{t('errors.notFound.desc')}</div>
      <div className="font-weight-bold font-size-70 mb-1">{t('errors.notFound.code')}</div>
      <Link href="/" className="btn btn-outline-primary width-100">
        {t('buttons.backToHome')}
      </Link>
    </div>
  )
}

export default Error404
