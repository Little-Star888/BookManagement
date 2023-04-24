export default {
  // 允许自动命名空间
  namespaced: true,
  state: {
    isCollapse: false
  },
  mutations: {
    // 左侧导航栏菜单是否收起
    Collapse_Menu(state) {
      state.isCollapse = !state.isCollapse;
    }
  }
}