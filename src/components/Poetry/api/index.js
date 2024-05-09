/*
 * @Author: wbq
 * @Date: 2024-05-06 10:23:08
 * @LastEditTime: 2024-05-09 14:26:37
 * @LastEditors: wbq
 * @Description: 文件功能描述
 * @FilePath: \BaiduSyncdisk\prod\jar.Wang\src\components\Poetry\api\index.js
 */
import { $ajax } from '@/api'
const url = 'https://api.sou-yun.cn/open/poem'

// 诗词搜索
export function poetrySearch(data, options = {}) {
    const v = Object.keys(data)
        .map(key => `${key}=${data[key]}`)
        .join('&')
    return $ajax({
        url: url + '?' + v,
        method: 'get',
        headers: {
            isLoading: true,
            ...options
        }
    })
}