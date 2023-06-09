/* ajax请求封装文件 */

// 1-导入axios
import axios from "axios";
// 2-设置默认的请求地址
axios.defaults.baseURL = "http://139.9.209.237/librarywebapi";
// 3-添加响应拦截器，对返回的数据进行统一处理
axios.interceptors.response.use(
  function (response) {
    // 3-1 解构响应回来的数据
    const { Code, Message, Data } = response.data;
    // console.log(response.data);
    // console.log(Message+111);
    // 3-2 Code === 100的话正常返回数据
    if (Code === 100) {
      return Data;
    }
    // 3-3 Code !== 100的话返回错误提示信息
    return Promise.reject(Message);
  },
  function (error) {
    // 3-4 响应失败返回错误信息
    return Promise.reject("请求服务器错误" + error);
  }
);
// 4-导出各请求方法
export default {
  //验证登录
  login(params) {
    return axios.post("/member/login", params);
  },
  // 获取图书分类信息
  category() {
    return axios.get("/category/list");
  },
  // 添加图书新分类信息
  addCategory(params) {
    return axios.post("category/create", params);
  },
  // 编辑图书分类信息
  editCategory(params) {
    return axios.post("/category/update", params);
  },
  // 查询特定图书分类信息
  searchSingleBook(id) {
    // 第一种方法
    return axios.get(`/book/single/${id}`);
    // 第二种方法
    // return axios.get("/book/single", { params: { id } });
  },

  // 查询所有出版社
  publisher() {
    return axios.get("/publisher/list");
  },
  // 获取所有图书信息
  bookList() {
    return axios.get("/book/list");
  },
  // 我的借书架信息
  myShelf(readerId) {
    return axios.get("/Transaction/GetMyShelf", { params: { readerId } });
  },
  // 获取借阅记录信息
  borrowRecord() {
    return axios.get("/Transaction/GetAllBorrowRecords");
  },

  // 修改密码
  submit(id, password) {
    return axios.post("/member/reset", { id, password });
  },
};
