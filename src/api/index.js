/*
 * @Author: wbq
 * @Date: 2024-04-24 13:58:50
 * @LastEditTime: 2024-04-24 16:43:04
 * @LastEditors: wbq
 * @Description: 文件功能描述
 * @FilePath: \BaiduSyncdisk\prod\jar.Wang\src\api\index.js
 */
import axios from "axios";
import interceptors from './interceptors'
function createAxiosInstance() {
    const instance = axios.create({
        timeout: 50000,
        withCredentials: false
    })
    instance.interceptors.request.use(interceptors.reqFunc, interceptors.reqErr)
    instance.interceptors.response.use(interceptors.resFunc, interceptors.resErr)
    return instance
}

export const $ajax = createAxiosInstance()

export default {
    install(app) {
        app.config.globalProperties.$ajax = createAxiosInstance()
    }
}