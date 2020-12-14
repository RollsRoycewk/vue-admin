<template>
  <el-card class="box-card" style="margin: 20px 0">
    <!-- 添加按钮 -->
    <el-button type="primary">
      <i class="el-icon-plus"></i>
      添加SPU
    </el-button>
    <!-- SPU列表 -->
    <el-table border style="width: 100%" :data="spuAllData">
      <el-table-column type="index" label="序号" width="80" align="center">
      </el-table-column>
      <el-table-column prop="spuName" label="SPU名称"> </el-table-column>
      <el-table-column prop="description" label="SPU描述"> </el-table-column>
      <el-table-column prop="address" label="操作"> </el-table-column>
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
      category: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
      },
    };
  },
  methods: {
    async getPageSpuData(current, size) {
      console.log(current, size);
      const { category3Id } = this.category;
      const res = await this.$API.spu.getPageSpu({
        category3Id,
        current,
        size,
      });
      console.log(res);
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
  },
  mounted() {
    this.$bus.$on("allAttrsData", (category) => {
      this.category = category;
      this.getPageSpuData(this.current, this.size);
    });
  },
};
</script>

<style lang="sass">
.trademark-pagination
  text-align: right
.el-pagination__sizes
  margin-left: 250px
</style>