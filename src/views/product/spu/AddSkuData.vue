<template>
  <el-card class="box-card">
    <el-form ref="form" label-width="80px">
      <!-- SPU名称 -->
      <el-form-item label="SPU名称"> </el-form-item>
      <!-- SKU名称 -->
      <el-form-item label="SKU名称">
        <el-input placeholder="SKU名称"></el-input>
      </el-form-item>
      <!-- SKU价格 -->
      <!-- @change="handleChange" -->
      <el-form-item label="价格(元)">
        <el-input-number
          controls-position="right"
          :min="0"
          placeholder="SKU价格"
        ></el-input-number>
      </el-form-item>
      <!-- SKU重量 -->
      <el-form-item label="重量(千克)">
        <el-input-number
          controls-position="right"
          :min="0"
          placeholder="SKU重量"
        ></el-input-number>
      </el-form-item>
      <!-- 规则描述 -->
      <el-form-item label="规则描述">
        <el-input type="textarea" placeholder="SKU规则描述"></el-input>
      </el-form-item>
      <!-- 平台属性 -->
      <el-form-item label="平台属性">
        <div class="addSkuData-select">
          <span>啦啦啦</span>
          <el-select placeholder="请选择" v-model="text">
            <el-option value="123">111</el-option>
            <el-option value="456">222</el-option>
          </el-select>
        </div>
      </el-form-item>
      <!-- 销售属性 -->
      <el-form-item label="销售属性">
        <div class="addSkuData-select">
          <span>啦啦啦</span>
          <el-select placeholder="请选择" v-model="text">
            <el-option value="123">111</el-option>
            <el-option value="456">222</el-option>
          </el-select>
        </div>
      </el-form-item>
      <!-- 图片列表 -->
      <!-- @selection-change="handleSelectionChange" -->
      <el-form-item label="图片列表">
        <el-table
          border
          ref="multipleTable"
          :data="[]"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column label="图片" width="120">
            <template slot-scope="scope">
              <img alt="" :src="scope.row.imgUrl" />
            </template>
          </el-table-column>
          <el-table-column prop="name" label="名称"> </el-table-column>
          <el-table-column prop="address" label="操作" show-overflow-tooltip>
            <template>
              <el-button type="primary" size="mini">设为默认</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 保存取消按钮 -->
        <div class="addSkuData-save">
          <el-button type="primary" disabled>保存</el-button>
          <el-button disabled>取消</el-button>
        </div>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: "AddSkuData",
  data() {
    return {
      text: "",
    };
  },
};
</script>

<style lang="sass" scoped>
>>>.el-input__inner
  text-align: left
>>>.addSkuData-select
  display: inline-block
  margin-right: 20px
.addSkuData-save
  margin: 20px 0
</style>