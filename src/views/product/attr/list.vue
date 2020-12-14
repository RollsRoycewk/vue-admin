<template>
  <div>
    <!-- 组件 -->
    <Category
      @allAttrsData="getAttrList"
      :disabled="!isAttrsShow"
      @clsAttr="clsAttribut"
    ></Category>
    <!-- 信息 -->
    <el-card class="box-card" v-show="isAttrsShow">
      <!-- 按钮 -->
      <el-button
        type="primary"
        :disabled="!category.category3Id"
        @click="addCategory"
      >
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
          <template v-slot="{ row }">
            <el-button type="primary" size="mini" @click="upAttribute(row)"
              ><i class="el-icon-edit"></i
            ></el-button>
            <el-button type="danger" size="mini">
              <i class="el-icon-delete"></i
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 属性列表修改页面 -->
    <el-card class="box-card" v-show="!isAttrsShow">
      <!-- 属性名 -->
      <el-form :model="attributeData" inline>
        <el-form-item label="属性名" prop="attrName">
          <el-input
            v-model="attributeData.attrName"
            placeholder="请输入属性名"
          ></el-input>
        </el-form-item>
      </el-form>
      <!-- 按钮 -->
      <el-button type="primary" @click="addAttribute">
        <i class="el-icon-plus"></i>
        <span>添加属性值</span>
      </el-button>
      <!-- 所有属性 -->
      <el-table
        :data="attributeData.attrValueList"
        border
        style="width: 100%; margin: 20px 0"
      >
        <el-table-column label="序号" width="80px" type="index" align="center">
        </el-table-column>
        <el-table-column label="属性值名称">
          <template v-slot="{ row, $index }">
            <!-- 一上来row.edit没有所以不会显示,失去焦点显示span -->
            <el-input
              v-if="row.edit"
              v-model="row.valueName"
              placeholder="请输入内容"
              autofocus
              ref="attrInput"
              size="mini"
              @blur="editComputed(row, $index)"
              @keyup.enter.native="editComputed(row, $index)"
            ></el-input>
            <!--  直接给对象添加新属性不是响应式数据, 通过this.$set添加的属性才是响应式 -->
            <span
              v-else
              @click="edit(row)"
              style="display: block; width: 100%"
              >{{ row.valueName }}</span
            >
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template v-slot="{ row, $index }">
            <el-popconfirm
              :title="`确定要删除${row.valueName}吗？`"
              @onConfirm="delAttribute($index)"
            >
              <el-button type="danger" size="mini" slot="reference">
                <i class="el-icon-delete"></i
              ></el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary" @click="saveSubit">保存</el-button>
      <el-button @click="isAttrsShow = true">取消</el-button>
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
      // attrs是否显示
      isAttrsShow: true,
      attrList: [],
      // 属性数据
      attributeData: {
        attrName: "",
        attrValueList: [],
      },
      // 分类id
      category: {},
    };
  },
  methods: {
    // 添加分类属性
    addCategory() {
      this.isAttrsShow = false;
      // 清空之前选择的数据
      this.attributeData.attrName = "";
      this.attributeData.attrValueList = [];
    },
    async getAttrList(category) {
      // 后面更新数以后重新刷新用
      this.category = category;
      const res = await this.$API.attrs.getCategoryAttrsData(category);
      if (res.ok) {
        this.attrList = res.data;
        this.$message.success("所有属性获取成功");
      } else {
        this.$message.error("所有属性获取成功");
      }
    },
    // 点击更新属性
    upAttribute(attribute) {
      //为了防止attr变化时直接修改原数据  深度克隆
      this.attributeData = JSON.parse(JSON.stringify(attribute));
      this.isAttrsShow = false;
    },
    // edit,解决input聚焦问题
    edit(row) {
      // 设置属性,让其确认显示哪个
      this.$set(row, "edit", true);
      this.$nextTick(() => {
        this.$refs.attrInput.focus();
      });
    },
    // 添加属性
    addAttribute() {
      this.attributeData.attrValueList.push({ edit: true });
      this.$nextTick(() => {
        this.$refs.attrInput.focus();
      });
    },
    // 删除属性
    delAttribute(index) {
      this.attributeData.attrValueList.splice(index, 1);
    },
    // 如果没有就不添加
    editComputed(row, index) {
      if (!row.valueName) {
        this.attributeData.attrValueList.splice(index, 1);
        return;
      }
      row.edit = false;
    },
    // 提交更新属性值
    async saveSubit() {
      const result = await this.$API.attrs.getUpdataAttr(this.attributeData);
      if (result.ok) {
        this.$message.success("更新属性完成,重新请求完成");
        // 如果成功,重新请求数据
        this.getAttrList(this.category);
        // 成功以后回到属性页面
        this.isAttrsShow = true;
      } else {
        this.$message.error("更新属性失败");
      }
    },
    // 清空属性列表
    clsAttribut() {
      this.attrList = [];
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