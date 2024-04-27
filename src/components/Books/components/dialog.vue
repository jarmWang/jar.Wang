<!--
 * @Author: wbq
 * @Date: 2024-04-26 13:49:55
 * @LastEditTime: 2024-04-26 17:37:29
 * @LastEditors: wbq
 * @Description: 文件功能描述
 * @FilePath: \BaiduSyncdisk\prod\jar.Wang\src\components\Books\components\dialog.vue
-->
<template>
    <div class="dialog">
        <el-dialog v-model="dialogOpen" title="搜索" top="5vh" width="50%" draggable :show-close="false">
            <div class="search-input">
                <el-input v-model="searchKeyword" placeholder="请输入完整书名，例如 《武动乾坤》" class="input-with-select">
                    <template #append>
                        <el-button icon="search" @click="searchClick" />
                    </template>
                </el-input> 
            </div>
            <div class="main-list" id="main-list-loading">
                <div v-for="(item, index) in booksData" :key="index" class="main-list-item" @click="itemClick(item)">
                    <div class="main-list-item-name">
                        <div>{{ item.name }}</div>
                        <div>
                            <span>作者:</span>
                            <span>{{ item.author }}</span>
                        </div>
                    </div>
                    <div class="main-list-item-desc">{{ item.desc }}</div>
                </div>
                <el-empty v-if="!(booksData.length > 0)" :image="image" description=" " />
            </div>
        </el-dialog>

        <el-dialog v-model="dialogOpenBooksList" title="选择书源" top="5vh" width="50%" :show-close="false">
            <div class="booksList">
                <div v-for="(item, index) in bookslist" :key="index" class="booksList-item" @click="booksClick(item)">
                    <div>{{ item.name }}</div>
                    <div>{{ item.new }}</div>
                </div>
                <el-empty v-if="!(bookslist.length > 0)" :image="image" description=" " />
            </div>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { searchList } from "../api/api.js";
import { ElMessage } from "element-plus";
const booksData = ref({}); // 数据
const dialogOpen = ref(false); // 弹窗开关
const dialogOpenBooksList = ref(false); // 选择书源开关
const bookslist = ref([]); // 书源列表
const searchKeyword = ref("武动乾坤"); // 搜索关键字
const image = require('@/assets/status/none.png')
// 开启
const open = () => {
    dialogOpen.value = true;
};

// 书名搜索
const searchClick = async () => {
    const results = await searchList(searchKeyword.value, {
        target: "#main-list-loading",
    });
    if (results.data.code === 1) {
        if (results.data.data.length === 0) {
            return ElMessage({
                message: "未找到相关书籍",
                grouping: true,
                appendTo: "#books",
                type: "error",
            });
        }
        booksData.value = results.data.data;
    }
};

// 选择书源
const itemClick = (item) => {
    dialogOpenBooksList.value = true;
    bookslist.value = item.book ?? [];
};

// 选择书源回调
const booksClick = (item) => {
    dialogOpenBooksList.value = false;
    dialogOpen.value = false;
    htmlTo(item);
};

// 关闭
const emit = defineEmits(["callback"]);
const htmlTo = (item) => {
    const options = {
        type: "dialog",
        data: item,
    };
    emit("callback", options);
};
// 暴漏组件方法
defineExpose({ open });
</script>

<style lang="scss" scoped>
::v-deep .el-dialog {
    border-radius: 10px;
}
.dialog {
    .search-input {
        box-shadow: 0px 2px 5px 0px rgba(11, 36, 85, 0.13);
    }
    .main-list {
        height: 30vh;
        overflow-y: auto;
        margin-top: 10px;
        padding: 0 5px;

        .main-list-item {
            padding: 10px;
            margin: 10px 0;
            cursor: pointer;
            border-bottom: 1px solid #cfcfcf;
            text-align: left;
            border-radius: 5px;

            .main-list-item-name {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 10px;

                div:nth-child(1) {
                    font-weight: 600;
                    width: 50%;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }

                div:nth-child(2) {
                    width: 50%;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    text-align: right;
                    span:nth-child(1) {
                        font-size: 14px;
                        color: rgb(100, 100, 100);
                        margin-right: 5px;
                    }
                }
            }
            .main-list-item-desc {
                font-size: 12px;
                color: rgb(100, 100, 100);
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }

            &:hover {
                border-bottom: 1px solid #fff;
                box-shadow: 0px 5px 8px 0px rgba(11, 36, 85, 0.13);
            }
        }
    }

    .booksList {
        height: 30vh;
        overflow-y: auto;
        margin-top: 10px;
        padding: 0 5px;

        .booksList-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 14px;
            cursor: pointer;
            border-bottom: 1px solid #cfcfcf;
            padding: 5px;
            margin: 5px 0;

            div {
                width: 50%;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                &:nth-child(1) {
                    text-align: left;
                }
                &:nth-child(2) {
                    text-align: right;
                }
            }

            &:hover {
                border-radius: 5px;
                border-bottom: 1px solid #fff;
                box-shadow: 0px 5px 8px 0px rgba(11, 36, 85, 0.13);
            }
        }
    }
}
</style>