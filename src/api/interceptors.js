/*
 * @Author: wbq
 * @Date: 2024-04-24 16:34:37
 * @LastEditTime: 2024-04-26 17:44:18
 * @LastEditors: wbq
 * @Description: 文件功能描述
 * @FilePath: \BaiduSyncdisk\prod\jar.Wang\src\api\interceptors.js
 */
import { ElLoading, ElMessage } from "element-plus";
let loadingInstance = null
let requestCount = 0 // 请求计数器
const errorCode = {
    '400': '请求错误',
    '401': '请求需要身份验证',
    '402': '未知错误',
    '403': '当前操作没有权限',
    '404': '服务器找不到请求的网页',
    '405': '请求中指定的方法被禁用',
    '406': '无法使用请求的内容特性响应请求的网页',
    '408': '服务器等候请求时发生超时',
    '500': '服务器遇到错误',
    '426': '用户不存在或者密码错误',
    '501': '服务器不具备完成请求的功能',
    '502': '服务器网关错误',
    '503': '服务器目前无法使用',
    '504': '服务器网关超时',
    'default': '系统未知错误,请反馈给管理员'
}

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

        const businessCode = Object.prototype.hasOwnProperty.call(res.data, 'businessCode') ? res.data['businessCode'] || '' : ''
        if (res.data && Object.prototype.hasOwnProperty.call(res.data, 'code') && res.data.code !== 1) {
            const message = errorCode[businessCode] || res.data.msg || res.data.message || errorCode['default']
            // Message.error(message)
            // 有的提示信息需要换行， 需要解析成html格式，对普通提示没有影响
            ElMessage({
                dangerouslyUseHTMLString: true,
                message: message,
                type: 'error'
            })
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
        const status = err.response && Object.prototype.hasOwnProperty.call(err.response, 'status') ? err.response['status'] || '' : ''
        const message = errorCode[status] || errorCode['default']
        ElMessage.error(message)
        return Promise.reject(new Error(err))
    }
}

export default {
    reqFunc: requestCallback(),
    resFunc: responseCallback(),
    reqErr: requestError(),
    resErr: responseError()
}