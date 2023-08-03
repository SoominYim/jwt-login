const { defineConfig } = require("@vue/cli-service");
module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3000/api",
        changerOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
      "/oauth2.0": {
        target: "https://nid.naver.com",
      },
    },
  },

  outputDir: "../back2/public",

  pluginOptions: {
    vuetify: {
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
    },
  },
};
defineConfig({
  transpileDependencies: true,
});
