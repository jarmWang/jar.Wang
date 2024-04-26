<!--
 * @Author: wbq
 * @Date: 2024-04-24 14:09:34
 * @LastEditTime: 2024-04-26 17:48:23
 * @LastEditors: wbq
 * @Description: 文件功能描述
 * @FilePath: \BaiduSyncdisk\prod\jar.Wang\src\components\Books\index.vue
-->
<template>
    <div id="books" v-loading="isLoading">
        <Headers>
            <template #left>
                <div>属性配置待开发</div>
            </template>
            <template #center>
                <div class="center">
                    <div class="title" @click="dialogOpenList">
                        {{ booksName ? booksName : '阅书斋' }}
                    </div>
                </div>
            </template>
            <template #right>
                <el-icon style="margin-left: 10px;cursor: pointer;" :size="20" @click="drawerOpenList">
                    <Operation />
                </el-icon>
            </template>
            <template>
                <div>
                    {{ chapter }}
                </div>
            </template>
        </Headers>
        <div class="main">
            <div v-html="bookHtml.text"></div>
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
            message: "请选择书籍",
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
            bData(data.url, booksData);
            bData(data.newurl, bookHtml);
            break;
        case "drawer":
            bData(data.url, bookHtml);
            break;
        default:
            break;
    }
};

// 打开弹窗
const dialogOpenList = () => {
    dialogOpen.value.open();
};
</script>

<style lang="scss" scoped>
@import "./style/index.scss";
</style>