/* 路由配置文件 */

// 1-导入Vue
import Vue from 'vue';
// 2-导入VueRouter
import VueRouter from 'vue-router';
// 3-使用VueRouter
Vue.use(VueRouter);
// 4-配置路由们
const routes = [
  // 4-1 访问根路径的话默认重定向到登陆页，因为没登录无法访问后续页面
  { path: '/', redirect: '/login' },
  // 4-2 配置登陆页路由
  { path: '/login', name: 'login', component: () => import('../views/login/LoginView.vue') },
  // 4-3 配置主页容器路由
  {
    path: '/main', component: () => import('../views/main/MainView.vue'), children: [
      // 4-4 访问主页默认重定向到control页，因为登录后进入主页首先默认显示的就是控制台页面
      { path: '', redirect: '/main/control' },
      // 4-2 配置子路由控制台页面
      { path: 'control', name: 'control', component: () => import('../views/main/control/ControlView.vue') },
      // 4-2 配置子路由图书借阅管理页面
      { path: 'borrow', name: 'borrow', component: () => import('../views/main/borrow/BorrowView.vue') },
      // 4-2 配置子路由图书分类管理页面
      { path: 'category', name: 'category', component: () => import('../views/main/category/CategoryView.vue') },
      // 4-2 配置子路由图书信息管理页面
      { path: 'info', name: 'info', component: () => import('../views/main/info/InfoView.vue') },
      // 4-2 配置子路由数据统计分析页面
      { path: 'count', name: 'count', component: () => import('../views/main/count/CountView.vue') },
      // 4-2 配置子路由系统设置页面
      { path: 'system', name: 'system', component: () => import('../views/main/system/SystemView.vue') },
    ]
  },

]
// 5-创建用于管理路由的路由器实例
const router = new VueRouter({
  // 5-1 注册上面配置的各个路由
  routes,
  // 5-2 模式选择hash(/#)
  mode: 'hash'
})
// 6-路由守卫
// router.beforeEach((to, from, next) => {
//   const user = JSON.parse(localStorage.getItem('USER'));
//   if (user || to.name === 'login') {
//     return next();
//   }
//   localStorage.setItem('TO', to.name);
//   next('login');
// })

// 7-导出路由器实例
export default router;