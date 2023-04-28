<template>
  <div class="view category-view">
    <div class="head-info">
      图书分类管理&nbsp;&nbsp;&nbsp;
      <span>CATEGORY MANAGEMENT</span>
    </div>
    <template-view>
      <!-- 表单头部部分 -->
      <div class="manger">
        <!-- 新增分类提示框 -->
        <el-dialog title="提示" :close-on-click-modal="false" :visible.sync="dialogVisible" width="39%"
          :before-close="handleClose" @keyup.enter.native="onSubmit" @opened="focus">
          <!-- 新增分类的表单数据 -->
          <el-form ref="form" :model="form" label-width="80px" :rules="rules">
            <el-form-item label="分类名称" prop="Name">
              <el-input placeholder="请输入分类名称" v-model="form.Name" ref="nameInput"></el-input>
            </el-form-item>
            <el-form-item label="权重" prop="Priority">
              <el-input placeholder="请输入权重等级 " type="number" v-model="form.Priority"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="onCancel">取 消</el-button>
            <el-button type="primary" @click="onSubmit">确 定</el-button>
          </span>
        </el-dialog>
      </div>

      <!-- 右边的搜索分类和搜索框 -->
      <div class="search" style="margin-top: -18px">
        <el-button type="success" @click="onaddCategory" size="default">+新增分类</el-button>
        <!-- 搜索 -->
        <el-form :inline="true" style="margin-top: 20px">
          <el-form-item>
            <el-input placeholder="请输入分类名称" v-model.trim="keyword" />
          </el-form-item>
          <el-form-item style="margin-left: -10px">
            <el-button type="primary" @click="onSearch">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- 分类表单数据(包含编辑) -->
      <el-table :data="pagedCategories" border style="width: 100%" stripe>
        <el-table-column prop="index" label="序号" width="100"></el-table-column>
        <el-table-column prop="Name" label="分类名称" min-width="150"></el-table-column>
        <el-table-column prop="Priority" label="权重" width="100"></el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button type="success" size="small" @click="onEditCategory(scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="onDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页显示部分 -->
      <div class="pagination" v-if="filteredCategories.length > 0">
        <el-pagination layout="prev, pager, next" :total="filteredCategories.length" :page-size="pageSize" background
          style="margin-top: 10px" @current-change="onPageChange"></el-pagination>
      </div>
    </template-view>
  </div>
</template>
<script>
import TemplateView from "../Template/TemplateView.vue";
import http from "@/request/request";
export default {
  components: {
    TemplateView,
  },
  data() {
    return {
      // 一开始默认编辑框关闭
      dialogVisible: false,
      // 表单数据
      form: {
        Id: "",
        Name: "",
        Priority: "",
      },
      // 表单项验证规则
      rules: {
        Name: [
          { required: true, message: "分类名称不能为空" },
          {
            validator: (rule, value, callback) => {
              const reg = /^[\u4e00-\u9fa5]{2,}$/;
              if (!value || reg.test(value)) {
                callback();
              } else {
                callback(new Error("分类名称必须为2位以上的汉字"));
              }
            },
          },
        ],
        Priority: [
          {
            required: true,
            message: " 权重不能为空",
          },
          {
            validator: (rule, value, callback) => {
              const reg = /^[1-9][0-9]{0,1}$/;
              if (!value || reg.test(value)) {
                callback();
              } else {
                callback(
                  new Error(
                    "权重的取值决定显示的优先级，数值越大，显示越靠前，只能为1-99的数字"
                  )
                );
              }
            },
          },
        ],
      },
      categories: [], // 所有分类原始数据
      filteredCategories: [], //筛选后的数据
      pageSize: 10, // 分页大小，一页十个数据
      currentPage: 1, // 当前页码
      keyword: "", // 搜索关键字
      clickState: 0, //0代表新增，1代表编辑
    };
  },
  computed: {
    pagedCategories() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.filteredCategories.slice(start, end);
    },
  },

  methods: {
    // 获取图书分类
    async getCategory() {
      try {
        const res = await http.category();
        this.categories = res.map((item, index) => ({
          index: index + 1,
          ...item,
        }));
        this.filteredCategories = this.categories;
      } catch (err) {
        console.log(err);
      }
    },
    // 搜索
    onSearch() {
      if (this.keyword.length !== 0) {
        this.filteredCategories = this.categories.filter((item) =>
          item.Name.toLowerCase().includes(this.keyword.toLowerCase())
        );
      } else {
        this.getCategory();
      }
    },
    // 分页切换
    onPageChange(currentPage) {
      this.currentPage = currentPage;
    },
    // 打开新增或编辑框后获得焦点
    focus() {
      this.$nextTick(() => {
        this.$refs.nameInput.focus();
      });
    },
    // 编辑按钮点击事件
    onEditCategory(row) {
      // 确认为编辑状态
      this.clickState = 1;
      // 打开编辑框
      this.dialogVisible = true;
      this.form = JSON.parse(JSON.stringify(row));
    },
    // 新增按钮点击事件
    onaddCategory() {
      // 清空新增分类填写的数据
      this.$nextTick(() => {
        if (this.$refs.form) {
          this.$refs.form.resetFields();
        }
      });
      this.form = {
        Id: "",
        Name: "",
        Priority: "",
      };
      // 确认为新增状态
      this.clickState = 0;
      // 打开编辑框
      this.dialogVisible = true;
    },
    // 取消新增请求
    onCancel() {
      //调用关闭新增提示框的方法
      this.handleClose();
    },
    // 提交新增或者编辑请求
    onSubmit() {
      // 先验证表单
      this.$refs.form.validate(async (valid) => {
        // 如果验证通过
        if (valid) {
          // console.log(this.form);
          // 表单验证通过发送请求(0代表新增，1代表编辑)
          if (this.clickState === 0) {
            await http.addCategory(this.form);
            this.getCategory();

            // 最后一步，调用关闭新增提示框的方法
            // this.dialogVisible = false;
            this.handleClose();
            this.$message({
              type: "success",
              message: "新增成功!",
            });
          } else {
            console.log(this.form);
            await http.editCategory(this.form);
            // console.log(res);
            this.getCategory();
            // 最后一步，调用关闭新增提示框的方法
            this.handleClose();
            this.$message({
              type: "success",
              message: "编辑成功!",
            });
          }
        } else {
          console.log("提交失败");
          return false;
        }
      });
    },
    // 右上角叉叉符号关闭
    handleClose() {
      this.dialogVisible = false;
    },
  },
  mounted() {
    this.getCategory();
  },
};
</script>
<style scoped lang="less">
/deep/.el-table {
  height: 100%;

  thead {
    color: #0e5bf4 !important;
  }

  th.el-table__cell {
    background-color: #b9c1ef;
  }

  .el-table__header-wrapper th,
  td {
    text-align: center;
  }
}

.pagination {
  display: flex;
  justify-content: flex-end;
}

.search {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
