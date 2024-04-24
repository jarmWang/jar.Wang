<!--
 * @Author: wbq
 * @Date: 2024-04-23 10:20:48
 * @LastEditTime: 2024-04-24 15:41:15
 * @LastEditors: wbq
 * @Description: 文件功能描述
 * @FilePath: \BaiduSyncdisk\prod\jar.Wang\src\views\content.vue
-->
<template>
    <div class="main">
        <div class="container">
            <div class="main-list">
                <el-icon :size="20" color="#409efc" @click="scorll('left')">
                    <DArrowLeft />
                </el-icon>
                <div ref="scrollTop" class="scrollTop">
                    <div v-for="(item, index) in feature" :key="index" class="feature-btn" :class="[item.flag ? 'active' : '']" @click="flagTrue(item, index)">{{ item.name }}</div>
                </div>
                <el-icon :size="20" color="#409efc" @click="scorll('right')">
                    <DArrowRight />
                </el-icon>
            </div>
            <div class="main-text">
                <Books v-if="type('Books')" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from "vue";
const feature = ref([
    { type: "Books", name: "书籍", flag: true },
    { type: "2", name: "应用", flag: false },
    { type: "3", name: "设置", flag: false },
    { type: "4", name: "帮助", flag: false },
    { type: "5", name: "关于", flag: false },
    { type: "6", name: "首页", flag: false },
    { type: "7", name: "应用", flag: false },
    { type: "8", name: "关于", flag: false },
    { type: "9", name: "首页", flag: false },
    { type: "0", name: "应用", flag: false },
]);
// 按钮状态
const flagTrue = (item, index) => {
    feature.value.forEach((i) => {
        i.flag = item.type === i.type;
    });
};

// 显示组件控制
const type = (type) => {
    return feature.value.find((item) => item.flag).type === type;
};

// 功能左右滚动
const scrollTop = ref(null);
const scorll = (direction) => {
    const scrollEl = scrollTop.value;
    const transWidth = direction === "left" ? -300 : 300;

    scrollEl.scrollTo({
        left: scrollEl.scrollLeft + transWidth,
        behavior: "smooth",
    });
};
</script>

<style lang="scss" scoped>
.main {
    margin-top: 20px;
    width: 65%;
    height: 60%;
    border: 1px solid #000;
    border-radius: 10px;
    box-shadow: 0px 0px 10px #000;

    .container {
        width: 100%;
        height: 100%;
        .main-list {
            padding: 0 10px;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            border-bottom: 1px solid #000;
            height: 6%;
            display: flex;
            align-items: center;
            .scrollTop {
                padding: 0 10px;
                overflow-x: scroll;
                white-space: nowrap;
                display: -webkit-inline-box;
                width: 100%;

                &::-webkit-scrollbar {
                    display: none;
                }

                .feature-btn {
                    color: #636363;
                    border: 1px solid #636363;
                    padding: 5px 10px;
                    width: 50px;
                    margin-right: 8px;
                    cursor: pointer;
                    border-radius: 5px;
                    font-weight: 400;
                    &.active {
                        color: #fff;
                        font-weight: 600;
                        border: 0.1px solid #409efc;
                        background-color: #409efc;
                        box-shadow: 0px 0px 5px #409efc;
                    }
                }
            }
        }

        .main-text {
            height: 94%;
        }
    }
}
</style>