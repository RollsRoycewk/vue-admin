<template>
  <el-card class="box-card" style="margin: 20px 0">
    <!-- 添加按钮 -->
    <el-button type="primary">
      <i class="el-icon-plus"></i>
      添加SPU
    </el-button>
    <!-- SPU列表 -->
    <el-table border style="width: 100%">
      <el-table-column prop="date" label="序号" width="80" align="center">
      </el-table-column>
      <el-table-column prop="name" label="SPU名称"> </el-table-column>
      <el-table-column prop="address" label="SPU描述"> </el-table-column>
      <el-table-column prop="address" label="操作"> </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <!-- @size-change="handleSizeChange"
    @current-change="handleCurrentChange" -->
    <el-pagination
      class="trademark-pagination"
      :page-sizes="[3, 5, 10, 15, 60]"
      :page-size="5"
      layout="  prev, pager, next, jumper,sizes,total"
      :total="1"
    >
    </el-pagination>
  </el-card>
</template>

<script>
export default {
  name: "SpuDataList",
};
</script>

<style lang="sass">
.trademark-pagination
  text-align: right
.el-pagination__sizes
  margin-left: 250px
</style>