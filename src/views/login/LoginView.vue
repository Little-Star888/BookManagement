<template>
  <div class="view login-view">
    <!-- 登录页面，(背景图片,登录表单) -->
    <div class="login_box">
      <!-- 头像 -->
      <div class="avatar_box">
        <img
          src="https://img-qn-5.51miz.com/preview/element/00/01/16/38/E-1163880-E1C9422D.jpg!/quality/90/unsharp/true/compress/true/format/jpg/fh/320"
          alt=""
        />
        <h2>图书借阅系统</h2>
      </div>
      <!-- 表单 -->
      <el-form
        ref="LoginFormRef"
        :model="loginForm"
        label-width="0"
        :rules="LoginFormRules"
        class="login_form"
      >
        <el-form-item prop="phone">
          <!-- 用户名-->
          <el-input
            v-model="loginForm.phone"
            prefix-icon="el-icon-mobile"
            placeholder="请输入手机号码"
          ></el-input>
        </el-form-item>
        <!-- 密码-->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="el-icon-lock"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import http from "@/request/request";
export default {
  data() {
    return {
      // 登录的初始化数据：备注默认应该是空
      loginForm: {
        phone: "18951100599",
        password: "0599",
      },
      // 正则表达式的相关校验
      LoginFormRules: {
        phone: [{ required: true, message: "请输入手机号码", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    // 清空表单的校验
    resetLoginForm() {
      this.$refs.LoginFormRef.resetFields();
    },
    //登录的方法
    async login() {
      //首先是校验如果正则的校验通过 -->> 执行数据传输
      const valid = this.$refs["LoginFormRef"].validate();
      if (valid) {
        try {
          //执行数据的交互过程 -->> 即对服务端对应接口进行访问
          const res = await http.login(
            this.loginForm.phone,
            this.loginForm.password
          );
          // console.log(res);
          //  1.如果成功 登录到首页面
          if (res) {
            this.$message({
              message: "登录成功",
              type: "success",
            });
            //如果登录成功存储token
            window.sessionStorage.setItem("USER", JSON.stringify(res));
            //跳到首页面 这里是根据路由跳转
            this.$router.push("/main");
          }
        } catch (err) {
          // 2.如果失败 弹出对应的提示
          if (this.loginForm.phone === "" || this.loginForm.password === "") {
            this.$message({
              message: "手机号码或密码不能为空",
              type: "error",
            });
          } else {
            this.$message({
              message: "对不起,你输入的账号或密码有误",
              type: "error",
            });
          }
        }
      }
    },
  },
};
</script>
<style scoped lang="less">
.login-view {
  height: 100vh;
  background: url("https://pic.616pic.com/bg_w1180/00/14/50/qg3tyKHbr5.jpg!/fw/1120")
    no-repeat center center fixed;
  background-size: cover;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.avatar_box {
  width: 150px;
  height: 150px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  top: -10%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
  h2 {
    width: 100%;
    margin-top: 10px;
    color: pink;
  }
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
