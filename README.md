# 图书借阅 WebAPP

## 1. 需求分析

#### 1.1 面向对象

+ 读者
+ 参考
  + [案例1](http://139.9.209.237:7070/)
  + [案例2](http://139.9.209.237:20002/)
  + [案例3](http://139.9.209.237:20001/)
  + [案例4](http://139.9.209.237:20003/)

#### 1.2 功能

##### 1.2.1 核心功能

+ 查找图书
+ 添加借书架
+ 借阅
+ 取消借阅/确认收货

##### 1.2.2 基本功能

+ 匿名用户

  + 首页
    - [查看轮播](http://139.9.209.237/librarywebapi/advert/list)
    - [首页栏目](http://139.9.209.237/librarywebapi/section/list) 
  + 分类
    + [查看所有分类及分类图书](http://139.9.209.237/librarywebapi/category/list)

  + 查询页
    + 根据关键字查询
    + 根据分类查询
    + 根据栏目查询
    + 查看图书详情

+ 登录用户
  + 具备匿名用户所有功能
  + [登录](http://139.9.209.237/librarywebapi/member/login)
  + 找回密码
  + 注销
  + 修改个人信息
  + 将图书添加到借书架
  + 将图书从借书架移除
  + 提交
  + 取消借阅
  + 确认收到图书
  + 查看借阅历史

#### 1.3 设计

##### 1.3.1 界面设计

 + 微信小程序：嘉图
 + 凡科网（配色）

##### 1.3.2 技术栈

 + 前端技术
   + vue.js
   + vue-router
   + vuex
   + vue-cli
   + vant-ui (基于vue移动UI组件库,同时支持微信小程序)
     + Vue 2.0 -> 2
     + Vue 3.0 -> 4
   + less(sass)
 + 后端技术
   - Asp.net (Node.js)
   - MySQL 
   - [接口文档URL](http://139.9.209.237/AngularDOC/#/home)

#### 1.4 开发

  + 1.4.1 项目结构
    + src
      + pages或views
      + router
      + store
      + components
      + plugins
      + services或http
      + ...
    + assets
      + images
      + less(scss/css)
      + fonts
      + ...


  + 1.4.2 安装依赖
    
    + vue-router
    
    + vuex
    
    + axios
    
    + vant ui
    
      ```
      npm i vant@latest-v2 -S
      ```
    
    + less+less-loader
    
      ```
      npm install less less-loader -D
      ```
    
      
    
  + 1.4.3 搭建项目基本结构
    
    + FlashPage
    + MainPage
      + [Navbar](https://vant-contrib.gitee.io/vant/v2/#/zh-CN/nav-bar)
      + HomePage
        + [Search](https://vant-contrib.gitee.io/vant/v2/#/zh-CN/search)
        + [Swiper](https://vant-contrib.gitee.io/vant/v2/#/zh-CN/swipe)
        + [Grid](https://vant-contrib.gitee.io/vant/v2/#/zh-CN/grid)
      + ClassifyPage
        + [Sidebar](https://vant-contrib.gitee.io/vant/v2/#/zh-CN/sidebar)
        + [Grid](https://vant-contrib.gitee.io/vant/v2/#/zh-CN/grid)
      + ShelfPage
      + MinePage
    + SearchPage
    + ListPage
    + DetailPage
    + LoginPage
    + ResetPasswordPage
    + BorrowRecordPage

#### 1.5 vant-ui基本用法

+ 安装 vant

      npm i vant@latest-v2 -S
  
+ 安装插件(按需导入)

      npm i babel-plugin-import -D

+ 配置babel.config.js

      module.exports = {
        plugins: [
            ['import', {
            libraryName: 'vant',
            libraryDirectory: 'es',
            style: true
            }, 'vant']
        ]
      }
    };

-  在src下创建plugins文件夹, 添加index.js,导入并使用组件

```
import Vue from "vue";
import { Button, Icon, Cell, CellGroup, Popup } from "vant";

Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Icon);
Vue.use(Button);
Vue.use(Popup);

```

+ 在main.js中导入插件

      import "./plugins";


## 2. 打包与发布


### 2.1 打包

    npm run build
    yarn build

生成dist目录以及资源


### 2.2 发布(部署)

#### 2.2.1 安装Web服务器

##### 2.2.1.1 什么是 Web服务器
  处理客户端的http请求(应用程序)

##### 2.2.1.2 常用Web服务器

+ IIS: Asp.net Web应用程序(.net)
+ Tomcat: JSP 应用程序(Java)
+ Apache： PHP 应用程序
+ nginx:   PHP / 代理服务器

#### 2.2.2 nginx

#### 2.2.2.1 什么是nginx
web服务器

#### 2.2.2.1 nginx特点
+ 开源
+ 轻量
+ 跨平台
+ 负载均衡
+ 反向代理(跨域)

#### 2.2.3 使用

+ 下载nginx
+ 配置环境变量（nginx.exe所在目录）
+ 常用命令
  + 查看版本 nginx -v
  + 启动服务 start nginx (在nginx.exe所在目录启动命令提示符)
  + 查看服务  tasklist -FI "IMAGENAME eq nginx.exe"
    + tasklist -?  查看tasklist命令参数
  + 停止服务 nginx -s quit(stop)
  + 更新服务器 nginx -s reload(修改配置)

#### 2.2.4 配置
+ port： 选择大一点端口(netstat -aob 查看端口)

+ server_name : 本地IP地址(域名)

+ root:  网站所在的目录(index.html所在目录)

+ proxy

  ```shell
  location /api/ { 
             proxy_pass   http://127.0.0.1:3000/;
  }
  ```

  



[全国行政区域](http://139.9.209.237/htmlprojectwebapi/region/list)

+ 接口文档: http://139.9.209.237/AngularDoc