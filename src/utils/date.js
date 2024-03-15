/*
 * @Author: wbq
 * @Date: 2024-03-15 14:35:30
 * @LastEditTime: 2024-03-15 14:59:50
 * @LastEditors: wbq
 * @Description: 文件功能描述
 * @FilePath: \BaiduSyncdisk\prod\jar.Wang\src\utils\date.js
 */
const now = new Date()
// 年月日
export const date = () => {
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    return `${year}-${month}-${date}`
}

// 时分秒
export const time = () => {
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();
    return `${hour}:${minute}:${second}`
}

// 星期
export const dayWeek = () => {
    return now.getDay() === 0 ? '星期日' : now.getDay() === 1 ? '星期一' : now.getDay() === 2 ? '星期二' : now.getDay() === 3 ? '星期三' : now.getDay() === 4 ? '星期四' : now.getDay() === 5 ? '星期五' : now.getDay() === 6 ? '星期六' : '星期天'
}