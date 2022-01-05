import { useIntl } from 'react-intl';

const useTranslate = (id, params?) => {
  const { formatMessage } = useIntl();
  let values = {};
  if (params) {
    Object.keys(params).map((key) => {
      values = {
        ...values,
        [key]: formatMessage({ id: params[key] }),
      };
    });
  }
  return formatMessage({ id }, values);
};

export default useTranslate;
