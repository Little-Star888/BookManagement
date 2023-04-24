<template>
  <div class="view borow-view">
    <div class="head-info">
      借阅事务管理&nbsp;&nbsp;&nbsp;<span>TRANSACTION MANAGEMENT</span>
    </div>
    <!-- 表单头部 -->
    <div class="form-title">
      <!-- 新增 -->
      <div class="search-part">
        <el-menu
          class="el-menu-demo"
          mode="horizontal"
          width="100%"
          default-active="0"
        >
          <el-menu-item index="0" @click="currentIndex = '0'"
            >全部</el-menu-item
          >
          <el-menu-item index="1" @click="currentIndex = '1'"
            >待配送</el-menu-item
          >
          <el-menu-item index="2" @click="currentIndex = '2'"
            >待归还</el-menu-item
          >
        </el-menu>

        <!-- 搜索 -->
        <div class="search">
          <el-input
            v-model="search"
            size="default"
            placeholder="请输入图书名称"
          />
          <el-button size="default" style="background-color: blue; color: white"
            >搜索</el-button
          >
        </div>
      </div>
    </div>

    <!-- 已借阅的图书表单数据列表 -->
    <template>
      <el-table
        ref="multipleTable"
        :data="filteredData"
        tooltip-effect="dark"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center">
        </el-table-column>
        <el-table-column
          prop="BookName"
          label="图书名称"
          width="260"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="BookNumber"
          label="图书编号"
          width="300"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="CreateTime"
          label="借阅时间"
          width="220"
          show-overflow-tooltip
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="borrowName"
          label="借阅人"
          width="100"
          show-overflow-tooltip
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="State"
          label="状态"
          width="80"
          show-overflow-tooltip
          align="center"
        >
        </el-table-column>
        <el-table-column label="操作" align="center" width="100">
          <template slot-scope="scope">
            <el-button
              type="success"
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
              >归还</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>
<script>
import http from "@/request/request";
import { mapState } from "vuex";
export default {
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      search: "",
      currentIndex: 0,
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.user,
    }),
    searchResult() {
      // 如果搜索框为空，则返回原始数据
      if (!this.search) return this.tableData;

      // 否则根据搜索框的内容过滤数据
      return this.tableData.filter((item) =>
        item.BookName.includes(this.search)
      );
    },
    // 筛选数据
    filteredData() {
      // 全部
      if (this.currentIndex === "0") {
        return this.searchResult;
      }
      // 待配送
      if (this.currentIndex === "1") {
        return this.searchResult.filter((item) => item.State === 1);
      }
      // 待归还
      if (this.currentIndex === "2") {
        return this.searchResult.filter((item) => item.State === 2);
      }

      // 默认返回原始数据
      return this.searchResult;
    },
  },
  methods: {
    // 格式化时间
    formatDate(time) {
      const date = new Date(time);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
    // 获取我的借阅记录
    async getMyRecord() {
      if (!this.user) return;
      try {
        // console.log(this.user.Id + "666666666666");
        const res = await http.myRecord(this.user.Id);
        this.tableData = res.map((item) => ({
          ...item,
          CreateTime: this.formatDate(item.CreateTime),
          borrowName: this.user.Name,
        }));
        // console.log(this.tableData);
      } catch (err) {
        console.log(err);
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleEdit() {},
  },
  mounted() {
    this.getMyRecord();
  },
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
