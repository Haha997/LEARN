// 当前模块：API进行统一管理
import requests from "./request";
import mockRequests from "./mockAjax";

// 三级联动接口
// /api/product/getBaseCategoryList;  get 无参数
// 发送请求返回的结果是promise对象

// 线上数据
export const reqgetCategoryList = () =>
  requests.get(`/product/getBaseCategoryList`);

// 获取banner（home首页轮播图接口）
export const reqGetBannerList = () => mockRequests.get("/banner");
// 获取floor
export const reqFloorList = () => mockRequests.get("/floor");

// 请求地址 /api/list  post  请求需要带参数
// 当前这个接口（获取搜索模块的数据），给服务器传递一个默认参数（至少是一个空对象）
export const reqGetSearchInFo = (params) =>
  requests({ url: "/list", method: "post", data: params });

// 商品详情页面的接口  /api/item/{ skuId }   get
export const reqGoodsInfo = (skuId) =>
  requests({ url: `/item/${skuId}`, method: "get" });
