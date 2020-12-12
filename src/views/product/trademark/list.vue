<template>
  <div>
    <!-- 添加按钮 -->
    <el-button type="primary" icon="el-icon-plus" @click="add()"
      >添加</el-button
    >
    <!-- 表格 -->
    <el-table
      :data="trademarkDataList"
      border
      style="width: 100%"
      class="trademark-table"
    >
      <el-table-column type="index" label="序号" width="80" align="center">
      </el-table-column>
      <el-table-column prop="tmName" label="品牌名称"> </el-table-column>
      <el-table-column label="品牌LOGO">
        <template slot-scope="scope">
          <img :src="scope.row.logoUrl" class="trademark-image" />
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button
            type="warning"
            class="el-button el-button--warning el-button--mini"
            @click="updata(scope)"
          >
            <i class="el-icon-edit"></i>
            <span>修改</span>
          </el-button>
          <el-button
            type="danger"
            class="el-button el-button--warning el-button--mini"
            @click="deleteData(scope.row.id)"
          >
            <i class="el-icon-delete"></i>
            <span>删除</span>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      class="trademark-pagination"
      :page-sizes="[3, 5, 10, 15]"
      :page-size="size"
      layout="  prev, pager, next, jumper,sizes,total"
      :total="total"
    >
    </el-pagination>

    <!-- 添加图片 -->

    <el-dialog
      :title="`${trademarkForm.id ? '修改' : '添加'}品牌`"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        :model="trademarkForm"
        ref="trademarkForm"
        :rules="ruleForm"
        label-width="100px"
      >
        <!-- 需要效验 brand -->
        <el-form-item label="品牌名称" prop="tmName">
          <el-input
            autocomplete="off"
            v-model="trademarkForm.tmName"
          ></el-input>
        </el-form-item>
        <!-- 需要效验logoUrl -->
        <el-form-item label="品牌LOGO" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            :action="`${$BASE_API}/admin/product/fileUpload`"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="trademarkForm.logoUrl"
              :src="trademarkForm.logoUrl"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <span>只能上传jpg/png文件，且不超过50kb</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button>取 消</el-button>
        <el-button type="primary" @click="submitInfo('trademarkForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "TrademarkList",
  data() {
    return {
      trademarkDataList: [],
      total: 0, //总数
      size: 3, // 每页显示数量
      current: 1, // 当前页数
      // Dialog对话框显示隐藏
      dialogFormVisible: false,
      // 表单数据
      trademarkForm: {
        // 表单数据
        tmName: "",
        logoUrl: "",
      },
      // 效验规则
      ruleForm: {
        tmName: [
          { required: true, message: "请输入品牌名称", trigger: "blur" },
        ],
        logoUrl: [{ required: true, message: "请上传品牌LOGO啊" }],
      },
    };
  },
  mounted() {
    this.getPageList(this.current, this.size);
  },
  methods: {
    /* 公共发送请求 */
    async getPageList(page, limit) {
      try {
        const result = await this.$API.trademark.getPageList(page, limit);
        // {code: 200, message: "成功", data: {…}, ok: true}
        if (result.code === 200) {
          this.$message.success("获取品牌分页列表数据成功");
          // 获取到数据代理到data中
          this.trademarkDataList = result.data.records;
          // 总数
          this.total = result.data.total;
          // 每页显示数量
          this.size = result.data.size;
        } else {
          this.$message.error("获取品牌分页列表数据失败");
        }
      } catch (error) {
        this.$message.error(error);
      }
    },
    /* 分页器相关 */
    handleSizeChange(size) {
      // 选择的每页显示数量
      this.size = size;
      this.getPageList(this.current, this.size);
    },
    handleCurrentChange(current) {
      // 当前点击的页数
      this.current = current;
      this.getPageList(this.current, this.size);
    },
    /* 上传图片 */
    handleAvatarSuccess(res) {
      this.trademarkForm.logoUrl = res.data;
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
    /* 提交图片处理 */
    submitInfo(trademarkForm) {
      this.$refs[trademarkForm].validate(async (valid) => {
        if (valid) {
          /* 判断是添加还是更新 */
          const { trademarkForm } = this;
          let isUpdata = !!trademarkForm.id;

          if (isUpdata) {
            const tm = this.trademarkDataList.find(
              (trademark) => trademark.id === trademarkForm.id
            );

            if (
              tm.tmName === trademarkForm.tmName &&
              tm.logoUrl === trademarkForm.logoUrl
            ) {
              this.$message.warning("客官,您的数据未进行修改哦");
              return;
            }
          }

          let result;
          if (isUpdata) {
            result = await this.$API.trademark.updataPageList(trademarkForm);
          } else {
            result = await this.$API.trademark.addPageList(trademarkForm);
          }
          // const result = await this.$API.trademark.addPageList(
          //   this.trademarkForm
          // );
          if (result.code === 200) {
            this.$message.success(`${isUpdata ? "修改" : "添加"}品牌数据成功`);
            // 隐藏对话框
            this.dialogFormVisible = false;
            // 清空数据
            this.trademarkForm.tmName = "";
            this.trademarkForm.logoUrl = "";
            // 请求加载数据
            this.getPageList(this.current, this.size);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    /* 删除数据 */
    async deleteData(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await this.$API.trademark.deltePageList(id);
          if (res.ok) {
            // 请求加载数据
            this.getPageList(this.current, this.size);
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    /* 修改数据 */
    updata(scope) {
      // 让其显示添加修改框
      this.dialogFormVisible = true;
      // this.trademarkForm = scope.row; // row代表这一列的数据 id logoUrl tmName
      this.trademarkForm = { ...scope.row };
    },
    add() {
      // 点击添加的时候要让数据为空,dialog显示
      this.dialogFormVisible = true;
      this.trademarkForm = {};
    },
  },
};
</script>

<style lang="sass" >
.trademark-table
  margin: 20px 0
.trademark-image
  width: 100px
.trademark-pagination
  text-align: right
.el-pagination__sizes
  margin-left: 250px

.avatar-uploader .el-upload
  border: 1px dashed #d9d9d9
  border-radius: 6px
  cursor: pointer
  position: relative
  overflow: hidden

  :hover
  &
    border-color: #409EFF

  .avatar-uploader-icon
    font-size: 28px
    color: #8c939d
    width: 178px
    height: 178px
    line-height: 178px
    text-align: center

  .avatar
    width: 178px
    height: 178px
    display: block
</style>
