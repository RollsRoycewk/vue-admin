<template>
  <div>
    <Category></Category>
    <SpuDataList></SpuDataList>
  </div>
</template>

<script>
import Category from "@/components/Category/category";
import SpuDataList from "./SpuDataList";

export default {
  name: "SpuList",
  components: {
    Category,
    SpuDataList,
  },
};
</script>
