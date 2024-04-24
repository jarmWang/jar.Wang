<!--
 * @Author: wbq
 * @Date: 2024-03-14 15:19:45
 * @LastEditTime: 2024-04-24 15:50:17
 * @LastEditors: wbq
 * @Description: 文件功能描response
 * @FilePath: \BaiduSyncdisk\prod\jar.Wang\src\views\index.vue
-->
<template>
    <div class="hemony">
        <div class="my_container">
            <div class="my_introduction">
                <dateTime />
                <content />
            </div>
            <div class="my_introduction">
                <response />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, reactive, onBeforeUnmount } from "vue";
import dateTime from "./dateTime.vue";
import content from "./content.vue";
import response from "./response.vue";
const state = reactive({
    formData: {
        name: "王秉权",
        sex: "男",
        age: 22,
    },
    url: "",
});
</script>

<style lang="scss" scoped>
.hemony {
    width: 100%;
    height: 100%;
    position: fixed;
    overflow: hidden;
    text-align: center;

    .my_container {
        height: 100%;
        display: flex;
        justify-content: space-between;

        .my_introduction {
            width: 100%;
            display: flex;
            color: #000;
            flex-direction: column;
            align-items: center;
        }
    }
}
</style>