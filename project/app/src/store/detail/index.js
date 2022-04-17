// 详情页小仓库
import { reqGoodsInfo } from "@/api";
const states = {
  goodsInfo: {},
};
const mutations = {
  GETGOODSINFO(state, goodsInfo) {
    state.goodsInfo = goodsInfo;
  },
};
const actions = {
  // 获取产品信息的action
  async getGoodsInfo({ commit }, skuId) {
    let result = await reqGoodsInfo(skuId);
    console.log("result", result);
    if (result.code == 200) {
      console.log("200", result.data);
      commit("GETGOODSINFO", result.data);
    }
  },
};
const getters = {
  // 简化数据
  categoryView(state) {
    // state.goodsInfo原始状态是空对象 空对象的categoryView属性值是undefined
    // 当前计算的categoryView属性值至少是一个空对象 假的报错就不会有
    // 不加{}也不会影响程序
    console.log("state.goodsInfo", state.goodsInfo);
    console.log("state.goodsInfo.categoryView", state.goodsInfo.categoryView);
    return state.goodsInfo.categoryView || {};
  },
  skuInfo(state) {
    return state.goodsInfo.skuInfo || {};
  },
};

export default {
  states,
  mutations,
  actions,
  getters,
};
