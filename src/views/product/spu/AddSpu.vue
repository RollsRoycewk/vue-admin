<template>
  <el-card class="box-card">
    <el-form label-width="80px">
      <!-- SPU名称 -->
      <el-form-item label="SPU名称">
        <el-input placeholder="SPU名称"></el-input>
      </el-form-item>
      <!-- 品牌名称 -->
      <el-form-item label="品牌">
        <el-select placeholder="请选择品牌" v-model="test">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <!-- SPU描述 -->
      <el-form-item label="SPU描述">
        <el-input type="textarea" placeholder="SPU描述"></el-input>
      </el-form-item>
      <!-- SPU图片 -->
      <!-- :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove" 
        :action="`${$BASE_API}/admin/product/fileUpload`"
        -->
      <el-form-item label="SPU图片">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <!-- 销售类型 -->
      <el-form-item label="销售属性">
        <el-select placeholder="还有三个未选择" v-model="test">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
        <el-button type="primary">
          <i class="el-icon-plus"></i>
          添加销售类型
        </el-button>
        <!-- 销售类型列表 -->
        <el-table border style="width: 100%; margin: 20px 0">
          <el-table-column prop="date" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="name" label="属性名" width="150">
          </el-table-column>
          <el-table-column prop="address" label="属性值名称列表">
          </el-table-column>
          <el-table-column prop="address" label="操作" width="150">
          </el-table-column>
        </el-table>
        <!-- 保存取消按钮 -->
        <el-button type="primary">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: "AddSpu",
  data() {
    return {
      test: [],
    };
  },
};
</script>

<style>
</style>