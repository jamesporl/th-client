const withPlugins = require('next-compose-plugins');
const withAntdLess = require('next-plugin-antd-less');

const pluginAntdLess = withAntdLess({
  lessVarsFilePath: './src/utils/styles/antd.less',
});

module.exports = withPlugins([[pluginAntdLess]], {
  webpack(config) {
    return config;
  },
  experimental: { esmExternals: true },
});
