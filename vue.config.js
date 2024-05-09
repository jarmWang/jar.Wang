/*
 * @Author: wbq
 * @Date: 2024-03-12 15:19:45
 * @LastEditTime: 2024-05-09 13:55:51
 * @LastEditors: wbq
 * @Description: 文件功能描述
 * @FilePath: \BaiduSyncdisk\prod\jar.Wang\vue.config.js
 */
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    publicPath: './',
    devServer: {
        port: 8888,
        open: false,
        proxy: {
            '/bbdaxia': {
                target: 'https://api.book.bbdaxia.com',
                changeOrigin: true,
                pathRewrite: {
                    '^/bbdaxia': '/'
                }
            },
            '/poetry': {
                target: 'https://api.sou-yun.cn/open/poem',
                changeOrigin: true,
                pathRewrite: {
                    '^/poetry': '/'
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
    },
})
