<template>
  <div>
    <!-- 添加按钮 -->
    <el-button type="primary" icon="el-icon-plus">添加</el-button>
    <!-- 表格 -->
    <el-table
      :data="trademarkDataList"
      border
      style="width: 100%"
      class="trademark-table"
    >
      <el-table-column type="index" label="序号" width="80" align="center">
      </el-table-column>
      <el-table-column prop="tmName" label="品牌名称"> </el-table-column>
      <el-table-column label="品牌LOGO">
        <template slot-scope="scope">
          <img :src="scope.row.logoUrl" class="trademark-image" />
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template>
          <el-button
            type="warning"
            class="el-button el-button--warning el-button--mini"
          >
            <i class="el-icon-edit"></i>
            <span>修改</span>
          </el-button>
          <el-button
            type="danger"
            class="el-button el-button--warning el-button--mini"
          >
            <i class="el-icon-delete"></i>
            <span>删除</span>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      class="trademark-pagination"
      :page-sizes="[3, 5, 10, 15]"
      :page-size="100"
      layout="  prev, pager, next, jumper,sizes,total"
      :total="400"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "TrademarkList",
  data() {
    return {
      trademarkDataList: [],
    };
  },
  async mounted() {
    try {
      const result = await this.$API.trademark.getPageList(1, 3);
      // {code: 200, message: "成功", data: {…}, ok: true}
      if (result.code === 200) {
        this.$message.success("获取品牌分页列表数据成功");
        // 获取到数据代理到data中
        this.trademarkDataList = result.data.records;
      } else {
        this.$message.error("获取品牌分页列表数据失败");
      }
    } catch (error) {
      this.$message.error(error);
    }
  },
};
</script>

<style lang="sass">
.trademark-table
  margin: 20px 0
.trademark-image
  width: 100px
.trademark-pagination
  text-align: right
.el-pagination__sizes
  margin-left: 250px
</style>
