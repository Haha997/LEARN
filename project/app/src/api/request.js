// 对于axios进行二次封装
import axios from "axios";
// 引入进度条  start代表进度条开始  done代表进度条结束
import Nprogress from "nprogress";
// 引入进度条样式
import "nprogress/nprogress.css";

// 简单配置 Nprogress
Nprogress.inc(0.2); //**递增：**要递增进度条，只需使用.inc()。这使它以随机量递增。这将永远不会达到100％：
Nprogress.configure({ easing: "ease", speed: 1000, showSpinner: false }); //使用缓动（CSS缓动字符串）和速度（以毫秒为单位）调整动画设置。 通过将加载微调器设置为false来关闭它。

// 1 利用axios对象的方法create,创建一个axios实例
// 2 request就是axios,只不过稍微配置下
const requests = axios.create({
  // 配置对象
  baseURL: "/api", //基础路径 发请求的时候 路径当中会出现api

  timeout: 5000, //代表请求超时的时间5s
});
// axios.defaults.baseURL = "/api";
// 请求拦截器：在发请求之前 请求拦截器可以检测到，可以在请求发出去之前做一些业务
requests.interceptors.request.use((config) => {
  Nprogress.start();
  return config;
});

// 响应拦截器
requests.interceptors.response.use(
  (res) => {
    Nprogress.done();
    return res.data; //成功的回调：服务器返回数据后 响应拦截器可以检测到 可以做一些事情
  },
  (error) => {
    // Nprogress.done();
    console.log(error);
    return Promise.reject(new Error("faile")); //响应失败的回调
  }
);

// 对外暴露
export default requests;
