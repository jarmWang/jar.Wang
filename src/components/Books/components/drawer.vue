<template>
    <div class="drawer">
        <el-drawer v-model="drawerOpen" :direction="'rtl'" size="30%" :before-close="() => drawerOpen = false" :show-close="false">
            <template #header>
                <div>
                    {{ booksData.name }}
                </div>
                <div v-show="booksData.author">作者：{{ booksData.author }}</div>
            </template>
            <div v-for="(item, index) in booksData.list" :key="index" class="data-list" @click="htmlTo(item)">
                <div>{{ item.name }}</div>
            </div>
        </el-drawer>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const booksData = ref({}); // 数据
const drawerOpen = ref(false); // 抽屉开关
// 开启
const open = (data) => {
    booksData.value = data;
    drawerOpen.value = true;
};

// 关闭
const emit = defineEmits(["callback"]);
const htmlTo = (item) => {
    const options = {
        type: "drawer",
        data: item,
    };
    emit("callback", options);
    drawerOpen.value = false;
};
// 暴露组件方法
defineExpose({ open });
</script>

<style lang="scss" scoped>
::v-deep .el-drawer__header {
    display: flex;
    flex-direction: column;
    margin-bottom: 0;
    box-shadow: 0px 2px 5px 0px rgba(11, 36, 85, 0.13);
}
.drawer {
    text-align: left;
    font-size: 13px;

    .data-list {
        padding: 10px 0;
        cursor: pointer;
        border-bottom: 1px solid #cfcfcf;
        font-size: 14px;
        text-align: left;

        &:hover {
            color: rgb(127, 193, 255);
        }

        div {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }
}
</style>