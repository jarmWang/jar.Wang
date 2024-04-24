/*
 * @Author: wbq
 * @Date: 2024-03-12 15:19:45
 * @LastEditTime: 2024-04-24 14:53:25
 * @LastEditors: wbq
 * @Description: 文件功能描述
 * @FilePath: \BaiduSyncdisk\prod\jar.Wang\vue.config.js
 */
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    publicPath: './',
    devServer: {
        host: 'localhost',
        port: 8888,
        open: true,
        proxy: {
            '/bbdaxia': {
                target: 'https://api.book.bbdaxia.com',
                changeOrigin: true,
                pathRewrite: {
                    '^/bbdaxia': '/'
                }
            }
        }
    },
    transpileDependencies: true,


    chainWebpack: (config) => {
        config.plugin('define').tap((definitions) => {
          Object.assign(definitions[0], {
            __VUE_OPTIONS_API__: 'true',
            __VUE_PROD_DEVTOOLS__: 'false',
            __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
          })
          return definitions
        })
      }
})
