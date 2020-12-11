<template>
  <div>
    <!-- 添加按钮 -->
    <el-button type="primary" icon="el-icon-plus">添加</el-button>
    <!-- 表格 -->
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      class="trademark-table"
    >
      <el-table-column prop="date" label="序号" width="80" align="center">
      </el-table-column>
      <el-table-column prop="name" label="品牌名称"> </el-table-column>
      <el-table-column prop="address" label="品牌LOGO">
        <template slot-scope="scope">
          <img :src="scope.row.address" class="trademark-image" />
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
      tableData: [
        {
          date: "1",
          name: "8818",
          address:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607667133407&di=2cd1465298e3532cbb03df3f0c949fbb&imgtype=0&src=http%3A%2F%2Fa4.att.hudong.com%2F27%2F67%2F01300000921826141299672233506.jpg",
        },
      ],
    };
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
