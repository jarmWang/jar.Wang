/*
 * @Author: wbq
 * @Date: 2024-04-23 10:20:48
 * @LastEditTime: 2024-04-25 16:08:49
 * @LastEditors: wbq
 * @Description: 文件功能描述
 * @FilePath: \BaiduSyncdisk\prod\jar.Wang\src\main.js
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
const app = createApp(App)

// element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

// 全局组件注册
import components from '@/components/index.js'
app.use(components)

// ajax
import ajax from '@/api'
app.use(ajax)

app.use(store)
app.use(router)
app.mount('#app')
