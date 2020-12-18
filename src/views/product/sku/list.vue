<template>
  <div class="sku-list">
    <el-table border style="width: 100%" :data="skuList.records">
      <el-table-column label="序号" width="80" align="center" type="index">
      </el-table-column>
      <el-table-column label="名称" width="180" align="center" prop="skuName">
      </el-table-column>
      <el-table-column label="描述" align="center" prop="skuDesc">
      </el-table-column>

      <el-table-column label="默认图片" align="center" prop="skuDesc">
        <template v-slot="{ row }">
          <img :src="row.skuDefaultImg" alt="" width="80px" />
        </template>
      </el-table-column>

      <el-table-column label="重量(KG)" align="center" prop="weight">
      </el-table-column>
      <el-table-column label="价格(元)" align="center" width="80" prop="price">
      </el-table-column>
      <el-table-column label="操作" width="250" align="center">
        <template v-slot="{ row }">
          <el-button type="success" size="mini">
            <i class="el-icon-top"></i>
          </el-button>
          <el-button type="primary" size="mini">
            <i class="el-icon-edit"></i>
          </el-button>
          <el-button type="info" size="mini" @click="handleDrawer(row)">
            <i class="el-icon-info"></i>
          </el-button>
          <el-button type="danger" size="mini">
            <i class="el-icon-delete"></i>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      class="trademark-pagination"
      :page-sizes="[3, 5, 10, 15, 60]"
      :page-size="size"
      layout="  prev, pager, next, jumper,sizes,total"
      :total="total"
    >
    </el-pagination>
    <!-- 抽屉 -->
    <el-drawer
      title="我是标题"
      :visible.sync="drawer"
      :with-header="false"
      size="50%"
    >
      <el-row>
        <el-col :span="5">名称</el-col>
        <el-col :span="16">{{ drawerList.skuName }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">描述</el-col>
        <el-col :span="16">{{ drawerList.skuDesc }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">价格</el-col>
        <el-col :span="16">{{ drawerList.price }}</el-col>
      </el-row>

      <el-row>
        <el-col :span="5">平台属性</el-col>
        <el-col :span="18">
          <!-- <el-tag> </el-tag> -->
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="5">销售属性</el-col>
        <el-col :span="18">
          <!-- <el-tag> </el-tag> -->
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="5">商品图片</el-col>
        <el-row :span="24">
          <el-carousel>
            <el-carousel-item
              v-for="item in imagesList"
              :key="item.id"
              height="400px"
            >
              <img
                :src="item.imgUrl"
                alt=""
                style="width: 510px; height: 300px"
              />
            </el-carousel-item>
          </el-carousel>
        </el-row>
      </el-row>
    </el-drawer>
  </div>
</template>


<script>
import { mounted } from "v-charts/lib/core";
// id:13480
// imgName:"images (5).jpg"
// imgUrl:"http://182.92.128.115:8080/group1/M00/00/AE/rBFUDF_YI2GANiM4AAAJ3MtvfuE962.jpg"
// spuId:2260
export default {
  name: "SKuList",
  data() {
    return {
      skuList: [],
      // 分页相关
      current: 1,
      size: 8,
      total: 0,
      //  抽屉
      drawer: false,
      drawerList: {},
      imagesList: [],
    };
  },

  methods: {
    // 处理抽屉
    async handleDrawer(row) {
      this.drawer = true;
      this.drawerList = { ...row };
      const res = await this.$API.spu.getSpuImageList(this.drawerList.spuId);
      this.imagesList = res.data;
    },
    async getPageSpuData(current, size) {
      const res = await this.$API.sku.getSkuList(current, size);
      // console.log(res);
      if (res.code === 200) {
        this.$message.success("SPU数据获取完成");
        this.skuList = res.data;
        this.total = res.data.total;
      } else {
        this.$message.error("SPU数据获取失败");
      }
    },
    /* 分页器相关 */
    handleSizeChange(size) {
      // 选择的每页显示数量
      this.size = size;
      this.getPageSpuData(this.current, this.size);
    },
    handleCurrentChange(current) {
      // 当前点击的页数
      this.current = current;
      this.getPageSpuData(this.current, this.size);
    },
    handleEmitAllattrData() {
      // this.category = category;
      this.getPageSpuData(this.current, this.size);
    },
  },
  mounted() {
    this.handleEmitAllattrData();
  },
};
</script>

<style lang="sass">
.sku-list
  .el-row
    height: 40px
    .el-col
      line-height: 40px
      &.el-col-5
        font-size: 18px
        font-weight: bold
        text-align: right
        margin-right: 20px

.trademark-pagination
  text-align: right
.el-pagination__sizes
  margin-left: 250px

  .el-carousel__item h3
    color: #475669
    font-size: 14px
    opacity: 0.75
    line-height: 150px
    margin: 0

  .el-carousel__item:nth-child(2n)
    background-color: #99a9bf

  .el-carousel__item:nth-child(2n+1)
    background-color: #d3dce6
</style>
