/*
 * @Author: wbq
 * @Date: 2024-03-14 15:15:45
 * @LastEditTime: 2024-03-14 15:17:03
 * @LastEditors: wbq
 * @Description: 文件功能描述
 * @FilePath: \BaiduSyncdisk\js-vue\demo\vue3\newDemo\new_demo\src\store\modules\storage.js
 */

import settings from '@/settings'

const storage = {}


// storage.local = {
//     has: key => {
//         return !!localStorage.getItem(`${settings.storagePrefix}${key}`)
//     },
//     get: key => {
//         return localStorage.getItem(`${settings.storagePrefix}${key}`)
//     },
//     set: (key, value) => {
//         localStorage.setItem(`${settings.storagePrefix}${key}`, value)
//     },
//     remove: key => {
//         localStorage.removeItem(`${settings.storagePrefix}${key}`)
//     },
//     clear: () => {
//         localStorage.clear()
//     }
// }

// storage.session = {
//     has: key => {
//         return !!sessionStorage.getItem(`${settings.storagePrefix}${key}`)
//     },
//     get: key => {
//         return sessionStorage.getItem(`${settings.storagePrefix}${key}`)
//     },
//     set: (key, value) => {
//         sessionStorage.setItem(`${settings.storagePrefix}${key}`, value)
//     },
//     remove: key => {
//         sessionStorage.removeItem(`${settings.storagePrefix}${key}`)
//     },
//     clear: () => {
//         sessionStorage.clear()
//     }
// }

export default storage
