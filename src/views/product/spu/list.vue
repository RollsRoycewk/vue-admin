<template>
  <div>
    <AddSkuData
      v-if="isShowAddSku"
      :skuDataList="skuDataList"
      @isShowAddSkuFalse="isShowAddSkuFalse"
    />
    <div v-else>
      <Category :disabled="!isShowSpu"></Category>
      <SpuDataList
        v-if="isShowSpu"
        @spuEveryData="spuEveryData"
        @isShowAddSkuState="isShowAddSkuState"
      ></SpuDataList>
      <UpSpu v-else :supData="supData" @isShowState="isShowState"></UpSpu>
    </div>
  </div>
</template>

<script>
import Category from "@/components/Category/category";
import SpuDataList from "./SpuDataList";
import UpSpu from "./UpSpu";
import AddSkuData from "./AddSkuData";

export default {
  name: "SpuList",
  data() {
    return {
      // AddSku
      skuDataList: {},
      // 确定展示sup页面还是修改页面
      isShowSpu: true,
      // sup数据
      supData: {},
      // 是否展示AddSku
      isShowAddSku: false,
    };
  },
  methods: {
    // 关闭
    isShowAddSkuFalse(category3Id) {
      this.isShowAddSku = false;
      // this.$nextTick(() => {
      //   this.$bus.$emit("allAttrsData", { category3Id });
      // });
    },
    isShowAddSkuState(row) {
      this.isShowAddSku = true;
      this.skuDataList = { ...row };
    },
    spuEveryData(row) {
      this.isShowSpu = false;
      this.supData = { ...row };
    },
    isShowState(category3Id) {
      this.isShowSpu = true;
      // this.$nextTick(() => {
      //   this.$bus.$emit("allAttrsData", { category3Id });
      // });
    },
  },
  components: {
    Category,
    SpuDataList,
    UpSpu,
    AddSkuData,
  },
};
</script>
