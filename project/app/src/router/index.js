// 配置路由地方
import Vue from "vue";
import VueRouter from "vue-router";
// 使用插件
Vue.use(VueRouter);

// 引入路由组件
import Home from "@/pages/Home";
import Search from "@/pages/Search";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
// 先把vuerouter原型对象上的push先保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
// 重新写Push|replace方法 第一个参数告诉原来的push方法，你往哪里跳转（传递哪些参数)
// call apply区别：
// 相同点：都可以调用函数一次 改变函数的上下文一次
// 不同点：call与apply传递参数：call传递参数用逗号隔开，apply方法执行，传递数组
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};

VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};

// 配置路由
export default new VueRouter({
  routes: [
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
  ],
});
