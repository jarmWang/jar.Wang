<!--
 * @Author: wbq
 * @Date: 2024-04-24 14:09:34
 * @LastEditTime: 2024-05-07 13:38:21
 * @LastEditors: wbq
 * @Description: 文件功能描述
 * @FilePath: \BaiduSyncdisk\prod\jar.Wang\src\components\Books\index.vue
-->
<template>
    <div id="books" :style="switching">
        <Headers :show="!!bookHtml.text" :left-title="isTxt('up')" :right-title="isTxt('next')" :chapter="chapter" :is-disabled="isTrue(bookHtml.up)" @toggle="toggle">
            <template #left>
                <div class="books-txt">
                    <el-popover placement="bottom-start" width="300px" :popper-style="switching" popper-class="popover-books" title="设置" trigger="hover">
                        <template #reference>
                            <span class="txt iconfont icon-zhuti_tiaosepan_o"></span>
                        </template>
                        <div class="popover-setting">
                            <div class="setting-theme">
                                <div class="theme-left">阅读主题</div>
                                <div class="theme-item">
                                    <div :class="{ 'after-theme': theme === 'default' }" @click="setTheme('default')"></div>
                                    <div :class="{ 'after-theme': theme === 'timber' }" @click="setTheme('timber')"></div>
                                    <div :class="{ 'after-theme': theme === 'eyeshadow' }" @click="setTheme('eyeshadow')"></div>
                                    <div :class="{ 'after-theme': theme === 'night' }" @click="setTheme('night')"></div>
                                </div>
                            </div>
                            <div class="setting-face">
                                <div class="face-left">正文字体</div>
                                <div class="face-item">
                                    <div :class="{ 'after-Body': titleBody === 'Roboto' }" @click="setBody('Roboto')">默认</div>
                                    <div :class="{ 'after-Body': titleBody === 'block' }" @click="setBody('block')">黑体</div>
                                    <div :class="{ 'after-Body': titleBody === 'regular' }" @click="setBody('regular')">楷体</div>
                                </div>
                            </div>
                            <div class="setting-size">
                                <div class="size-left">字体大小</div>
                                <div class="size-item">
                                    <div @click="fontSize('-')">A-</div>
                                    <div>{{ titleSize }}</div>
                                    <div @click="fontSize('+')">A+</div>
                                </div>
                            </div>
                        </div>
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
                <FullScreenIcon :dom="'books'" class="hover-icon"></FullScreenIcon>
                <span class="iconfont icon-mulu hover-icon" @click="drawerOpenList"></span>
            </template>
        </Headers>
        <div class="main">
            <div v-html="bookHtml.text" :style="[bodySetting[titleBody], {'font-size': titleSize + 'px'}]"></div>
            <el-empty v-if="!bookHtml.text" :image="image" description="啥也没有哦~" />
        </div>
        <Dialog ref="dialogOpen" :styleSwitching="switching" @callback="callback"></Dialog>
        <Drawer ref="drawerOpen" :styleSwitching="switching" @callback="callback"></Drawer>
    </div>
</template>

<script setup>
import { booksDetails } from "./api/api";
import { ref, computed } from "vue";
import { ElMessage } from "element-plus";
import Drawer from "./components/drawer.vue";
import Dialog from "./components/dialog.vue";
const booksName = ref(""); // 书名
const chapter = ref(""); // 章节
const bookHtml = ref({}); // 章节内容
const booksData = ref({}); // 书籍数据
const drawerOpen = ref(null); // 抽屉ref
const dialogOpen = ref(null); // 弹窗ref
const theme = ref("default"); // 主题色
const titleBody = ref("Roboto"); // 字体样式
const titleSize = ref(16); // 字体大小
const image = require("@/assets/status/none.png");
const themeSetting = ref({
    default: {
        color: "#000",
        background: "#fff",
    },
    timber: {
        color: "#262626",
        background: "#f8f3e9",
    },
    eyeshadow: {
        color: "#262626",
        background: "#e1ede1",
    },
    night: {
        color: "#666666",
        background: "#17191a",
    },
}); // 主题背景色
const bodySetting = ref({
    Roboto: {
        "font-family": "Roboto",
    },
    block: {
        "font-family": "SimHei",
    },
    regular: {
        "font-family": "KaiTi",
    },
});

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
    return value && value.endsWith(".html");
};

const isTxt = (value) => {
    if (value === "up" && isTrue(bookHtml.value.up)) {
        return "上一章";
    } else if (value === "next" && isTrue(bookHtml.value.next)) {
        return "下一章";
    } else {
        return "没有喽~";
    }
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

// 切换主题
const setTheme = (value) => {
    theme.value = value;
};

const switching = computed(() => {
    return {
        color: themeSetting.value[theme.value].color,
        background: themeSetting.value[theme.value].background,
    };
});

// 切换字体
const setBody = (value) => {
    titleBody.value = value;
};

// 切换字体大小
const fontSize = (value) => {
    value === "-" ? titleSize.value-- : titleSize.value++;
    titleSize.value =
        titleSize.value < 10 ? 10 : titleSize.value > 30 ? 30 : titleSize.value;
};
</script>

<style lang="scss">
.popover-books {
    .setting-theme,
    .setting-face,
    .setting-size {
        display: flex;
        align-items: center;

        .theme-left,
        .face-left,
        .size-left {
            font-size: 14px;
            color: #cacaca;
        }

        .theme-item,
        .face-item,
        .size-item {
            flex: 1;
        }
    }

    .setting-theme {
        .theme-item {
            display: flex;
            justify-content: space-between;
            margin: 0 10px;

            div {
                width: 35px;
                height: 35px;
                border-radius: 100%;
                cursor: pointer;

                &:nth-child(1) {
                    border: 1px solid rgb(185, 185, 185);
                    background-color: #fff;
                }

                &:nth-child(2) {
                    border: 1px solid #f7ead1;
                    background-color: #f8f3e9;
                }

                &:nth-child(3) {
                    border: 1px solid #d9fdd9;
                    background-color: #e1ede1;
                }

                &:nth-child(4) {
                    border: 1px solid #555555;
                    background-color: #17191a;
                }

                &:hover {
                    border: 1px solid #fd5454;
                }

                &.after-theme {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 1px solid #fd5454;

                    &::after {
                        content: "\2714";
                        color: #fd5454;
                    }
                }
            }
        }
    }

    .setting-face {
        margin: 10px 0;
        .face-item {
            display: flex;
            justify-content: space-between;
            margin: 0 10px;

            div {
                border: 1px solid rgb(218, 218, 218);
                border-radius: 8px;
                background: #eeeeee;
                padding: 6px 12px;
                cursor: pointer;
            }

            .after-Body {
                color: #fd5454;
                border: 1px solid #fd5454;
            }
        }
    }

    .setting-size {
        .size-item {
            border: 1px solid rgb(218, 218, 218);
            border-radius: 10px;
            display: flex;
            justify-content: space-between;
            margin: 0 10px;

            div {
                padding: 5px;
                text-align: center;

                &:nth-child(1) {
                    flex-grow: 1;
                    cursor: pointer;
                    background: #eeeeee;
                    border-top-left-radius: 10px;
                    border-bottom-left-radius: 10px;
                }
                &:nth-child(2) {
                    color: #505050;
                    flex-grow: 1;
                }
                &:nth-child(3) {
                    flex-grow: 1;
                    cursor: pointer;
                    background: #eeeeee;
                    border-top-right-radius: 10px;
                    border-bottom-right-radius: 10px;
                }
            }
        }
    }
}
</style>
<style lang="scss" scoped>
@import "./style/index.scss";
</style>

