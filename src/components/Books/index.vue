<!--
 * @Author: wbq
 * @Date: 2024-04-24 14:09:34
 * @LastEditTime: 2024-04-28 17:40:09
 * @LastEditors: wbq
 * @Description: 文件功能描述
 * @FilePath: \BaiduSyncdisk\prod\jar.Wang\src\components\Books\index.vue
-->
<template>
    <div id="books" v-loading="isLoading">
        <Headers>
            <template #left>
                <div class="books-txt">
                    <el-popover placement="bottom-start" :width="200" trigger="hover">
                        <template #reference>
                            <span class="txt iconfont icon-zhuti_tiaosepan_o"></span>
                        </template>
                        <template #default>
                            <div class="popover-bg">

                            </div>
                        </template>
                    </el-popover>
                </div>
            </template>
            <template #center>
                <div class="center">
                    <div class="title" @click="dialogOpenList">
                        {{ booksName ? booksName : '阅书斋' }}
                    </div>
                </div>
            </template>
            <template #right>
                <span class="iconfont icon-mulu" style="cursor: pointer;" @click="drawerOpenList"></span>
            </template>
            <div v-if="bookHtml.text" class="lock">
                <div class="lock-left" :disabled="isTrue(bookHtml.up)" @click="toggle('up')">
                    {{ isTrue(bookHtml.up) ? "上一章" : "没有喽~" }}
                </div>
                <div class="lock-center" v-if="chapter">{{ chapter }}</div>
                <div class="lock-right" :disabled="isTrue(bookHtml.next)" @click="toggle('next')">
                    {{ isTrue(bookHtml.next) ? "下一章" : "没有喽~" }}
                </div>
            </div>
        </Headers>
        <div class="main">
            <div v-html="bookHtml.text"></div>
            <el-empty v-if="!bookHtml.text" :image="image" description="啥也没有哦~" />
        </div>
        <Dialog ref="dialogOpen" @callback="callback"></Dialog>
        <Drawer ref="drawerOpen" @callback="callback"></Drawer>
    </div>
</template>

<script setup>
import { booksDetails } from "./api/api";
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import Drawer from "./components/drawer.vue";
import Dialog from "./components/dialog.vue";
const booksName = ref(""); // 书名
const chapter = ref(""); // 章节
const bookHtml = ref({}); // 章节内容
const booksData = ref({}); // 书籍数据
const drawerOpen = ref(null); // 抽屉ref
const dialogOpen = ref(null); // 弹窗ref
const isLoading = ref(false); // 加载loading
const image = require("@/assets/status/none.png");
let searchError = null;
onMounted(() => {});

const bData = async (url, obj) => {
    const results = await booksDetails(url, { target: "#books" });
    if (results.data.code === 1) {
        obj.value = results.data.data;
        switch (obj) {
            case booksData:
                booksName.value = booksData.value.name;
                break;
            case bookHtml:
                chapter.value = bookHtml.value.name;
                break;
            default:
                break;
        }
    }
};

// 打开章节列表
const drawerOpenList = () => {
    if (Object.keys(booksData.value).length === 0) {
        return ElMessage({
            message: "暂无信息",
            grouping: true,
            appendTo: "#books",
            type: "warning",
        });
    }
    drawerOpen.value.open(booksData.value);
};

// 选择章节回调
const callback = (item) => {
    console.log(item);
    const { type, data } = item;
    switch (type) {
        case "dialog":
            bData(data.newurl, bookHtml);
            bData(data.url, booksData);
            break;
        case "drawer":
            bData(data.url, bookHtml);
            break;
        default:
            break;
    }
};

const isTrue = (value) => {
    return value.endsWith(".html");
};

// 切换章节
const toggle = (type) => {
    const { up, next } = bookHtml.value;
    type === "up" && isTrue(up) && bData(up, bookHtml);
    type === "next" && isTrue(next) && bData(next, bookHtml);
};

// 打开弹窗
const dialogOpenList = () => {
    dialogOpen.value.open();
};
</script>

<style lang="scss" scoped>
@import "./style/index.scss";
</style>