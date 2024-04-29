<!--
 * @Author: wbq
 * @Date: 2024-04-29 10:14:06
 * @LastEditTime: 2024-04-29 17:58:21
 * @LastEditors: wbq
 * @Description: 文件功能描述
 * @FilePath: \BaiduSyncdisk\prod\jar.Wang\src\components\FullScreenIcon\index.vue
-->
<template>
    <div id="full-screen-icon">
        <span :class="flodIconClass" @click="isFullScreen"></span>
    </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { ElMessage } from "element-plus";
const props = defineProps(["dom"]);
const full = ref(false);

const isFullScreen = () => {
    // document.fullscreenEnabled 判断浏览器是否支持全屏
    if (document.fullscreenEnabled) {
        const element = document.getElementById(props.dom);
        // 判断当前元素是否全屏
        if (!isElementFullScreen()) {
            // 退出全屏
            document.exitFullscreen();
            full.value = false;
        } else {
            // 进入全屏
            element.requestFullscreen();
            full.value = true;
        }
    } else {
        ElMessage({
            message: "当前浏览器不支持全屏",
            type: "warning",
        });
    }
};

/**
 * @description: 检测有没有元素处于全屏状态
 * @return 布尔值
 */
const isElementFullScreen = () => {
    const fullscreenElement =
        document.fullscreenElement ||
        document.msFullscreenElement ||
        document.mozFullScreenElement ||
        document.webkitFullscreenElement;
    return fullscreenElement === null;
};

const flodIconClass = watch(isElementFullScreen, (n, o) => {
    console.log(n, o);
    return n ? "iconfont icon-tuichuquanping" : "iconfont icon-pingmuquanping";
});
</script>

<style scoped>
.iconfont {
    cursor: pointer;
}
</style>