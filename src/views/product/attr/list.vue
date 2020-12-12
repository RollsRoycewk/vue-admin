<template>
  <div>
    <!-- 组件 -->
    <Category @allAttrsData="getAttrList"></Category>
    <!-- 信息 -->
    <el-card class="box-card">
      <!-- 按钮 -->
      <el-button type="primary" disabled>
        <i class="el-icon-plus"></i>
        <span>添加属性</span>
      </el-button>
      <!-- 列表信息 -->
      <el-table :data="attrList" border style="width: 100%">
        <el-table-column
          prop="date"
          label="序号"
          width="80px"
          align="center"
          type="index"
        >
        </el-table-column>
        <el-table-column prop="attrName" label="属性名称" width="150px">
        </el-table-column>
        <el-table-column prop="address" label="属性值列表">
          <template v-slot="{ row }">
            <el-tag
              v-for="attrValue in row.attrValueList"
              :key="attrValue.id"
              style="margin-right: 5px"
              >{{ attrValue.valueName }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作" width="150px">
          <el-button type="primary" size="mini"
            ><i class="el-icon-edit"></i
          ></el-button>
          <el-button type="danger" size="mini">
            <i class="el-icon-delete"></i
          ></el-button>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
// 引入组件
import Category from "./category";

export default {
  name: "AttrList",
  data() {
    return {
      attrList: [],
    };
  },
  methods: {
    getAttrList(data) {
      this.attrList = data;
    },
  },
  components: {
    Category,
  },
};
</script>

<style lang="sass">
.box-card
  margin-top: 20px
</style>