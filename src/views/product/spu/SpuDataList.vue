<template>
  <el-card class="box-card" style="margin: 20px 0">
    <!-- 添加按钮 -->
    <el-button
      type="primary"
      :disabled="!category.category3Id"
      @click="$emit('spuEveryData', { category3Id: category.category3Id })"
    >
      <i class="el-icon-plus"></i>
      添加SPU
    </el-button>
    <!-- SPU列表 -->
    <el-table border style="width: 100%" :data="spuAllData">
      <el-table-column type="index" label="序号" width="80" align="center">
      </el-table-column>
      <el-table-column prop="spuName" label="SPU名称"> </el-table-column>
      <el-table-column prop="description" label="SPU描述"> </el-table-column>
      <el-table-column prop="address" label="操作">
        <template v-slot="{ row }">
          <el-button
            type="primary"
            size="mini"
            @click="$emit('isShowAddSkuState', { ...row, ...category })"
            ><i class="el-icon-plus"></i
          ></el-button>
          <el-button
            type="primary"
            size="mini"
            @click="$emit('spuEveryData', row)"
            ><i class="el-icon-edit"></i>
          </el-button>
          <el-button type="info" size="mini">
            <i class="el-icon-info"></i>
          </el-button>
          <el-button type="danger" size="mini">
            <i class="el-icon-delete"></i>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      class="trademark-pagination"
      :page-sizes="[3, 5, 10, 15, 60]"
      :page-size="size"
      layout="  prev, pager, next, jumper,sizes,total"
      :total="total"
    >
    </el-pagination>
  </el-card>
</template>

<script>
import { Handler } from "mockjs";
import { mapState } from "vuex";

export default {
  name: "SpuDataList",
  data() {
    return {
      // 分页相关
      current: 1,
      size: 3,
      total: 0,
      // spu所有数据
      spuAllData: [],
      // 三级导航id
      // category: {
      //   category1Id: "",
      //   category2Id: "",
      //   category3Id: "",
      // },
    };
  },
  watch: {
    "category.category3Id": {
      handler(category3Id) {
        if (!category3Id) return;
        this.handleEmitAllattrData();
      },
      immediate: true,
    },
    // "category.category3Id"() {
    //   this.handleEmitAllattrData();
    // },
    "category.category1Id"() {
      this.clsAttr();
    },
    "category.category2Id"() {
      this.clsAttr();
    },
  },
  methods: {
    async getPageSpuData(current, size) {
      const { category3Id } = this.category;
      const res = await this.$API.spu.getPageSpu({
        category3Id,
        current,
        size,
      });
      // console.log(res);
      if (res.code === 200) {
        this.$message.success("SPU数据获取完成");
        this.spuAllData = res.data.records;
        this.total = res.data.total;
      } else {
        this.$message.error("SPU数据获取失败");
      }
    },
    /* 分页器相关 */
    handleSizeChange(size) {
      // 选择的每页显示数量
      this.size = size;
      this.getPageSpuData(this.current, this.size);
    },
    handleCurrentChange(current) {
      // 当前点击的页数
      this.current = current;
      this.getPageSpuData(this.current, this.size);
    },
    // 自定义全局事件回调
    handleEmitAllattrData() {
      // this.category = category;
      this.getPageSpuData(this.current, this.size);
    },
    // 清空数据
    clsAttr() {
      this.current = 1;
      this.size = 3;
      this.total = 0;
      this.spuAllData = [];
      this.category.category3Id = "";
    },
  },
  computed: {
    ...mapState({
      category: (state) => state.category.category,
    }),
  },

  // mounted() {
  //   this.$bus.$on("allAttrsData", this.handleEmitAllattrData);
  //   this.$bus.$on("clsAttr", this.clsAttr);
  // },

  // beforeDestroy() {
  //   //否则每一次都会绑定一个事件
  //   this.$bus.$off("allAttrsData", this.handleEmitAllattrData);
  //   this.$bus.$off("clsAttr", this.clsAttr);
  // },
};

// category3Id:61
// description:"测试品牌1~"
// id:2219
// spuImageList:null
// spuName:"ce1~"
// spuSaleAttrList:null
// tmId:5923
</script>

<style lang="sass">
.trademark-pagination
  text-align: right
.el-pagination__sizes
  margin-left: 250px
</style>