<template>
  <div>
    <!-- 组件 -->
    <Category @allAttrsData="getAttrList"></Category>
    <!-- 信息 -->
    <el-card class="box-card">
      <!-- 按钮 -->
      <el-button type="primary" disabled>
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
    <el-card class="box-card">
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
          <template v-slot="{ row }">
            <!-- 一上来row.edit没有所以不会显示,失去焦点显示span -->
            <el-input
              v-if="row.edit"
              v-model="row.valueName"
              placeholder="请输入内容"
              autofocus
              ref="attrInput"
              size="mini"
              @blur="row.edit = false"
              @keyup.enter.native="row.edit = false"
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
          <template v-slot="{ row }">
            <el-popconfirm title="这是一段内容确定删除吗？">
              <el-button type="danger" size="mini" slot="reference">
                <i class="el-icon-delete"></i
              ></el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary">保存</el-button>
      <el-button>取消</el-button>
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
      attrList: [],
      // 属性数据
      attributeData: {
        attrName: "",
        attrValueList: [],
      },
    };
  },
  methods: {
    getAttrList(data) {
      this.attrList = data;
    },
    // 点击更新属性
    upAttribute(attribute) {
      this.attributeData = attribute;
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