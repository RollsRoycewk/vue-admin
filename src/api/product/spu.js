import request from "@/utils/request";

const api_name = "/admin/product";

export default {
  /* 获取销售属性数据 */
  getBaseSaleAttrList() {
    return request({
      url: `${api_name}/baseSaleAttrList`,
      method: "GET"
    });
  },

  /* 删除SPU */
  getDelSpu(spuId) {
    return request({
      url: `${api_name}/deleteSpu/${spuId}`,
      method: "DELETE"
    });
  },

  /* 获取SPU */
  getSpu(spuId) {
    return request({
      url: `${api_name}/getSpuById/${spuId}`,
      method: "GET"
    });
  },

  /* 保存SPU */
  getSaveSpuInfo(spuInfo) {
    return request({
      url: `${api_name}/saveSpuInfo`,
      method: "POST",
      data: spuInfo
    });
  },

  /* 更新SPU */
  getUpdateSpuInfo(spuInfo) {
    return request({
      url: `${api_name}/updateSpuInfo`,
      method: "POST",
      data: spuInfo
    });
  },

  /* 获取哪一页的数据 */
  getPageSpu({ category3Id, current, size }) {
    return request({
      url: `${api_name}/${current}/${size}`,
      method: "GET",
      params: {
        category3Id
      }
    });
  },
  /* 获取所有品牌商标 */
  getBaseSaleAttrList() {
    return request({
      url: `${api_name}/baseTrademark/getTrademarkList`,
      method: "GET"
    });
  }
};
