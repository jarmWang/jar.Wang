<template>
    <div class="books">
        <div class="search">
            <el-input v-model="booksName" placeholder="请输入完整书名，例如（武动乾坤）" class="input-with-select">
                <template #append>
                    <el-button icon="Search" @click="searchClick" />
                </template>
            </el-input>
        </div>
        <div>{{booksList}}</div>
    </div>
</template>

<script setup>
import { books } from "./api";
import { ref, onMounted } from "vue";
let booksList = ref(null);
let booksName = ref("武动乾坤");
onMounted(() => {
    searchClick();
});

const searchClick = () => {
    books(booksName.value).then((res) => {
        booksList.value = res.data;
    });
};
</script>

<style lang="scss" scoped>
.books {
    padding: 10px;
}
</style>