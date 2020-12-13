<template>
  <!-- 选择 -->
  <el-card>
    <el-form :inline="true" :model="category" class="demo-form-inline">
      <el-form-item label="一级分类">
        <el-select
          v-model="category.category1Id"
          placeholder="请选择"
          @change="handleSelectChange1"
          :disabled="disabled"
        >
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
        <el-select
          v-model="category.category2Id"
          placeholder="请选择"
          @change="handleSelectChange2"
          :disabled="disabled"
        >
          <!-- 二级分类数据 -->
          <el-option
            :label="c2.name"
            :value="c2.id"
            v-for="c2 in category2List"
            :key="c2.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          v-model="category.category3Id"
          placeholder="请选择"
          @change="handleSelectChange3"
          :disabled="disabled"
        >
          <!-- 三级分类数据 -->
          <el-option
            :label="c3.name"
            :value="c3.id"
            v-for="c3 in category3List"
            :key="c3.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: "Category",
  props: ["disabled"],
  data() {
    return {
      category: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
      },
      category1List: [],
      category2List: [],
      category3List: [],
    };
  },
  methods: {
    // 点击一级目录,获取二级目录
    async handleSelectChange1(e) {
      // console.log(e); 获取的是一级目录的id
      /* 点击一级目录,让二级三级目录清空 */
      this.category2List = [];
      this.category3List = [];
      this.category.category2Id = "";
      this.category.category3Id = "";

      const res = await this.$API.attrs.getCategory2Data(e);
      if (res.ok) {
        this.$message.success("二级分类数据获取成功");
        this.category2List = res.data;
      } else {
        this.$message.error("二级分类数据获取失败");
      }
    },

    // 点击二级目录,获取三级目录
    async handleSelectChange2(e) {
      /* 点击一级目录,让二级三级目录清空 */
      this.category3List = [];
      this.category.category3Id = "";

      const res = await this.$API.attrs.getCategory3Data(e);
      if (res.ok) {
        this.$message.success("三级分类数据获取成功");
        this.category3List = res.data;
      } else {
        this.$message.error("三级分类数据获取失败");
      }
    },
    // 点击三级目录,发送请求获取属性,emit子组件给父组件传递参数,自定义事件
    async handleSelectChange3(category3Id) {
      const category = {
        ...this.category,
        category3Id,
      };
      this.$emit("allAttrsData", category);
    },
  },
  async mounted() {
    const res = await this.$API.attrs.getCategory1Data();
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