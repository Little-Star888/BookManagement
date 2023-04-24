export default {
  // 允许自动命名空间
  namespaced: true,
  state: {
    // 左侧导航栏数据
    menuData: [
      {
        path: "/main/control",
        name: "control",
        label: "控制台",
        icon: "user",
        url: "",
      },
      {
        path: "/main/borrow",
        name: "borrow",
        label: "图书借阅管理",
        icon: "notebook-1",
        url: "",
      },
      {
        path: "/main/category",
        name: "category",
        label: "图书分类管理",
        icon: "finished",
        url: "",
      },

      {
        path: "/main/info",
        name: "info",
        label: "图书信息管理",
        icon: "info",
        url: "",
      },
      {
        path: "/main/count",
        name: "count",
        label: "数据统计分析",
        icon: "s-data",
        url: "",
      },
      {
        path: "/main/system",
        name: "system",
        label: "系统设置",
        icon: "s-tools",
        url: "",
      },

      {
        label: "其他",
        icon: "location",
        children: [
          {
            path: "/page1",
            name: "page1",
            label: "页面1",
            icon: "setting",
            url: "",
          },
          {
            path: "/page2",
            name: "page2",
            label: "页面2",
            icon: "setting",
            url: "",
          },
        ],
      },
    ],
  },
  mutations: {

  }
}