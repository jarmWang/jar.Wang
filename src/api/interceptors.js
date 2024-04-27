/*
 * @Author: wbq
 * @Date: 2024-04-24 16:34:37
 * @LastEditTime: 2024-04-26 17:44:18
 * @LastEditors: wbq
 * @Description: 文件功能描述
 * @FilePath: \BaiduSyncdisk\prod\jar.Wang\src\api\interceptors.js
 */
import { ElLoading } from "element-plus";
let loadingInstance = null
let requestCount = 0 // 请求计数器

// 請求拦截器
const requestCallback = () => {
    return req => {
        const isLoading = (req.headers || {}).isLoading === true || (req.headers || {}).isLoading === 'true'
        console.log(req.headers, isLoading);
        if (isLoading) {
            requestCount++
            if (requestCount === 1) {
                loadingInstance = ElLoading.service({
                    lock: true,
                    text: req.headers.tipMsg ? decodeURIComponent(req.headers.tipMsg) : 'Loading...',
                    background: req.headers.background || 'rgba(0, 0, 0, .7)',
                    target: req.headers.target || document.body,
                })
                delete req.headers.tipMsg
                delete req.headers.background
                delete req.headers.target
            }

        }
        return req
    }
}
// 响应拦截器
const responseCallback = () => {
    return res => {
        if (loadingInstance && res.headers && res.config.headers.isLoading === true || res.config.headers.isLoading === 'true') {
            requestCount--
            if (requestCount === 0) {
                loadingInstance.close()
                loadingInstance = null
            }
        }

        return res
    }
}
// 请求错误
const requestError = () => {
    return err => {
        return Promise.reject(new Error(err))
    }
}
// 响应错误
const responseError = () => {
    return err => {
        if (loadingInstance && err && err.config && err.config.headers && err.config.headers.isLoading === true || err.config.headers.isLoading === 'true') {
            requestCount--
            if (requestCount === 0 && loadingInstance) {
                loadingInstance.close()
                loadingInstance = null
            }
        }
        return Promise.reject(new Error(err))
    }
}

export default {
    reqFunc: requestCallback(),
    resFunc: responseCallback(),
    reqErr: requestError(),
    resErr: responseError()
}