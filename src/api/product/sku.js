import request from "@/utils/request";

const api_name = "/admin/product";

export default {
  /* 获取sku数据 */
  getSkuList(page, limit) {
    return request({
      url: `${api_name}/list/${page}/${limit}`,
      method: "GET"
    });
  },
  /* /admin/product/saveSkuInfo */
  reqSaveSkuInfo(data) {
    return request({
      url: `${api_name}/saveSkuInfo`,
      method: "POST",
      data
    });
  }
};
