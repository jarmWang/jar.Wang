<!--
 * @Author: wbq
 * @Date: 2024-04-30 09:52:06
 * @LastEditTime: 2024-05-07 17:44:11
 * @LastEditors: wbq
 * @Description: 文件功能描述
 * @FilePath: \BaiduSyncdisk\prod\jar.Wang\src\components\Poetry\index.vue
-->
<template>
    <div id="poetry" class="poetry">
        <Headers>
            <template #center>
                <el-input v-model="searchItem.key" placeholder="请输入作者或者诗句">
                    <template #append>
                        <el-button icon="search" @click="searchClick" />
                    </template>
                </el-input>
            </template>
        </Headers>
        <div class="main">
            <div class="scroll">
                <div v-for="(item, index) in poetryData" :key="index" class="card">
                    <div class="poem" :class="'index' + index">
                        <div class="title">《{{ item.Title.Content }}》</div>
                        <div class="author">
                            <span>[{{ item.Dynasty }}]</span>
                            <span>{{ item.Author }}</span>
                        </div>
                        <div class="content">
                            <div v-for="(row, index) in displayData(item.Clauses)" :key="index">
                                {{ row.Content }}
                            </div>
                        </div>
                    </div>
                    <div class="isShow" @click="isShow(item, index)">
                        {{ item.flag ? "收起" : "展开全文" }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { poetrySearch } from "./api/index";
const poetryData = ref([]);
const isTrue = ref(false);
const searchItem = ref({
    key: "将进酒",
    pageNo: 0,
    jsontype: true,
});

onMounted(() => {
    searchClick();
});

// 查询
const searchClick = () => {
    poetrySearch(searchItem.value, { target: "#poetry" }).then((res) => {
        poetryData.value =
            res.data.ShiData?.map((i) => {
                return {
                    ...i,
                    flag: false,
                };
            }) || [];
        searchItem.value.pageNo = res.data.PageNo;
        isTrue.value = res.data.PageNo * res.data.PageSize > res.data.Count;
    });
};

// 展开显示
const isShow = (item, index) => {
    const dom = document.querySelector(".index" + index);
    dom.style.height = item.flag ? "80px" : dom.scrollHeight + "px";
    item.flag = !item.flag;
};

// 处理数组
const displayData = (data) => {
    console.log(data);
    return data;
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
                    // transform: ;
                    transition: all 0.3s;
                    height: 80px;
                    overflow: hidden;

                    .title {
                        font-weight: 600;
                    }

                    .author {
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