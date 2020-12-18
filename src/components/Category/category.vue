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
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  name: "Category",
  props: ["disabled"],
  data() {
    const { category } = this.$store.state.category;
    return {
      category: {
        category1Id: category.category1Id,
        category2Id: category.category2Id,
        category3Id: category.category3Id,
      },
      // category1List: [],
      // category2List: [],
      // category3List: [],
    };
  },
  computed: {
    ...mapState({
      category1List: (state) => state.category.category1List,
      category2List: (state) => state.category.category2List,
      category3List: (state) => state.category.category3List,
      // 不行：数据代理是先代理data数据，再代理计算属性
      // category: (state) => state.category.category,
    }),
  },
  methods: {
    ...mapActions(["getCategory1Data", "getCategory2Data", "getCategory3Data"]),
    ...mapMutations(["SET_CATEGORY_3ID"]),
    // 点击一级目录,获取二级目录
    async handleSelectChange1(category1Id) {
      // console.log(e); 获取的是一级目录的id
      /* 点击一级目录,让二级三级目录清空 */
      // this.category2List = [];
      // this.category3List = [];
      this.category.category2Id = "";
      this.category.category3Id = "";
      // this.$bus.$emit("clsAttr");

      // const res = await this.$API.attrs.getCategory2Data(e);
      // if (res.ok) {
      //   this.$message.success("二级分类数据获取成功");
      //   this.category2List = res.data;
      // } else {
      //   this.$message.error("二级分类数据获取失败");
      // }
      this.getCategory2Data(category1Id);
    },

    // 点击二级目录,获取三级目录
    async handleSelectChange2(category2Id) {
      /* 点击一级目录,让二级三级目录清空 */
      // this.category3List = [];
      this.category.category3Id = "";
      // this.$bus.$emit("clsAttr");

      // const res = await this.$API.attrs.getCategory3Data(e);
      // if (res.ok) {
      //   this.$message.success("三级分类数据获取成功");
      //   this.category3List = res.data;
      // } else {
      //   this.$message.error("三级分类数据获取失败");
      // }
      this.getCategory3Data(category2Id);
    },
    // 点击三级目录,发送请求获取属性,emit子组件给父组件传递参数,自定义事件
    async handleSelectChange3(category3Id) {
      // const category = {
      //   ...this.category,
      //   category3Id,
      // };
      this.SET_CATEGORY_3ID(category3Id);
      // this.$bus.$emit("allAttrsData", category);
    },
  },
  async mounted() {
    // const res = await this.$API.attrs.getCategory1Data();
    // if (res.ok) {
    //   this.$message.success("一级分类数据获取成功");
    //   this.category1List = res.data;
    // } else {
    //   this.$message.error("一级分类数据获取失败");
    // }
    this.getCategory1Data();
  },
};
</script>

<style>
</style>