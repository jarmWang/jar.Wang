<!--
 * @Author: wbq
 * @Date: 2024-04-30 09:52:06
 * @LastEditTime: 2024-05-08 15:11:24
 * @LastEditors: wbq
 * @Description: 文件功能描述
 * @FilePath: \BaiduSyncdisk\prod\jar.Wang\src\components\Poetry\index.vue
-->
<template>
    <div id="poetry" class="poetry">
        <Headers :show="poetryData.length > 0" :left-title="isTitle('up')" :right-title="isTitle('next')" @toggle="toggle">
            <template #center>
                <el-input v-model="searchItem.key" placeholder="请输入关键字">
                    <template #append>
                        <el-button icon="search" @click="searchClick(true)" />
                    </template>
                </el-input>
            </template>
        </Headers>
        <div class="main">
            <div class="scroll" v-if="poetryData.length > 0">
                <div v-for="(item, index) in poetryData" :key="index" class="card">
                    <div class="poem" :class="'index' + index">
                        <div class="title">《{{ item.Title.Content }}》</div>
                        <div class="author">
                            <span>[{{ item.Dynasty }}]</span>
                            <span>{{ item.Author }}</span>
                        </div>
                        <div class="content">
                            <div v-html="displayData(item.Clauses)" />
                        </div>
                    </div>
                    <div class="isShow" v-show="displayData(item.Clauses).length > 2" @click="isShow(item, index)">
                        {{ item.flag ? "收起" : "展开全文" }}
                    </div>
                </div>
            </div>
            <el-empty v-else :image="image" description="啥也没有哦~" />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { poetrySearch } from "./api/index";
const poetryData = ref([]);
const isTrue = ref(false);
const image = require("@/assets/status/none.png");
const searchItem = ref({
    key: "将进酒",
    pageNo: 0,
    jsontype: true,
});

onMounted(() => {
    searchClick();
});

// 查询
const searchClick = (v = false) => {
    v && (searchItem.value.pageNo = 0);
    poetrySearch(searchItem.value, { target: "#poetry" }).then((res) => {
        if (res && res.data) {
            poetryData.value =
                res.data.ShiData?.map((i) => {
                    return {
                        ...i,
                        flag: false,
                    };
                }) || [];
            searchItem.value.pageNo = res.data.PageNo;
            isTrue.value =
                (res.data.PageNo == 0
                    ? res.data.PageSize
                    : res.data.PageNo * res.data.PageSize) > res.data.Count;
        } else {
            poetryData.value = [];
            searchItem.value.pageNo = 0;
            isTrue.value = false;
        }
    });
};

// 展开显示
const isShow = (item, index) => {
    const dom = document.querySelector(".index" + index);
    dom.style.height = item.flag ? "95px" : dom.scrollHeight + "px";
    item.flag = !item.flag;
};

// 处理数组
const displayData = (data) => {
    let txt = "";
    data.forEach((i) => {
        txt += `<span>${i.Content}</span>${
            i.Content.endsWith("。") ? "<br>" : ""
        }`;
    });
    return txt;
};

// 分页
const isTitle = (type) => {
    if (type === "up") {
        return searchItem.value.pageNo > 0 ? "上一页" : "";
    } else if (type === "next") {
        return isTrue.value ? "" : "下一页";
    }
};

// 切换页码
const toggle = (type) => {
    if (type === "up") {
        if (searchItem.value.pageNo <= 0) {
            searchItem.value.pageNo = 0;
            return;
        }
        searchItem.value.pageNo--;
    } else if (type === "next") {
        if (isTrue.value) {
            return;
        }
        searchItem.value.pageNo++;
    }
    searchClick();
};
</script>

<style lang="scss" scoped>
.poetry {
    height: 100%;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;

    ::v-deep .el-input__inner {
        text-align: center;
    }

    .main {
        margin: 10px 1px 10px 10px;
        overflow-y: auto;

        .scroll {
            padding: 5px 10px 10px 10px;

            .card {
                padding: 10px;
                margin-bottom: 10px;
                box-shadow: 0px 2px 5px 0px rgba(11, 36, 85, 0.13);

                .poem {
                    transition: all 0.3s;
                    height: 95px;
                    overflow: hidden;

                    .title {
                        font-weight: 600;
                    }

                    .author {
                        margin: 5px 0px;
                        span {
                            margin: 0px 5px;
                        }
                    }

                    .content {
                    }
                }
                .isShow {
                    cursor: pointer;
                    text-align: right;
                    font-size: 12px;
                }
            }
        }
    }
}
</style>