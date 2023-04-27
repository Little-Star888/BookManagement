<template>
  <div>
    <el-container>
      <!--左侧边导航菜单内容 -->
      <el-aside width="auto">
        <aside-part></aside-part>
      </el-aside>
      <el-container>
        <!-- 右侧头部内容 -->
        <el-header>
          <header-part></header-part>
        </el-header>
        <!-- 右侧主体内容 -->
        <el-main>
          <main-part></main-part>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import AsidePart from "@/components/mainComponents/AsidePart.vue";
import HeaderPart from "@/components/mainComponents/HeaderPart.vue";
import MainPart from "@/components/mainComponents/MainPart.vue";
export default {
  components: {
    AsidePart,
    HeaderPart,
    MainPart
  }
};
</script>
<style scoped lang="less">
.el-header {
  padding: 0;
}
.el-container {
  height: 100vh;
}
</style>
