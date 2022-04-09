// 当前模块：API进行统一管理
import requests from "./request";

// 三级联动接口
// /api/product/getBaseCategoryList;  get 无参数
// 发送请求返回的结果是promise对象

export const reqCategoryList = () =>
  requests({
    url: "/product/getBaseCategoryList",
    method: "get",
  });
