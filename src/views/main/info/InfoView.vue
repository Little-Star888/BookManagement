<template>
  <div class="view info-view">
    <div class="head-info">
      图书信息管理&nbsp;&nbsp;&nbsp;<span>BOOK MANAGEMENT</span>
    </div>
    <!-- 新增 -->
    <div class="search-part">
      <el-button size="mini" plain>新增图书</el-button>
      <!-- 搜索 -->
      <div class="search">
        <!-- 分类下拉框 -->
        <template>
          <el-select
            v-model="selectedId"
            placeholder="图书分类"
            size="mini"
            filterable
            @change="changeCategory"
          >
            <!-- <el-option :value="0">图书分类</el-option> -->
            <el-option
              v-for="category in categories"
              :key="category.Id"
              :label="category.Name"
              :value="category.Id"
            >
            </el-option>
          </el-select>
        </template>
        <!-- 出版社下拉框
         -->
        <!-- <template>
          <el-select
            v-model="selectedIndex"
            placeholder="图书出版社"
            size="mini"
          >
            <el-option
              v-for="item in options"
              :key="item.Id"
              :label="item.Name"
              :value="item.Id"
            >
            </el-option>
          </el-select>
        </template> -->
        <!-- 搜索框 -->
        <el-input
          v-model="search"
          size="mini"
          placeholder="图书名称/作者名/出版社名"
        />
        <el-button size="mini" style="background-color: blue; color: white"
          >搜索</el-button
        >
      </div>
    </div>
    <div class="bookList">
      <el-row>
        <el-col
          :span="5"
          v-for="item in bookList"
          :key="item.Book.Id"
          style="margin: 10px"
        >
          <el-card :body-style="{ padding: '0px' }" shadow="hover">
            <img :src="item.Book.Image" class="image" />
            <div style="padding: 0px">
              <div>{{ item.Book.Name }}</div>
              <div class="bottom clearfix">
                {{ item.Book.PublishDate }}
              </div>
              <!-- 编辑设置按钮 -->
              <div class="icon-button">
                <el-button-group>
                  <el-button
                    plain
                    icon="el-icon-edit"
                    style="width: 113px"
                  ></el-button>
                  <el-button
                    plain
                    icon="el-icon-setting"
                    style="width: 112px"
                  ></el-button>
                </el-button-group>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import http from "@/request/request";
export default {
  data() {
    return {
      bookList: [],
      categories: [],
      selectedId: "",
      search: "",
    };
  },
  computed: {},
  methods: {
    // 改变图书分类
    changeCategory() {
      // console.log(this.bookList[0].Book.Category.Id);
      // console.log(this.selectedId);
      if (this.selectedId == "") {
        this.getBookList();
      } else {
        this.bookList = this.bookList.filter((item) => {
          // console.log(item.Book.Category.Id + "6666");
          // console.log(this.selectedId + "55555");
          return item.Book.Category.Id === this.selectedId;
        });
        // console.log(this.bookList);
      }
    },
    // 获取图书分类
    async getCategory() {
      try {
        const res = await http.category();
        // console.log(res);
        this.categories = res;
      } catch (err) {
        console.log(err);
      }
    },
    // 获取图书列表
    async getBookList() {
      try {
        const res = await http.bookList();
        // console.log(res);
        this.bookList = res;
      } catch (err) {
        console.log(err);
      }
    },
  },
  mounted() {
    this.getBookList();
    this.getCategory();
  },
};
</script>
<style scoped lang="less">
.info-view {
  .search-part {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .search {
      display: flex;
      align-items: center;
      padding: 0 10px;
    }
    .el-input {
      color: red;
      width: 180px;
    }
    .el-select {
      width: 190px;
      margin-right: 5px;
    }
  }

  .bookList {
    // 图书卡片
    overflow-y: scroll;
    max-height: 500px;
    .bottom {
      margin-top: 13px;
      line-height: 12px;
    }

    .button {
      padding: 0;
      float: right;
    }

    .image {
      width: 100%;
      display: block;
      height: 175px; /* 调整图片高度 */
      display: block;
      object-fit: cover; /* 让图片自适应容器大小 */
    }

    .clearfix:before,
    .clearfix:after {
      display: table;
      content: "";
    }

    .clearfix:after {
      clear: both;
    }
  }
}
</style>
