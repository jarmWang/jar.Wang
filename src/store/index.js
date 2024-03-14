/*
 * @Author: wbq
 * @Date: 2024-03-12 15:19:45
 * @LastEditTime: 2024-03-13 11:20:03
 * @LastEditors: wbq
 * @Description: 文件功能描述
 * @FilePath: \BaiduSyncdisk\js-vue\demo\vue3\newDemo\new_demo\src\store\index.js
 */
import { createStore } from 'vuex'

// 动态导入模块文件
const modulesFiles = require.context('./modules', true, /\.js$/);

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    const moduleName = modulePath.replace(/\.\/(.*)\.\w+$/, '$1');
    const value = modulesFiles(modulePath);
    modules[moduleName] = value.default;
    return modules;
}, {});

const store = createStore({
    modules
})

export default store
