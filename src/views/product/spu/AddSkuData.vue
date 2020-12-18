
<template>
  <el-card class="box-card">
    <el-form
      label-width="80px"
      :model="sku"
      :rules="addsKuRules"
      ref="addsKuRef"
    >
      <!-- SPU名称 -->
      <el-form-item label="SPU名称">{{ supEveryData.spuName }} </el-form-item>
      <!-- SKU名称 -->
      <el-form-item label="SKU名称" prop="skuName">
        <el-input placeholder="SKU名称" v-model="sku.skuName"></el-input>
      </el-form-item>
      <!-- SKU价格 -->
      <!-- @change="handleChange" -->
      <el-form-item label="价格(元)" prop="price">
        <el-input-number
          controls-position="right"
          :min="0"
          placeholder="SKU价格"
          v-model="sku.price"
        ></el-input-number>
      </el-form-item>
      <!-- SKU重量 -->
      <el-form-item label="重量(千克)" prop="weight">
        <el-input-number
          controls-position="right"
          :min="0"
          placeholder="SKU重量"
          v-model="sku.weight"
        ></el-input-number>
      </el-form-item>
      <!-- 规则描述 -->
      <el-form-item label="规则描述" prop="skuDesc">
        <el-input
          type="textarea"
          placeholder="SKU规则描述"
          v-model="sku.skuDesc"
        ></el-input>
      </el-form-item>
      <!-- 平台属性 -->
      <el-form-item label="平台属性" prop="skuAttrValueList">
        <div
          class="addSkuData-select"
          v-for="(attr, index) in attrList"
          :key="attr.id"
        >
          <el-form-item :label="attr.attrName">
            <!-- <span>{{ attr.attrName }}</span> -->
            <el-select
              placeholder="请选择"
              v-model="sku.skuAttrValueList[index]"
              @change="clearRules('skuAttrValueList')"
            >
              <el-option
                v-for="attrValue in attr.attrValueList"
                :key="attrValue.id"
                :value="`${attr.id}-${attrValue.id}`"
                :label="attrValue.valueName"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-form-item>
      <!-- 销售属性 -->
      <el-form-item label="销售属性" prop="skuSaleAttrValueList">
        <div
          class="addSkuData-select"
          v-for="(spuSale, index) in spuSaleAttr"
          :key="spuSale.id"
        >
          <el-form-item :label="spuSale.saleAttrName">
            <el-select
              placeholder="请选择"
              v-model="sku.skuSaleAttrValueList[index]"
            >
              <el-option
                v-for="spuSaleAttrValue in spuSale.spuSaleAttrValueList"
                :key="spuSaleAttrValue.id"
                :value="spuSaleAttrValue.id"
                :label="spuSaleAttrValue.saleAttrValueName"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-form-item>
      <!-- 图片列表 -->
      <!-- @selection-change="handleSelectionChange" -->
      <el-form-item label="图片列表" prop="skuImageList">
        <el-table
          border
          ref="multipleTable"
          :data="spuImageList"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          row-key="id"
        >
          >
          <el-table-column type="selection" width="55" reserve-selection>
          </el-table-column>
          <el-table-column label="图片" width="120">
            <template slot-scope="scope">
              <img alt="" :src="scope.row.imgUrl" style="width: 100px" />
            </template>
          </el-table-column>
          <el-table-column prop="imgName" label="名称"> </el-table-column>
          <el-table-column prop="address" label="操作" show-overflow-tooltip>
            <template v-slot="{ row, $index }">
              <el-button
                type="primary"
                size="mini"
                v-if="!row.isDefault"
                @click="setDefault($index)"
                >设为默认</el-button
              >
              <el-tag v-else type="success">默认</el-tag>
            </template>
          </el-table-column>
        </el-table>
        <!-- 保存取消按钮 -->
        <div class="addSkuData-save">
          <el-button type="primary" @click="saveSubmit('addsKuRef')"
            >保存</el-button
          >
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
      sku: {
        skuAttrValueList: [],
        skuSaleAttrValueList: [],
        skuImageList: [],
      },
      supEveryData: this.skuDataList,
      spuSaleAttr: {},
      spuImageList: [],
      attrList: [],
      // 效验
      addsKuRules: {
        skuName: [
          { required: true, message: "请输入SKU名称", trigger: "change" },
        ],
        price: [
          { required: true, message: "请输入SKU价格", trigger: "change" },
        ],
        weight: [
          { required: true, message: "请输入SKU重量", trigger: "change" },
        ],
        skuDesc: [
          { required: true, message: "请输入SKU描述", trigger: "change" },
        ],
        skuAttrValueList: [
          { required: true, validator: this.skuAttrValueList },
        ],
      },
    };
  },
  methods: {
    // 移出效验
    clearRules(prop) {
      this.$refs.addsKuRef.clearValidate(prop);
    },
    // 效验
    skuAttrValueList(rule, value, callback) {
      const {
        attrList,
        sku: { skuAttrValueList },
      } = this;
      if (
        attrList.length !== skuAttrValueList.length ||
        attrList.some((val) => !val)
      ) {
        callback(new Error("请选择全部的属性"));
        return;
      }
      callback();
    },
    // 提交
    async saveSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });

      // const { category3Id, id, tmId } = this.supEveryData;
      // const skuSaleAttrValueList = this.sku.skuSaleAttrValueList.map((item) => {
      //   return {
      //     saleAttrValueId: item,
      //     spuId: id,
      //   };
      // });

      // const skuAttrValueList = this.sku.skuAttrValueList.map((item) => {
      //   const [attrId, valueId] = item.split("-");
      //   return {
      //     attrId,
      //     valueId: 0,
      //   };
      // });

      // let skuDefaultImg = this.sku.skuImageList.find((item) => item.isDefault)
      //   .imgUrl;
      // const submitData = {
      //   ...this.sku,
      //   category3Id,
      //   spuId: id,
      //   tmId,
      //   skuSaleAttrValueList,
      //   skuAttrValueList,
      //   skuDefaultImg,
      // };
      // const res = await this.$API.sku.reqSaveSkuInfo(submitData);
      // if (res.code === 200) {
      //   this.$message.success("SKU上传成功,前台可以看到图片了");
      //   this.spuSaleAttr = res.data;
      //   // this.baseSaleAttr = res.data;
      // } else {
      //   this.$message.error("SKU上传失败");
      // }
    },
    // 设置默认
    setDefault(rowindex) {
      this.spuImageList = this.spuImageList.map((img, index) => {
        return {
          ...img,
          isDefault: rowindex === index ? true : false,
        };
      });
    },
    // 手机图片
    handleSelectionChange(skuImageList) {
      // console.log(skuImageList);
      this.sku.skuImageList = skuImageList;
    },
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
.addSkuData-select
  margin: 5px 0
>>>.el-input__inner
  text-align: left
>>>.addSkuData-select
  display: inline-block
  margin-right: 20px
.addSkuData-save
  margin: 20px 0
</style>