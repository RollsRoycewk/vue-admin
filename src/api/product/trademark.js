import request from "@/utils/request";

const api_name = "/admin/product/baseTrademark";

export default {
  /*
  获取商品品牌
  */
  getPageList(page, limit) {
    return request({
      url: `${api_name}/${page}/${limit}`,
      method: "GET"
    });
  },

  /* 添加品牌数据 */
  addPageList(data) {
    return request({
      url: `${api_name}/save`,
      method: "POST",
      data
    });
  },

  /* 删除品牌数据 */
  deltePageList(id) {
    return request({
      url: `${api_name}/remove/${id}`,
      method: "DELETE"
    });
  },
  /* 更新数据 */
  updataPageList(data) {
    return request({
      url: `${api_name}/update`,
      method: "PUT",
      data
    });
  }
};
