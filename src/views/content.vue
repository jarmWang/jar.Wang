<template>
    <div class="main">
        <div class="container">
            <div class="main-list">
                <el-icon :size="20" style="cursor: pointer;" color="#409efc" @click="scorll('left')">
                    <DArrowLeft />
                </el-icon>
                <div ref="scrollTop" class="scrollTop">
                    <div class="scrollOver">
                        <div v-for="(item, index) in uniqueFeature" :key="index" class="feature-btn" :class="{ active: activeIndex === index }" @click="toggleActive(index)">
                            {{ item.name }}
                        </div>
                    </div>
                </div>
                <el-icon :size="20" style="cursor: pointer;" color="#409efc" @click="scorll('right')">
                    <DArrowRight />
                </el-icon>
            </div>
            <div class="main-text">
                <Books v-show="isTypeActive('Books')" />
            </div>
        </div>
    </div>
</template>
  
  <script setup>
import { ref } from "vue";

// 功能数组
const uniqueFeature = ref([
    { type: "Books", name: "书籍" },
    { type: "应用", name: "应用" },
    { type: "设置", name: "设置" },
    { type: "帮助", name: "帮助" },
    { type: "关于", name: "关于" },
    { type: "首页", name: "首页" },
    { type: "首页", name: "首页" },
    { type: "首页", name: "首页" },
    { type: "首页", name: "首页" },
    { type: "首页", name: "首页" },
]);

// 选中的按钮
const activeIndex = ref(0);

// Toggle active button
const toggleActive = (index) => {
    activeIndex.value = index;
};

// Check if a specific type is active
const isTypeActive = (type) => {
    return uniqueFeature.value[activeIndex.value].type === type;
};

// 左右滚动
const scrollTop = ref(null);
const scorll = (direction) => {
    const scrollEl = scrollTop.value;
    const transWidth = direction === "left" ? -300 : 300;

    scrollEl.scrollTo({
        left: scrollEl.scrollLeft + transWidth,
        behavior: "smooth",
    });
    console.log(scrollEl, transWidth);
};
</script>
  
<style lang="scss" scoped>
.main {
    margin-top: 20px;
    width: 65%;
    height: 60%;
    border: 1px solid #000;
    border-radius: 10px;
    box-shadow: 0px 0px 10px #000;

    .container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;

        .main-list {
            padding: 5px 10px;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            border-bottom: 1px solid #000;
            display: flex;
            align-items: center;
            .scrollTop {
                padding: 0 10px;
                overflow-x: scroll;

                &::-webkit-scrollbar {
                    display: none;
                }

                .scrollOver {
                    display: -webkit-inline-box;
                    white-space: nowrap;
                }

                .feature-btn {
                    color: #636363;
                    border: 1px solid #636363;
                    padding: 5px 10px;
                    width: 50px;
                    margin-right: 8px;
                    cursor: pointer;
                    border-radius: 5px;
                    font-weight: 400;
                    &.active {
                        color: #fff;
                        font-weight: 600;
                        border: 0.1px solid #409efc;
                        background-color: #409efc;
                        box-shadow: 0px 0px 5px #409efc;
                    }
                }
            }
        }

        .main-text {
            overflow: hidden;
        }
    }
}
</style>