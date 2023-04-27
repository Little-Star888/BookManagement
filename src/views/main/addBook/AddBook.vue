<template>
  <div class="view info-view">
    <!-- 头部信息 -->
    <div class="head-info">
      新增图书信息&nbsp;&nbsp;&nbsp;
      <span>Add Book</span>
    </div>
    <template-view>
      <el-container>
        <el-main>
          <el-form :model="newBook" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-row>
              <el-col :span="8">
                <el-form-item label="图书名称" prop="desc">
                  <el-input v-model="newBook.Name"></el-input>
                </el-form-item>
                <el-form-item label="ISBN" prop="desc">
                  <el-input v-model="newBook.ISBN"></el-input>
                </el-form-item>
                <el-form-item label="出版日期" prop="desc">
                  <el-input v-model="newBook.PublishDate"></el-input>
                </el-form-item>
                <el-form-item label="所属分类" prop="desc">
                  <el-input v-model="newBook.Category"></el-input>
                </el-form-item>
                <el-form-item label="出版社" prop="desc">
                  <el-input v-model="newBook.Publisher"></el-input>
                </el-form-item>
                <el-form-item label="作者" prop="desc">
                  <el-input v-model="newBook.Author"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6" :offset="10">
                <img src="../../../assets/image/logo.png" alt />
                <el-button class="upload-btn" size="medium">
                  <span>选择封面</span>
                  <input type="file" />
                </el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="内容简介" prop="desc"></el-form-item>
                <el-input type="textarea" v-model="newBook.Introduce"></el-input>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('newBook')">保存</el-button>
                  <el-button @click="$router.back()">返回</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-main>
      </el-container>
    </template-view>
  </div>
</template>
<script>
import TemplateView from "../Template/TemplateView.vue";
export default {
  components: {
    TemplateView
  },
  data() {
    return {
      newBook: {
        Name: "",
        ISBN: "",
        PublishDate: "",
        Category: "",
        Publisher: "",
        Author: "",
        Image: "",
        Introduce: ""
      }
    };
  },
  mounted() {}
};
</script>
<style scoped lang="less">
/deep/.el-textarea__inner {
  height: 300px;
}
.el-button--medium {
  padding: 12px 30px;
  margin: 15px 0 0 70px;
}
.upload-btn {
  position: relative;
}
.upload-btn input[type="file"] {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
}
.upload-btn span {
  font-size: 7px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.el-form-item {
  margin-bottom: 0;
  margin-left: 0 !important;
  margin-top: 10px;
}
</style>