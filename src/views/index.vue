<!--
 * @Author: wbq
 * @Date: 2024-03-14 15:19:45
 * @LastEditTime: 2024-03-14 18:07:17
 * @LastEditors: wbq
 * @Description: 文件功能描述
 * @FilePath: \BaiduSyncdisk\prod\jar.Wang\src\views\index.vue
-->
<template>
    <div class="hemony">
        <div class="my_container">
            <el-image
              class="my_img"
              :src="state.url"
              fit="cover"
            />
            <div class="my_introduction">
                <el-card class="my_card" shadow="always">
                    <div class="my_info space">
                        <span>姓名：{{ state.formData.name }}</span>
                    </div>
                    <div class="my_info space">
                        <span>性别：{{ state.formData.sex }}</span>
                    </div>
                    <div class="my_info space">
                        <span>年龄：{{ state.formData.age }}</span>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue'
const state = reactive({
    formData: {
        name: '王秉权',
        sex: '男',
        age: 22
    },
    url: require('@/assets/imgs/preview.jpg')
})
</script>

<style lang="scss" scoped>
.hemony {
    text-align: center;
    .my_img {
        margin-top: 10vh;
        width: 300px;
        height: 300px;
        border-radius: 100%;
        box-shadow: 0 0 10px #000;
    }
    .my_introduction {
        display: grid;
        justify-items: center;
        color: #fff;

        .my_card {
            width: 480px;
            margin-top: 10px;
            border: none;
        }

        .my_info {
            display: inline-block;
        }

        .space {
            margin: 0 10px;
        }
    }
}
</style>