<template>
  <div>
    <Category></Category>
    <SpuDataList v-if="isShowSpu" @spuEveryData="spuEveryData"></SpuDataList>
    <UpSpu v-else :supData="supData" @isShowState="isShowState"></UpSpu>
  </div>
</template>

<script>
import Category from "@/components/Category/category";
import SpuDataList from "./SpuDataList";
import UpSpu from "./UpSpu";

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
    isShowState() {
      this.isShowSpu = true;
    },
  },
  components: {
    Category,
    SpuDataList,
    UpSpu,
  },
};
</script>
