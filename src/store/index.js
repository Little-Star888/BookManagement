/* Vuex的store状态管理文件 */

// 1-导入Vue
import Vue from 'vue';
// 2-导入Vuex
import Vuex from 'vuex';
// 导入collapse模块状态管理文件
import collapse from './collapse';
// 导入navLeft模块状态管理文件
import navLeft from './navLeft';
// 3-使用Vuex
Vue.use(Vuex);
// 4-创建并导出状态管理的store实例
export default new Vuex.Store({
  // 4-1 state存放数据，一般对应组件里面的data
  state() {
    return {
      // 用户登录信息数据
      user: JSON.parse(sessionStorage.getItem('USER')) || '',
    }
  },
  // 4-2 mutations存放方法，一般对应组件里面的methods
  mutations: {

  },
  // 4-3 模块化管理
  modules: {
    // 注册collapse
    collapse,
    // 注册navLeft
    navLeft
  },

})
