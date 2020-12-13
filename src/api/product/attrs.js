import request from "@/utils/request";

const api_name = "/admin/product";

export default {
  /*
  获取一级分类商品数据
  */
  getCategory1Data() {
    return request({
      url: `${api_name}/getCategory1`,
      method: "GET"
    });
  },

  /* 获取二级分类商品数据 */
  getCategory2Data(category1Id) {
    return request({
      url: `${api_name}/getCategory2/${category1Id}`,
      method: "GET"
    });
  },

  /* 获取三级分类商品数据 */
  getCategory3Data(category2Id) {
    return request({
      url: `${api_name}/getCategory3/${category2Id}`,
      method: "GET"
    });
  },
  /* 获取所有商品属性 */
  getCategoryAttrsData({ category1Id, category2Id, category3Id }) {
    return request({
      url: `${api_name}/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
      method: "GET"
    });
  },

  /* 更新属性 */
  getUpdataAttr(data) {
    return request({
      url: `${api_name}/saveAttrInfo`,
      method: "POST",
      data
    });
  }
};
