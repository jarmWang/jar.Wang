<!--
 * @Author: wbq
 * @Date: 2024-03-14 15:19:45
 * @LastEditTime: 2024-03-15 15:56:56
 * @LastEditors: wbq
 * @Description: 文件功能描
 * @FilePath: \BaiduSyncdisk\prod\jar.Wang\src\views\dateTime.vue
-->
<template>
    <div class="date_time">
        <div class="date_time_top">
            {{ time }}
        </div>
        <div class="date_time_bottom">
            <div>{{ date() }}</div>
            <div>{{ dayWeek() }}</div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, reactive, onBeforeUnmount } from 'vue'
import { date, dayWeek } from '@/utils/date'
const time = ref('')
onMounted(() => {
    setInterval(() => {
        time.value = new Date().toLocaleTimeString()
  }, 1000)
})

onBeforeUnmount(() => {
    clearInterval()
})
</script>

<style lang="scss" scoped>
.date_time {
    margin-top: 10vh;
    border: 1px solid #fff;
    border-radius: 10px;
    box-shadow: 0px 0px 10px #fff;
    width: 400px;
    height: 180px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .date_time_top {
        font-size: 50px;
        font-weight: 600;
    }

    .date_time_bottom {
        width: 200px;
        display: flex;
        justify-content: space-between;
    }
}
</style>