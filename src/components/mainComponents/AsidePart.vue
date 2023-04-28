<template>
  <div class="aside-view">
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
      :collapse="isCollapse" background-color="#545c64" text-color="#fff" active-text-color="yellow">
      <h2 v-if="isCollapse" class="main-title-small">导航</h2>
      <h2 v-else class="main-title">MIS</h2>
      <!-- 只有一级菜单的 -->
      <el-menu-item v-for="item in noChildren" :key="item.label" :index="item.label" router @click="routerTo(item)">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{ item.label }}</span>
      </el-menu-item>
      <el-menu-item @click="open">
        <i class="el-icon-back"></i>
        <span slot="title">退出</span>
      </el-menu-item>
      <!-- 有二级菜单的 -->
      <el-submenu v-for="item in hasChildren" :key="item.label" :index="item.label">
        <template slot="title">
          <i :class="`el-icon-${item.icon}`"></i>
          <span slot="title">
            {{ item.label }}
          </span>
        </template>
        <el-menu-item-group>
          <el-menu-item v-for="subItem in item.children" :key="subItem.label" :index="subItem.label">{{ subItem.label
          }}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    // 映射数据
    ...mapState({
      // 映射的用户数据
      user: (state) => state.user,
      // 映射的左侧菜单栏数据
      menuData: (state) => state.navLeft.menuData,
      // 映射的控制是否收起左侧菜单栏的数据参数
      isCollapse: (state) => state.collapse.isCollapse,
    }),
    // 筛选左侧菜单栏数据
    // 只有一级菜单
    noChildren() {
      return this.menuData.filter((item) => !item.children);
    },
    // 有二级菜单
    hasChildren() {
      return this.menuData.filter((item) => item.children);
    },
  },
  methods: {
    // 退出提示框
    open() {
      this.$confirm("确定退出吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(() => {
          this.$router.replace("/login");
          this.logoutRemove()
        })
        .catch(() => { });
    },

    // 点击跳转对应路由页面
    routerTo(item) {
      if (this.$route.path !== item.path) {
        this.$router.push(item.path);
      }
    },
    // 二级菜单的展开与折叠相关
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    ...mapMutations({
      logoutRemove: 'logoutRemove'
    })
  },
};
</script>
<style scoped lang="less">
.aside-view {
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 166px;
    min-height: 400px;
  }

  .el-menu {
    height: 100vh;
    overflow: hidden;
    border-right: none;

    .main-title {
      color: #cad704;
      line-height: 48px;
      text-align: center;
      font-weight: 100;
      font-size: 26px;
    }

    .main-title-small {
      color: #00b8ff;
      line-height: 48px;
      text-align: center;
      font-weight: 700;
      font-size: 14px;
    }

    .el-menu-item:hover {
      background-color: skyblue !important;
      color: #fff;
    }

    /deep/.el-submenu__title:hover {
      background-color: skyblue !important;
      color: #fff;
    }
  }
}
</style>
