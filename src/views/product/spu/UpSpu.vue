<template>
  <el-card class="box-card" style="margin: 20px 0">
    <el-form label-width="80px">
      <!-- SPU名称 -->
      <el-form-item label="SPU名称">
        <el-input placeholder="SPU名称" v-model="supEveryData.tmId"></el-input>
      </el-form-item>
      <!-- 品牌名称 -->
      <el-form-item label="品牌">
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
      <el-form-item label="SPU描述">
        <el-input
          type="textarea"
          placeholder="SPU描述"
          v-model="supEveryData.description"
        ></el-input>
      </el-form-item>
      <!-- SPU图片 -->

      <el-form-item label="SPU图片">
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
        <el-button type="primary" @click="addSpuSaleAttr">
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
            <template v-slot="{ row }">
              <el-tag
                style="margin-left: 5px"
                v-for="ValueList in row.spuSaleAttrValueList"
                :key="ValueList.id"
                >{{ ValueList.saleAttrValueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="address" label="操作" width="150">
            <el-button type="danger" size="mini">
              <i class="el-icon-delete"></i>
            </el-button>
          </el-table-column>
        </el-table>
        <!-- 保存取消按钮 -->
        <el-button type="primary">保存</el-button>
        <el-button @click="$emit('isShowState')">取消</el-button>
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
    };
  },
  props: {
    supData: {
      type: Object,
    },
  },
  methods: {
    /* 添加销售类型 */
    addSpuSaleAttr() {
      const { sale, id } = this.supEveryData;
      const res = this.baseSaleAttr.find((item) => item.id === sale);

      console.log(res, id);

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
      const res = await this.$API.spu.getBaseSaleAttrList();
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
    this.getSpuImageList();
    this.getSpuSaleAttrList();
    this.getBaseSaleAttrList();
  },
};
</script>

<style>
</style>