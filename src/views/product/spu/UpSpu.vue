<template>
  <el-card class="box-card" style="margin: 20px 0">
    <el-form
      label-width="80px"
      :model="supEveryData"
      :rules="rules"
      ref="ruleSup"
    >
      <!-- SPU名称 -->
      <el-form-item label="SPU名称" prop="spuName">
        <el-input
          placeholder="SPU名称"
          v-model="supEveryData.spuName"
        ></el-input>
      </el-form-item>
      <!-- 品牌名称 -->
      <el-form-item label="品牌" prop="tmId">
        <!-- 默认图片 -->
        <el-select placeholder="请选择品牌" v-model="supEveryData.tmId">
          <el-option
            :label="trademark.tmName"
            :value="trademark.id"
            v-for="trademark in trademarkList"
            :key="trademark.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- SPU描述 -->
      <el-form-item label="SPU描述" prop="description">
        <el-input
          type="textarea"
          placeholder="SPU描述"
          v-model="supEveryData.description"
        ></el-input>
      </el-form-item>
      <!-- SPU图片 -->

      <el-form-item label="SPU图片" prop="spuImage">
        <el-upload
          :action="`${$BASE_API}/admin/product/fileUpload`"
          list-type="picture-card"
          :file-list="upImgFormat"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <!-- 销售类型 -->
      <el-form-item label="销售属性" prop="sale">
        <el-select
          :placeholder="`还有${filterSaleAttr.length}未选择`"
          v-model="supEveryData.sale"
        >
          <el-option
            :label="spuSale.name"
            :value="spuSale.id"
            v-for="spuSale in filterSaleAttr"
            :key="spuSale.id"
          ></el-option>
        </el-select>
        <el-button
          type="primary"
          @click="addSpuSaleAttr"
          :disabled="!filterSaleAttr.length"
        >
          <i class="el-icon-plus"></i>
          添加销售类型
        </el-button>
        <!-- 销售类型列表 -->
        <el-table
          border
          style="width: 100%; margin: 20px 0"
          :data="spuSaleAttr"
        >
          <el-table-column
            prop="date"
            label="序号"
            width="80"
            align="center"
            type="index"
          >
          </el-table-column>
          <el-table-column prop="saleAttrName" label="属性名" width="150">
          </el-table-column>
          <el-table-column prop="address" label="属性值名称列表">
            <template v-slot="{ row, $index }">
              <el-tag
                @close="delTag(row, index)"
                closable
                style="margin-left: 5px"
                v-for="(ValueList, index) in row.spuSaleAttrValueList"
                :key="ValueList.id"
                >{{ ValueList.saleAttrValueName }}</el-tag
              >
              <el-input
                v-if="row.edit"
                size="mini"
                style="width: 100px"
                autofocus
                ref="attrInput"
                placeholder="请输入内容"
                @blur="editComputed(row, $index)"
                @keyup.enter.native="editComputed(row, $index)"
                v-model="saleAttrValueText"
              >
              </el-input>
              <el-button
                v-else
                icon="el-icon-plus"
                size="mini"
                @click="edit(row)"
              >
              </el-button>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="操作" width="150">
            <template v-slot="{ $index }">
              <el-button type="danger" size="mini" @click="delRow($index)">
                <i class="el-icon-delete"></i>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 保存取消按钮 -->
        <el-button type="primary" @click="submitSup('ruleSup')">保存</el-button>
        <el-button @click="$emit('isShowState', supEveryData.category3Id)"
          >取消</el-button
        >
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: "UpSpu",
  data() {
    return {
      test: [],
      // 效验
      rules: {
        spuName: [
          { required: true, message: "请输入SPU名称", trigger: "blur" },
        ],
        tmId: [{ required: true, message: "请选择品牌名称" }],
        description: [{ required: true, message: "请输入品牌描述" }],
        spuImage: [{ validator: this.spuImageValidator, required: true }],
        sale: [{ validator: this.saleValidator, required: true }],
      },
      // supData的数据
      supEveryData: this.supData,

      // 所有品牌数据
      trademarkList: [],
      // 所有图片数据
      spuImageList: [],
      dialogImageUrl: "",
      dialogVisible: false,
      // 基础销售属性
      baseSaleAttr: [],
      // SPU销售类型
      spuSaleAttr: [],
      // 选项
      saleAttrValueText: "",
    };
  },
  props: {
    supData: {
      type: Object,
    },
  },
  methods: {
    // 属性选择效验
    saleValidator(rule, value, callback) {
      if (this.spuSaleAttr.length === 0) {
        callback(new Error("请至少选择一个销售属性"));
        return;
      }

      const res = this.spuSaleAttr.some(
        (item) => item.spuSaleAttrValueList.length === 0
      );

      if (res) {
        callback(new Error("请至少选择一个销售属性名称"));
        return;
      }

      callback();
    },
    // 图片效验
    spuImageValidator(rule, value, callback) {
      if (this.spuImageList.length > 0) {
        // 效验通过
        callback();
        return;
      }
      callback(new Error("请至少上传一张图片"));
    },
    // 删除row
    delRow(index) {
      this.spuSaleAttr.splice(index, 1);
    },
    // 删除
    delTag(row, index) {
      // row.spuSaleAttrValueList = row.spuSaleAttrValueList.filter(
      //   (item) => item.id !== id
      // );
      row.spuSaleAttrValueList.splice(index, 1);
    },
    // 效验
    submitSup(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          /* 
            {
                "category3Id": 0, // 
                "description": "string",
                "id": 0,
                "spuImageList": [],
                "spuName": "string",
                "spuSaleAttrList": []
                  }
                ],
                "tmId": 0
            }
          */
          const data = {
            ...this.supEveryData,
            spuImageList: this.spuImageList,
            spuSaleAttrList: this.spuSaleAttr,
          };

          let res;
          if (this.supEveryData.id) {
            res = await this.$API.spu.getUpdateSpuInfo(data);
          } else {
            res = await this.$API.spu.getSaveSpuInfo(data);
          }

          if (res.ok) {
            this.$message.success(
              `SPU数据${this.supEveryData.id ? "修改" : "添加"}成功`
            );
            this.$emit("isShowState", this.supEveryData.category3Id);
          }
        } else {
          this.$message.error("数据效验失败");
          return false;
        }
      });
    },
    // edit,解决input聚焦问题
    edit(row) {
      // 设置属性,让其确认显示哪个
      this.$set(row, "edit", true);
      this.$nextTick(() => {
        this.$refs.attrInput.focus();
      });
    },
    // 如果没有就不添加
    editComputed(row, index) {
      if (this.saleAttrValueText) {
        row.spuSaleAttrValueList.push({
          baseSaleAttrId: row.baseSaleAttrId,
          saleAttrName: row.saleAttrName,
          saleAttrValueName: this.saleAttrValueText,
          spuId: row.spuId,
        });
        this.saleAttrValueText = "";
      }
      row.edit = false;
    },
    /* 添加销售类型 */
    addSpuSaleAttr() {
      const { sale, id } = this.supEveryData;
      const res = this.baseSaleAttr.find((item) => item.id === sale);
      // // 添加到下面列表中
      this.spuSaleAttr.push({
        baseSaleAttrId: res.id, // 所有销售属性id
        saleAttrName: res.name, // 所有销售属性名称
        spuId: id, // SPU id
        spuSaleAttrValueList: [], // 销售属性值列表
      });

      this.supEveryData.sale = "";
    },
    /* 获取所有基础销售类型 */
    async getBaseSaleAttrList() {
      const { id } = this.supEveryData;
      const res = await this.$API.spu.getBaseSaleAttrList(id);
      // console.log(res);
      if (res.code === 200) {
        this.$message.success("所有品牌销售数据获取成功");
        this.baseSaleAttr = res.data;
      } else {
        this.$message.error("所有品牌销售数据获取成功");
      }
    },
    /* 获取所有销售属性 */
    async getSpuSaleAttrList() {
      const { id } = this.supEveryData;
      const res = await this.$API.spu.getSpuSaleAttrList(id);
      //data: Array(3)
      // 0:
      // baseSaleAttrId: 1
      // id: 7436
      // saleAttrName: "选择颜色"
      // spuId: 2218
      // spuSaleAttrValueList: Array(2)
      // 0:
      // baseSaleAttrId: 1
      // id: 4617
      // isChecked: null
      // saleAttrName: "选择颜色"
      // saleAttrValueName: "白色"
      // spuId: 2218
      if (res.code === 200) {
        this.$message.success("所有品牌销售数据获取成功");
        this.spuSaleAttr = res.data;
        // this.baseSaleAttr = res.data;
      } else {
        this.$message.error("所有品牌销售数据获取成功");
      }
    },
    /* 获取所有品牌数据 */
    async getTrademarkList() {
      const res = await this.$API.spu.getTrademarkList();
      if (res.code === 200) {
        this.$message.success("所有品牌数据获取成功");
        this.trademarkList = res.data;
      } else {
        this.$message.error("所有品牌数据获取成功");
      }
    },
    /* 获取该品牌的图片 */
    async getSpuImageList() {
      const { id } = this.supEveryData;
      const res = await this.$API.spu.getSpuImageList(id);
      // id: 10146
      // imgName: "5a6dbbae3533292e.jpg"
      // imgUrl: "http://182.92.128.115:8080/group1/M00/00/A5/rBFUDF_W1CWAZG5GAAFhlax_7CU420.jpg"
      // spuId: 2218

      //  [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
      if (res.code === 200) {
        this.$message.success("该品牌图片数据获取成功");
        this.spuImageList = res.data;
        // this.spuImageList = res.data.map((item) => {
        //   return {
        //     id: item.id,
        //     name: item.imgName,
        //     url: item.imgUrl,
        //   };
        // });
      } else {
        this.$message.error("该品牌图片数据获取成功");
      }
    },
    // 删除图片
    handleRemove(file, fileList) {
      // console.log(file, fileList);
      this.spuImageList = this.spuImageList.filter(
        (supimg) => supimg.imgUrl !== file.url
      );
    },
    // 添加图片
    /* 上传图片 */
    handleAvatarSuccess(res, file) {
      // this.trademarkForm.logoUrl = res.data;
      console.log(res, file);
      this.spuImageList.push({
        uid: file.uid,
        spuId: this.supEveryData.id,
        imgName: file.name,
        imgUrl: res.data,
      });
    },
    beforeAvatarUpload(file) {
      const imgType = ["image/jpg", "image/png", "image/jpeg"];
      const isJPG = imgType.indexOf(file.type) > -1;
      const isLt50kb = file.size / 1024 < 50;

      if (!isJPG) {
        this.$message.error("上传品牌LOGO只能是 JPG 或 PNG 格式!");
      }
      if (!isLt50kb) {
        this.$message.error("上传品牌LOGO大小不能超过 50 kb!");
      }
      return isJPG && isLt50kb;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
  },
  computed: {
    // 处理图片格式,因为上传的要求是这样,但是又不能直接修改掉原数据
    upImgFormat() {
      return this.spuImageList.map((img) => {
        return {
          uid: img.uid || img.id,
          id: img.id,
          name: img.imgName,
          url: img.imgUrl,
        };
      });
    },
    filterSaleAttr() {
      return this.baseSaleAttr.filter((base) => {
        return !this.spuSaleAttr.find(
          (item) => base.id === item.baseSaleAttrId
        );
      });
    },
  },
  mounted() {
    this.getTrademarkList();
    this.getBaseSaleAttrList();
    if (this.supEveryData.id) {
      this.getSpuImageList();
      this.getSpuSaleAttrList();
    }
  },
};
</script>

<style>
</style>