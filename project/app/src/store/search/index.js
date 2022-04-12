import { reqGetSearchInFo } from "@/api";

// search模块的小仓库
const state = {
  searchList: {},
};
const mutations = {
  GETSEARCHLIST(state, searchList) {
    state.searchList = searchList;
  },
};
const actions = {
  async getSearchList({ commit }, params = {}) {
    let result = await reqGetSearchInFo(params);
    if (result.code == 200) {
      commit("GETSEARCHLIST", result.data);
    }
  },
};
// 计算属性：在项目当中 简化数据
const getters = {
  goodsList(state) {
    return state.searchList.goodsList;
  },
  trademarkList(state) {
    return state.searchList.trademarkList;
  },
  attrsList(state) {
    return state.searchList.attrsList;
  },
};
export default {
  state,
  mutations,
  actions,
  getters,
};
