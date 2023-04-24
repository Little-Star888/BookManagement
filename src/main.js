/* 入口配置文件 */

// 1-导入Vue
import Vue from 'vue'
// 2-导入根组件
import App from './App.vue'
// 3-导入vuex状态管理的实例
import store from '@/store'
// 4-导入路由
import router from '@/router'
// 5-导入全局cssa样式
import '@/assets/css/global.less'
// 6-全局导入ElementUI组件库
import '@/plugins/ElementUI'
// 7-关闭生产提示
Vue.config.productionTip = false
// 8-创建Vue实例
new Vue({
  // 8-1 注册vuex状态管理的实例
  store,
  // 8-2 注册路由
  router,
  // 8-3 渲染App根组件
  render: h => h(App),
  // 8-4 挂载到App根组件上
}).$mount('#app')
