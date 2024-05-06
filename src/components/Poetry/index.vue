<!--
 * @Author: wbq
 * @Date: 2024-04-30 09:52:06
 * @LastEditTime: 2024-05-06 17:31:20
 * @LastEditors: wbq
 * @Description: 文件功能描述
 * @FilePath: \BaiduSyncdisk\prod\jar.Wang\src\components\Poetry\index.vue
-->
<template>
    <div id="poetry" class="poetry">
        <Headers>
            <template #center>
                <el-input v-model="searchItem.key" style="text-align: center;" placeholder="请输入作者或者诗句">
                    <template #append>
                        <el-button icon="search" @click="searchClick" />
                    </template>
                </el-input>
            </template>
        </Headers>
        <div class="main">
            <div v-for="(item, index) in poetryData" :key="index">
                {{ item.Author }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { poetrySearch } from "./api/index";
const poetryData = ref([]);
const searchItem = ref({
    key: "将进酒",
    jsontype: true,
});

// 查询
const searchClick = () => {
    poetrySearch(searchItem.value, { target: "#poetry" }).then((res) => {
        poetryData.value = res.data.ShiData;
    });
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
}
</style>