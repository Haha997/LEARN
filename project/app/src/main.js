import Vue from "vue";
import App from "./App.vue";
// 三级联动组件---全局组件
// 第一个参数：全局组件的名称 第二个参数：那个组件
import TypeNav from "@/components/TypeNav";
Vue.component(TypeNav.name, TypeNav);

// 轮播图全局组件
import Carsousel from "@/components/Carousel";
Vue.component(Carsousel.name, Carsousel);
// 引入路由
import router from "@/router";
// 引入mockserve.js mock数据
import "@/mock/mockServe";
// 引入swiper样式
import "swiper/css/swiper.css";

Vue.config.productionTip = false;

// 引入仓库
import store from "@/store";

new Vue({
  render: (h) => h(App),
  // 全局事件总线$bus配置
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
  // 注册路由:底下的写法键值对一致省略v（router小写）
  // 注册路由信息 当这里书写router的时候 组件身上就有了$route $router属性
  router,
  store, //注册仓库 组件实例身上多了一个属性 $store属性
}).$mount("#app");
