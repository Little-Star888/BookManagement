<template>
  <div class="view control-view">
    <div class="head-info">
      <!-- 横线 -->
      <!-- <el-divider></el-divider> -->
      控制台&nbsp;&nbsp;&nbsp;
      <span>CONTROL PANEL</span>
    </div>
    <template-view>
      <div class="category">
        <el-row>
          <el-col :span="6">
            <el-card :body-style="{ padding: '0px' }">
              <el-button type="primary" icon="el-icon-menu" square></el-button>
              <span>图书分类</span>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card :body-style="{ padding: '0px' }">
              <el-button type="success" icon="el-icon-menu" square></el-button>
              <span>图书分类</span>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card :body-style="{ padding: '0px' }">
              <el-button type="warning" icon="el-icon-menu" square></el-button>
              <span>图书分类</span>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card :body-style="{ padding: '0px' }">
              <el-button type="danger" icon="el-icon-menu" square></el-button>
              <span>图书分类</span>
            </el-card>
          </el-col>
        </el-row>
        <!-- <el-row>
        <el-button type="primary" icon="el-icon-menu" square></el-button>
        <el-card class="box-card"> 图书分类 </el-card>
        <el-button type="success" icon="el-icon-menu" square></el-button>
        <el-button type="warning" icon="el-icon-menu" square></el-button>
        <el-button type="danger" icon="el-icon-menu" square></el-button>
        </el-row>-->
      </div>
    </template-view>
  </div>
</template>
<script>
import TemplateView from "../Template/TemplateView.vue";
export default {
  components: {
    TemplateView
  }
};
</script>
<style scoped lang="less">
.control-view {
  .category {
    .el-button {
      padding: 25px 25px;
    }
    .el-col-8 {
      width: 220px;
      margin-right: 10px;
    }
    /deep/.el-card__body {
      // color: red;
      font-size: 13px;
      span {
        margin-left: 10px;
      }
    }
  }
}
</style>
