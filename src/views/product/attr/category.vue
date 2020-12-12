<template>
  <!-- 选择 -->
  <el-card>
    <el-form :inline="true" :model="category" class="demo-form-inline">
      <el-form-item label="一级分类">
        <el-select v-model="category.category1Id" placeholder="请选择">
          <!-- 一级数据展示 -->
          <el-option
            :label="c1.name"
            :value="c1.id"
            v-for="c1 in category1List"
            :key="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select v-model="category.category2Id" placeholder="请选择">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select v-model="category.category2Id" placeholder="请选择">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: "Category",
  data() {
    return {
      category: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
      },
      category1List: [],
    };
  },
  async mounted() {
    const res = await this.$API.attrs.getCategory1Data();
    console.log(res);
    if (res.ok) {
      this.$message.success("一级分类数据获取成功");
      this.category1List = res.data;
    } else {
      this.$message.error("一级分类数据获取失败");
    }
  },
};
</script>

<style>
</style>