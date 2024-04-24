<template>
    <div class="books">
        <div class="search">
            <el-input v-model="booksName" placeholder="请输入书籍名称" class="input-with-select">
                <template #append>
                    <el-button icon="Search" />
                </template>
            </el-input>
        </div>
        <div>内容显示</div>
    </div>
</template>

<script setup>
import { books } from "./api";
import { ref, onMounted } from "vue";
let booksList = ref(null);
let booksName = ref("完美世界");
onMounted(() => {
    searchClick();
});

const searchClick = () => {
    books(booksName.value).then((res) => {
        // booksList.value = res.data;
        console.log(res);
    });
};
</script>

<style lang="scss" scoped>
.books {
    padding: 10px;
}
</style>