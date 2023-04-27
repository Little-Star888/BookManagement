<template>
  <div class="view borow-view">
    <div class="head-info">
      借阅事务管理&nbsp;&nbsp;&nbsp;
      <span>TRANSACTION MANAGEMENT</span>
    </div>
    <template-view>
      <!-- 表单头部 -->
      <div class="form-title">
        <!-- 新增 -->
        <div class="search-part">
          <el-menu
            class="el-menu-demo"
            mode="horizontal"
            width="100%"
            default-active="0"
            @select="handleSelect"
          >
            <el-menu-item index="0">全部</el-menu-item>
            <el-menu-item index="1">待配送</el-menu-item>
            <el-menu-item index="2">待归还</el-menu-item>
          </el-menu>

          <!-- 搜索 -->
          <div class="search">
            <el-input v-model.trim="keyword" size="default" placeholder="请输入图书名称" />
            <el-button
              size="default"
              style="background-color: blue; color: white"
              @click="onSearch"
            >搜索</el-button>
          </div>
        </div>
      </div>

      <!-- 已借阅的图书表单数据列表 -->
      <template>
        <el-table
          ref="multipleTable"
          :data="pagedCategories"
          tooltip-effect="dark"
          border
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="45" align="center"></el-table-column>
          <el-table-column prop="BookName" label="图书名称" width="240" align="center"></el-table-column>
          <el-table-column prop="BookNumber" label="图书编号" min-width="190" align="center"></el-table-column>
          <el-table-column label="借阅时间" width="180" show-overflow-tooltip align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.CreateTime | filterDate }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="Reader.Name"
            label="借阅人"
            width="80"
            show-overflow-tooltip
            align="center"
          ></el-table-column>
          <el-table-column label="状态" width="70" show-overflow-tooltip align="center">
            <template slot-scope="scope">
              <span>{{scope.row.State | filterState }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="100">
            <template slot-scope="scope">
              <el-button
                :type="scope.row.State === 1 ? 'warning' : scope.row.State ===2 ? 'success' : scope.row.State === 0 || scope.row.State === 3 ? 'primary' : 'default' "
                size="mini"
                :disabled=" scope.row.State ===3||(scope.row.State !==0&&scope.row.State !==1 &&scope.row.State !==2) "
                @click="handleEdit(scope.$index, scope.row)"
              >{{scope.row.State | filterButtonText }}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <!-- 分页显示部分 -->
      <div
        class="pagination"
        v-if="filteredCategories.length > 0"
        style="display:flex;justify-content:flex-end"
      >
        <el-pagination
          layout="prev, pager, next"
          :total="filteredCategories.length"
          :page-size="pageSize"
          background
          style="margin-top: 10px"
          @current-change="onPageChange"
        ></el-pagination>
      </div>
    </template-view>
  </div>
</template>
<script>
import http from "@/request/request";
import { mapState } from "vuex";
import dayjs from "dayjs";
import TemplateView from "../Template/TemplateView.vue";
export default {
  components: {
    TemplateView
  },
  data() {
    return {
      filteredCategories: [],
      allData: [],
      multipleSelection: [],
      keyword: "",
      pageSize: 5,
      currentPage: 1
    };
  },
  computed: {
    ...mapState({
      user: state => state.user
    }),
    pagedCategories() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.filteredCategories.slice(start, end);
    }
  },
  methods: {
    // 搜索关键字
    onSearch() {
      if (!this.keyword) {
        this.getBorrowRecord();
      }
      this.filteredCategories = this.allData.filter(item =>
        item.BookName.toLowerCase().includes(this.keyword.toLowerCase())
      );
    },
    // 借阅状态切换
    handleSelect(key) {
      // console.log(key);
      switch (key) {
        // 全部
        case "0":
          this.filteredCategories = this.allData;
          break;
        // 待配送
        case "1":
          this.filteredCategories = this.allData.filter(
            item => item.State === 1
          );
          break;
        // 待归还
        case "2":
          this.filteredCategories = this.allData.filter(
            item => item.State === 2
          );
          break;
        default:
          break;
      }
    },
    // 分页切换
    onPageChange(currentPage) {
      this.currentPage = currentPage;
    },
    // 格式化时间
    // formatDate(time) {
    //   const date = new Date(time);
    //   const year = date.getFullYear();
    //   const month = (date.getMonth() + 1).toString().padStart(2, "0");
    //   const day = date
    //     .getDate()
    //     .toString()
    //     .padStart(2, "0");
    //   return `${year}-${month}-${day}`;
    // },
    // 获取所有借阅记录
    async getBorrowRecord() {
      try {
        const res = await http.borrowRecord();
        this.allData = res;
        this.filteredCategories = this.allData;

        // this.tableData = res.map(item => ({
        //   ...item,
        //   CreateTime: this.formatDate(item.CreateTime)
        //   CreateTime: new Date(item.CreateTime).toLocaleString()
        // }));
        // console.log(this.tableData);
      } catch (err) {
        console.log(err);
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleEdit() {}
  },
  filters: {
    // 格式化日期
    filterDate: target => dayjs(target).format("YYYY-MM-DD-hh:mm:ss"),
    // 格式化状态
    filterState(state) {
      return state === 0
        ? "取消"
        : state === 1
        ? "待配送"
        : state === 2
        ? "待归还"
        : state === 3
        ? "已取消"
        : "已完成";
    },
    // 格式化按钮文字
    filterButtonText(state) {
      return state === 0
        ? "取消"
        : state === 1
        ? "配送"
        : state === 2
        ? "归还"
        : state === 3
        ? "取消"
        : "完成";
    }
  },
  mounted() {
    this.getBorrowRecord();
  }
};
</script>
<style scoped lang="less">
.form-title {
  margin: 20px 0;
  position: relative;

  .el-menu {
    width: 100%;
  }
}

.search-part {
  display: flex;
  align-items: center;
}

.search {
  display: flex;
  align-items: center;
  position: absolute;
  right: 0;
  bottom: 15px;
  padding: 0 10px;
}
</style>
