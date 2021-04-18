/* eslint-disable */
const lessToJS = require('less-vars-to-js');
const fs = require('fs');
const path = require('path');

// Where your antd-custom.less file lives
const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './assets/antd-custom.less'), 'utf8'),
);

module.exports = {
  env: {
    mockApi: 'https://5eb3d8ee974fee0016ecdba0.mockapi.io/api/v1',
  },
  i18n: {
    // These are all the locales you want to support in
    // your application
    locales: ['vi', 'en'],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: 'vi',
    localeDetection: false // disable automatic redirect Accept-language
  },
  lessLoaderOptions: {
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: themeVariables, // make your antd custom effective
    },
  },
  sassOptions: {
    includePaths: [path.resolve(__dirname, 'antd/dist/antd.css')],
  },
  cssModules: true,

  webpack: (config, { isServer }) => {
    // Make root is default or any node_modules
    config.resolve.modules = [__dirname, 'node_modules'];

    if (isServer) {
      const antStyles = /antd\/.*?\/style.*?/;
      const origExternals = [...config.externals];
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback();
          if (typeof origExternals[0] === 'function') {
            origExternals[0](context, request, callback);
          } else {
            callback();
          }
        },
        ...(typeof origExternals[0] === 'function' ? [] : origExternals),
      ];

      config.module.rules.unshift({
        test: antStyles,
        use: 'null-loader',
      });
    }
    return config;
  },
};
