import { Message } from "element-ui";

// 引入所有,并且重命名为API
// import * as API from "@/api";

import API from "@/api";

export default {
  state: {
    category: {
      category1Id: "",
      category2Id: "",
      category3Id: ""
    },
    category1List: [],
    category2List: [],
    category3List: []
  },
  actions: {
    /* 获取一级分类列表 */
    async getCategory1Data({ commit }) {
      const res = await API.attrs.getCategory1Data();
      if (res.ok) {
        // Message.success("一级分类数据获取成功");
        commit("GET_CATEGORY1_DATA", res.data);
      } else {
        Message.error("一级分类数据获取失败");
      }
    },
    /* 获取二级分类列表 */
    async getCategory2Data({ commit }, category1Id) {
      const res = await API.attrs.getCategory2Data(category1Id);
      if (res.ok) {
        // Message.success("二级分类数据获取成功");
        commit("GET_CATEGORY2_DATA", { category1Id, category2List: res.data });
      } else {
        Message.error("二级分类数据获取失败");
      }
    },
    /* 获取三级分类列表 */
    async getCategory3Data({ commit }, category2Id) {
      const res = await API.attrs.getCategory3Data(category2Id);
      if (res.ok) {
        // Message.success("三级分类数据获取成功");
        commit("GET_CATEGORY3_DATA", { category2Id, category3List: res.data });
      } else {
        Message.error("三级分类数据获取失败");
      }
    }
    /* 获取 */
  },
  mutations: {
    /* 一级分类数据 */
    GET_CATEGORY1_DATA(state, category1List) {
      state.category1List = category1List;
    },
    /* 二级分类数据 */
    GET_CATEGORY2_DATA(state, { category1Id, category2List }) {
      // 点击一级分类列表,请求二级分类列表
      state.category2List = category2List;
      state.category.category1Id = category1Id;

      // 清空
      state.category.category2Id = "";
      state.category.category3Id = "";
      state.category3List = "";
    },
    /* 三级分类数据 */
    GET_CATEGORY3_DATA(state, { category2Id, category3List }) {
      state.category3List = category3List;
      state.category.category2Id = category2Id;
      state.category.category3Id = "";
    },
    /* 三级ID设置 */
    SET_CATEGORY_3ID(state, category3Id) {
      state.category.category3Id = category3Id;
    },
    /* 清空id */
    RESET_CAREGORY_ID(state) {
      state.category.category1Id = "";
      state.category.category2Id = "";
      state.category.category3Id = "";
    }
  },
  getters: {}
};
