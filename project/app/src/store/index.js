import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

// 引入小仓库
import home from "./home";
import search from "./search";
import detail from "./detail";

// 对外暴露store类的一个实例
export default new Vuex.Store({
  // 实现vuex仓库模块式开发储存数据
  modules: {
    home,
    search,
    detail,
  },
});
