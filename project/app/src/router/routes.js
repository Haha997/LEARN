// 路由配置信息

// 引入路由组件
import Home from "@/pages/Home";
import Search from "@/pages/Search";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Detail from "@/pages/Detail";

export default [
  // 添加路由元信息  { show: true }只在home search展示footer组件
  { path: "/home", component: Home, meta: { show: true } },
  {
    path: "/search/:keyword?",
    component: Search,
    meta: { show: true },
    name: "search",

    //   路由组件能不能传递props参数？
    // ①布尔值写法：只能传递params
    //   props: "true",
    // ②对象方法:额外的给路由组件传递一些props
    //   prop: { a: 1, b: 2 },
    // ③函数写法：可以把params query参数，一起传递给路由组件  常用方法
    props: ($route) => {
      return { keyword: $route.params.keyword, k: $route.query.k };
    },
  },
  { path: "/login", component: Login, meta: { show: false } },
  { path: "/register ", component: Register, meta: { show: false } },
  // 重定向 在项目启动的时候 访问/,立马定位到首页
  { path: "*", redirect: "/home" },
  { path: "/detail/:skuid", component: Detail, meta: { show: false } },
];
