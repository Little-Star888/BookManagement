<template>
  <div class="header-view">
    <!-- 左侧icon图标 -->
    <div class="left-part">
      <el-button icon="el-icon-s-fold" size="mini" @click="tapMenu"></el-button>
      <span>控制台</span>
    </div>
    <div class="right-part">
      <!-- 右侧头像和用户名 -->
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <router-link to="/login"><img :src="avatar.Header" class="user" /></router-link>
          {{ avatar.Name }}
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a">个人中心</el-dropdown-item>
          <el-dropdown-item command="b">设置</el-dropdown-item>
          <el-dropdown-item command="c">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState({
      // 映射的用户数据
      user: (state) => state.user,
    }),
    // 头像和用户名逻辑
    avatar() {
      return this.user
        ? this.user
        : {
          Name: "未登录",
          Header:
            "https://img0.baidu.com/it/u=1240274933,2284862568&fm=253&fmt=auto&app=138&f=PNG?w=180&h=180",
        };
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
    ...mapMutations({
      // 映射切换左侧导航栏展开与折叠的方法
      Collapse_Menu: "collapse/Collapse_Menu",
      logoutRemove: 'logoutRemove'
    }),

    // 切换左侧导航栏展开与折叠
    tapMenu() {
      this.Collapse_Menu();
    },
    handleCommand(command) {
      // this.$message("click on item " + command);
      // 退出登录
      command === "c" ? this.open() : undefined;
      command === "b"
        ? this.$route.path !== "/main/system"
          ? this.$router.push("/main/system")
          : undefined
        : undefined;
    },
  },
};
</script>
<style scoped lang="less">
.header-view {
  background-color: skyblue;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;

  // 左侧部分
  .left-part {
    display: flex;
    align-items: center;

    .el-button {
      background-color: skyblue;
      border: none;
    }

    .el-button--mini {
      font-size: 26px;
    }
  }

  // 右侧部分
  .right-part {

    // 用户名样式
    .el-dropdown-link {
      cursor: pointer;
      color: #2941e4;
      font-weight: 600;
    }

    // 头像样式
    .user {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      margin-right: 5px;
      vertical-align: middle;
    }
  }

  // // 自定义icon图标
  // .el-icon-my-export {
  //   background: url("@/assets/image/logo.png") center no-repeat;
  //   background-size: cover;
  // }
  // .el-icon-my-export:before {
  //   content: "替";
  //   font-size: 16px;
  //   visibility: hidden;
  // }

  // .el-icon-my-export {
  //   font-size: 16px;
  // }
  // .el-icon-my-export:before {
  //   content: "\e611";
  // }
}
</style>
