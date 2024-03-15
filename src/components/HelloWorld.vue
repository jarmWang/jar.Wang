<!--
 * @Author: wbq
 * @Date: 2024-03-12 15:19:45
 * @LastEditTime: 2024-03-13 11:38:43
 * @LastEditors: wbq
 * @Description: 文件功能描述
 * @FilePath: \BaiduSyncdisk\js-vue\demo\vue3\newDemo\new_demo\src\components\HelloWorld.vue
-->
<template>
  <div class="hello">
    {{ this.$store.state.home.title }}
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<style scoped>

</style>
