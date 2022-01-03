import React from 'react'
import Link from 'next/link';

const Error500 = () => {
  const { formatMessage } = useIntl();
  const t = (id) => formatMessage({ id });
  return (
    <div className="container pl-5 pr-5 pt-5 pb-5 mb-auto text-dark font-size-32">
      <div className="font-weight-bold mb-3">{t('errors.server.title')}</div>
      <div className="text-gray-6 font-size-24">{t('errors.server.desc')}</div>
      <div className="font-weight-bold font-size-70 mb-1">{t('errors.server.code')}</div>
      <Link href="/" className="btn btn-outline-primary width-100">
        {t('buttons.backToHome')}
      </Link>
    </div>
  )
}

export default Error500
