/*
 * @Author: wbq
 * @Date: 2024-03-12 15:19:45
 * @LastEditTime: 2024-03-12 15:24:04
 * @LastEditors: wbq
 * @Description: 文件功能描述
 * @FilePath: \BaiduSyncdisk\js-vue\demo\vue3\newDemo\new_demo\src\router\index.js
 */
import { createRouter, createWebHashHistory } from 'vue-router'
import index from '../views/index.vue'

const routes = [
    {
        path: '/',
        name: 'index',
        component: index
    }
    // {
    //     path: '/about',
    //     name: 'about',
    //     // route level code-splitting
    //     // this generates a separate chunk (about.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    // }
]

const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes
})

export default router
