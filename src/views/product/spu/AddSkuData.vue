
<template>
  <el-card class="box-card">
    <el-form ref="form" label-width="80px" :model="supEveryData">
      <!-- SPU名称 -->
      <el-form-item label="SPU名称">{{ supEveryData.spuName }} </el-form-item>
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
        <div class="addSkuData-select" v-for="attr in attrList" :key="attr.id">
          <span>{{ attr.attrName }}</span>
          <el-select placeholder="请选择" v-model="text">
            <el-option
              v-for="attrValue in attr.attrValueList"
              :key="attrValue.id"
              :value="attrValue.id"
              :label="attrValue.valueName"
            ></el-option>
          </el-select>
        </div>
      </el-form-item>
      <!-- 销售属性 -->
      <el-form-item label="销售属性">
        <div
          class="addSkuData-select"
          v-for="spuSale in spuSaleAttr"
          :key="spuSale.id"
        >
          <span>{{ spuSale.saleAttrName }}</span>
          <el-select placeholder="请选择" v-model="text">
            <el-option
              v-for="spuSaleAttrValue in spuSale.spuSaleAttrValueList"
              :key="spuSaleAttrValue.id"
              :value="spuSaleAttrValue.id"
              :label="spuSaleAttrValue.saleAttrValueName"
            ></el-option>
          </el-select>
        </div>
      </el-form-item>
      <!-- 图片列表 -->
      <!-- @selection-change="handleSelectionChange" -->
      <el-form-item label="图片列表">
        <el-table
          border
          ref="multipleTable"
          :data="spuImageList"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column label="图片" width="120">
            <template slot-scope="scope">
              <img alt="" :src="scope.row.imgUrl" style="width: 100px" />
            </template>
          </el-table-column>
          <el-table-column prop="imgName" label="名称"> </el-table-column>
          <el-table-column prop="address" label="操作" show-overflow-tooltip>
            <template>
              <el-button type="primary" size="mini">设为默认</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 保存取消按钮 -->
        <div class="addSkuData-save">
          <el-button type="primary" disabled>保存</el-button>
          <el-button @click="$emit('isShowAddSkuFalse')">取消</el-button>
        </div>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "AddSkuData",
  computed: {
    ...mapState({
      category: (state) => state.category.category,
    }),
  },
  data() {
    return {
      text: "",
      supEveryData: this.skuDataList,
      spuSaleAttr: {},
      spuImageList: [],
      attrList: [],
    };
  },
  methods: {
    /* 获取所有销售属性 */
    async getSpuSaleAttrList() {
      const { id } = this.supEveryData;
      const res = await this.$API.spu.getSpuSaleAttrList(id);
      if (res.code === 200) {
        this.$message.success("所有品牌销售数据获取成功");
        this.spuSaleAttr = res.data;
        // this.baseSaleAttr = res.data;
      } else {
        this.$message.error("所有品牌销售数据获取成功");
      }
    },
    /* 获取该品牌的图片 */
    async getSpuImageList() {
      const { id } = this.supEveryData;
      const res = await this.$API.spu.getSpuImageList(id);
      if (res.code === 200) {
        this.$message.success("该品牌图片数据获取成功");
        this.spuImageList = res.data;
      } else {
        this.$message.error("该品牌图片数据获取成功");
      }
    },
    /* 获取平台属性 */
    async getAttrList() {
      // 后面更新数以后重新刷新用
      // const { category1Id, category2Id, category3Id } = this.supEveryData;
      const res = await this.$API.attrs.getCategoryAttrsData(this.category);
      if (res.ok) {
        this.attrList = res.data;
        this.$message.success("所有属性获取成功");
      } else {
        this.$message.error("所有属性获取成功");
      }
    },
  },
  props: {
    skuDataList: {
      type: Object,
    },
  },
  mounted() {
    this.getSpuSaleAttrList();
    this.getSpuImageList();
    this.getAttrList();
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