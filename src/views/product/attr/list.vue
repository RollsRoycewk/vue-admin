<template>
  <div>
    <!-- 选择 -->
    <el-card>
      <el-form :inline="true" :model="category" class="demo-form-inline">
        <el-form-item label="一级分类">
          <el-select v-model="category.category1Id" placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
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
    <!-- 信息 -->
    <el-card class="box-card">
      <!-- 按钮 -->
      <el-button type="primary" disabled>
        <i class="el-icon-plus"></i>
        <span>添加属性</span>
      </el-button>
      <!-- 列表信息 -->
      <el-table :data="attrList" border style="width: 100%">
        <el-table-column prop="date" label="序号" width="80px" align="center">
        </el-table-column>
        <el-table-column prop="name" label="属性名称" width="150px">
        </el-table-column>
        <el-table-column prop="address" label="属性值列表"> </el-table-column>
        <el-table-column prop="address" label="操作" width="150px">
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "AttrList",
  data() {
    return {
      category: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
      },
      attrList: [],
    };
  },
};
</script>

<style lang="sass">
.box-card
  margin-top: 20px
</style>