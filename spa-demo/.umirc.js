import { resolve } from 'path';

export default {
  // for query-string@6 https://github.com/sorrycc/blog/issues/68
  es5ImcompatibleVersions: true,
  plugins: [
    [
      'umi-plugin-react',
      {
        dva: true,
        antd: true,
        dynamicImport: {
          loadingComponent: './components/Loader/Loader',
          webpackChunkName: true,
        },
        routes: {
          exclude: [
            /model\.(j|t)sx?$/,
            /service\.(j|t)sx?$/,
            /models\//,
            /components\//,
            /services\//,
            // /chart\/Container\.js$/,
            // /chart\/ECharts\/.+Component\.js$/,
            // /chart\/ECharts\/.+ComPonent\.js$/,
            // /chart\/ECharts\/theme\/.+\.js$/,
            // /chart\/highCharts\/.+Component\.js$/,
            // /chart\/highCharts\/mapdata\/.+\.js$/,
            // /chart\/Recharts\/.+Component\.js$/,
            // /chart\/Recharts\/Container\.js$/,
          ],
        },
        dll: {
          exclude: [],
          include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch', 'antd/es'],
        },
        hardSource: /* isMac */ process.platform === 'darwin',
      },
    ],
  ],
  theme: './theme.config.js',
  // 接口代理示例
  proxy: {
    // '/api/admin': {
    //   target: 'http://www.hcf.me:8088/',
    //   changeOrigin: true,
    //   pathRewrite: { '^/api/admin': '/api/admin' },
    // },
    // '/captcha': {
    //   target: 'http://www.hcf.me:8088/',
    //   changeOrigin: true,
    //   pathRewrite: { '^/captcha': '/captcha' },
    // },
  },
  alias: {
    themes: resolve(__dirname, './src/themes'),
    components: resolve(__dirname, './src/components'),
    utils: resolve(__dirname, './src/utils'),
    config: resolve(__dirname, './src/utils/config'),
    enums: resolve(__dirname, './src/utils/enums'),
    services: resolve(__dirname, './src/services'),
    models: resolve(__dirname, './src/models'),
    routes: resolve(__dirname, './src/routes'),
    '@': resolve(__dirname, './src'),
  },
  urlLoaderExcludes: [/\.svg$/],
  ignoreMomentLocale: true,
  chainWebpack(config) {
    config.module
      .rule('svg')
      .test(/\.svg$/i)
      .use('svg-sprite-loader')
      .loader(require.resolve('svg-sprite-loader'));
  },
  // devServer:{
  //   port:8088
  // }
  // history: 'hash',
};
