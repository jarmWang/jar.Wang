/*
 * @Author: wbq
 * @Date: 2024-05-06 10:23:08
 * @LastEditTime: 2024-05-07 09:42:55
 * @LastEditors: wbq
 * @Description: 文件功能描述
 * @FilePath: \BaiduSyncdisk\prod\jar.Wang\src\components\Poetry\api\index.js
 */
import { $ajax } from '@/api'
// 诗词搜索
export function poetrySearch(data, options = {}) {
    const v = Object.keys(data)
        .map(key => `${key}=${data[key]}`)
        .join('&')
    return $ajax({
        url: '/poetry?' + v,
        method: 'get',
        headers: {
            isLoading: true,
            ...options
        }
    })
}