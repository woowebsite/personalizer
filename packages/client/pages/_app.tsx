import App, { AppInitialProps } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import withRedux, { AppProps } from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import { withRouter } from 'next/router';

import createStore from '../store';
import messages from 'shared/localeHelper';

import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/antd-custom.scss';
import '../assets/RichEditor.scss';



class MyApp extends React.Component<AppProps & AppInitialProps> {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx });
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps, store, router } = this.props;

    // Locale
    const { locale, defaultLocale, pathname } = router;
    return (
      <Provider store={store}>
        <IntlProvider
          locale={locale}
          defaultLocale={defaultLocale}
          messages={messages(locale, pathname)}
        >
          <Component {...pageProps} />
        </IntlProvider>
      </Provider>
    );
  }
}

export default withRouter(withRedux(createStore)(withReduxSaga(MyApp)));
