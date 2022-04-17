// 配置路由地方
import Vue from "vue";
import VueRouter from "vue-router";
// 使用插件
Vue.use(VueRouter);
// 引入
import routes from "./routes";

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
  routes,
  // 滚动行为
  scrollBehavior(to, from, savedPosition) {
    return { y: 0 }; // y代表滚动条在最上方
  },
});
