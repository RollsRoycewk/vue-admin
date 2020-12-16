<template>
  <div>
    <Category :disabled="!isShowSpu"></Category>
    <SpuDataList v-if="isShowSpu" @spuEveryData="spuEveryData"></SpuDataList>
    <UpSpu v-else :supData="supData" @isShowState="isShowState"></UpSpu>
    <AddSkuData />
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
      // 确定展示sup页面还是修改页面
      isShowSpu: true,
      // sup数据
      supData: {},
    };
  },
  methods: {
    spuEveryData(row) {
      this.isShowSpu = false;
      this.supData = { ...row };
    },
    isShowState(category3Id) {
      this.isShowSpu = true;
      this.$nextTick(() => {
        this.$bus.$emit("allAttrsData", { category3Id });
      });
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
