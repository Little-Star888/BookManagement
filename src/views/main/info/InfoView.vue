<template>
  <div class="view info-view">
    <!-- 头部信息 -->
    <div class="head-info">
      图书信息管理&nbsp;&nbsp;&nbsp;
      <span>BOOK MANAGEMENT</span>
    </div>

    <template-view>
      <!-- 右边的筛选部分 -->
      <div class="filter" style="margin-top: -20px">
        <!-- 点击新增图书按钮跳转新增图书路由页面 -->
        <router-link :to="{name:'addBook'}">
          <el-button type="success" size="default">+新增图书</el-button>
        </router-link>
        <!-- 筛选 -->
        <el-form :inline="true" style="margin-top: 24px">
          <el-form-item>
            <!-- 图书分类下拉框 -->
            <template>
              <el-select
                v-model="selectedId"
                placeholder="图书分类"
                size="primary"
                filterable
                @change="changeCategory"
              >
                <el-option :value="'全部'">全部</el-option>
                <el-option
                  v-for="category in categories"
                  :key="category.Id"
                  :label="category.Name"
                  :value="category.Id"
                ></el-option>
              </el-select>
            </template>
          </el-form-item>
          <el-form-item>
            <!-- 出版社下拉框
            -->
            <template>
              <el-select v-model="selectedIndex" placeholder="图书出版社" size="primary">
                <el-option :value="'全部'">全部</el-option>
                <el-option
                  v-for="item in publishes"
                  :key="item.Id"
                  :label="item.Name"
                  :value="item.Id"
                ></el-option>
              </el-select>
            </template>
          </el-form-item>
          <el-form-item>
            <!-- 搜索框 -->
            <el-input placeholder="图书名称/作者名/出版社名" v-model.trim="keyword" />
          </el-form-item>
          <el-form-item style="margin-left: -10px">
            <!-- 搜索按钮 -->
            <el-button type="primary" @click="onSearch">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="bookList">
        <el-row>
          <el-col v-for="item in pagedBookList" :key="item.Book.Id" style="margin-bottom:10px;">
            <el-card :body-style="{ padding: '0px'}" shadow="hover">
              <img :src="item.Book.Image" class="image" style="width:183px;height:183px" />
              <div style="margin-left:10px;text-align:center">
                <div style="margin-bottom:5px;font-weight:700;font-size:14px">{{ item.Book.Name }}</div>
                <div
                  class="bottom clearfix"
                  style="margin-bottom:5px;"
                >{{ item.Book.Publisher.Name }}</div>
              </div>
              <!-- 编辑设置按钮 -->
              <div class="icon-button" style="margin-top:12px;">
                <!-- <router-link
                  :to="{path:`/main/editBook/${item.Book.Id}`}"
                >-->
                <el-button
                  type="success"
                  size="mini"
                  plain
                  icon="el-icon-edit-outline"
                  @click="goinfo(item)"
                ></el-button>
                <!-- </router-link> -->
                <el-button
                  type="primary"
                  size="mini"
                  plain
                  icon="el-icon-upload2"
                  @click="onUpload"
                ></el-button>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <!-- 分页显示部分 -->
      <div
        class="pagination"
        v-if="filteredBookList.length > 0"
        style="display:flex;justify-content:flex-end"
      >
        <el-pagination
          layout="prev, pager, next"
          :total="filteredBookList.length"
          :page-size="pageSize"
          background
          style="margin-top: 10px"
          @current-change="onPageChange"
        ></el-pagination>
      </div>

      <div class="manger">
        <!-- 图书入库提示框 -->
        <el-dialog
          title="提示"
          :close-on-click-modal="false"
          :visible.sync="dialogVisible"
          width="39%"
          :before-close="handleClose"
          @keyup.enter.native="onSubmit"
          @opened="focus"
        >
          <!-- 图书入库的表单数据 -->
          <el-form ref="form" :model="form" label-width="80px" :rules="rules">
            <el-form-item label="数量" prop="Priority">
              <el-input placeholder="1 " type="number" v-model="form.Number"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="onCancel">取 消</el-button>
            <el-button type="primary" @click="onSubmitForm">保 存</el-button>
          </span>
        </el-dialog>
      </div>
    </template-view>
  </div>
</template>
<script>
import TemplateView from "../Template/TemplateView.vue";
import http from "@/request/request";
export default {
  components: {
    TemplateView
  },
  data() {
    return {
      keyword: "",
      categories: [],
      selectedId: "",
      selectedIndex: "",
      publishes: [],
      bookList: [],
      filteredBookList: [],
      dialogVisible: false,
      form: [],
      rules: "",
      pageSize: 10, // 分页大小，一页十个数据
      currentPage: 1 // 当前页码
    };
  },
  computed: {
    pagedBookList() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.filteredBookList.slice(start, end);
    }
  },
  methods: {
    // query参数携带在？后面不丢失  get
    // parmas? 在控制台 刷新则丢失  post 不常用
    // 实战就是id 请求后台接口
    goinfo(item) {
      this.$router.push({
        // { path: 'editBook/:id', name: 'editBook', component: () => import('../views/main/editBook/EditBook.vue') },
        /*   注意这里路由配置里面如果'editBook/:id'指定了动态id，并且用params传参的话，path后面必须跟上 /${item.Book.Id} */
        /*   注意这里路由配置里面如果'editBook/:id'指定了动态id，并且用params传参的话，path后面必须跟上 /${item.Book.Id} */
        /*   注意这里路由配置里面如果'editBook/:id'指定了动态id，并且用params传参的话，path后面必须跟上 /${item.Book.Id} */
        path: `/main/editBook`,
        query: {
          id: item.Book.Id
        }
      });
    },
    // 分页切换
    onPageChange(currentPage) {
      this.currentPage = currentPage;
    },
    // 搜索图书
    onSearch() {
      // let tempResult = this.bookList;
      // 分类筛选
      if (this.selectedId && this.selectedId !== "全部") {
        this.filteredBookList = this.bookList.filter(
          item => item.Book.Category.Id === this.selectedId
        );
      }
      // 出版社筛选
      if (this.selectedIndex && this.selectedIndex !== "全部") {
        this.filteredBookList = this.bookList.filter(
          item => item.Book.Publisher.Id === this.selectedIndex
        );
      }

      // 关键字搜索
      if (this.keyword) {
        this.filteredBookList = this.bookList.filter(
          item =>
            item.Book.Name.toLowerCase().includes(this.keyword.toLowerCase()) ||
            item.Book.Author.Name.toLowerCase().includes(
              this.keyword.toLowerCase()
            ) ||
            item.Book.Publisher.Name.toLowerCase().includes(
              this.keyword.toLowerCase()
            )
        );
      }
    },

    // 图书入库
    onUpload() {
      // this.dialogVisible = true;
    },
    // 关闭图书入库提示框前要做的事
    handleClose() {},
    changeCategory() {},
    // 取消图书入库提示框时做的事
    onCancel() {
      this.dialogVisible = false;
    },
    // 提交图书入库编辑框时要做的事
    onSubmitForm() {},

    focus() {},
    // 获取图书分类信息
    async getCategory() {
      // console.log(this.selectedId);
      try {
        const res = await http.category();
        // console.log(res);
        this.categories = res;
      } catch (err) {
        console.log(err);
      }
    },
    // 获取所有出版社信息
    async getPublisher() {
      try {
        const res = await http.publisher();
        // console.log(res);
        this.publishes = res;
      } catch (err) {
        console.log(err);
      }
    },
    // 获取图书列表
    async getBookList() {
      try {
        const res = await http.bookList();
        console.log(res);
        this.bookList = res;
        this.filteredBookList = this.bookList;
      } catch (err) {
        console.log(err);
      }
    }
  },
  mounted() {
    this.getCategory();
    this.getPublisher();
    this.getBookList();
  }
};
</script>
<style scoped lang="less">
.filter {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-card {
  width: 184px;
  height: 278px;
}
.icon-button {
  display: flex;
  justify-content: space-between;
}
.bookList {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.el-col {
  margin-right: 5px;
  width: calc(20% - 5px);
  box-sizing: border-box;

  @media screen and (max-width: 1200px) {
    width: calc(33.33% - 6.67px);
  }

  @media screen and (max-width: 992px) {
    width: calc(50% - 10px);
  }

  @media screen and (max-width: 768px) {
    width: calc(100% - 20px);
  }
}
</style>