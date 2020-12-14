<template>
  <div>
    <Category></Category>
    <SpuDataList v-show="isShowSpu"></SpuDataList>
    <AddSpu v-show="!isShowSpu"></AddSpu>
  </div>
</template>

<script>
import Category from "@/components/Category/category";
import SpuDataList from "./SpuDataList";
import AddSpu from "./AddSpu";

export default {
  name: "SpuList",
  data() {
    return {
      isShowSpu: false,
    };
  },
  components: {
    Category,
    SpuDataList,
    AddSpu,
  },
};
</script>
