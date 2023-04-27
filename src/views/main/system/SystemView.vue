<template>
  <div class="view system-view">
    <div class="head-info">
      系统参数设置&nbsp;&nbsp;&nbsp;
      <span>System Parameter Settings</span>
    </div>
    <template-view>
      <div
        style="
        line-height: 45px;
        font-size: 18px;
        font-weight: bolder;
        color: #999;
      "
      >修改密码</div>
      <div class="changePassword">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="原始密码">
            <el-input v-model="form.oldPaaaword"></el-input>
          </el-form-item>
          <el-form-item label="新密码">
            <el-input v-model="form.newPassword"></el-input>
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input v-model="form.againPassword"></el-input>
          </el-form-item>
          <el-button type="primary" @click="onSubmit" style="margin-left: 80px">保存</el-button>
        </el-form>
      </div>
    </template-view>
  </div>
</template>
<script>
import TemplateView from "../Template/TemplateView.vue";
import http from "@/request/request";
import { mapState } from "vuex";
export default {
  components: {
    TemplateView
  },
  data() {
    return {
      form: {
        oldPaaaword: "",
        newPassword: "",
        againPassword: ""
      }
    };
  },
  computed: {
    ...mapState({
      // 映射的用户数据
      user: state => state.user
    })
  },
  methods: {
    async onSubmit() {
      await http.submit(this.user.Id, this.form.newPassword);
    }
  }
};
</script>

<style lang="less" scoped>
.el-input {
  width: 20%;
}
</style>
