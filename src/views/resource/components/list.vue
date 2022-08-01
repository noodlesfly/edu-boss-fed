<template>
  <div class="resource-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form
          :inline="true"
          :model="form"
          ref="form"
          class="demo-form-inline"
        >
          <el-form-item label="资源名称" prop="name">
            <el-input
              v-model="form.name"
              placeholder="请输入资源名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="资源路径" prop="url">
            <el-input
              v-model="form.url"
              placeholder="请输入资源路径"
            ></el-input>
          </el-form-item>
          <el-form-item label="资源分类" prop="categoryId">
            <el-select
              v-model="form.categoryId"
              clearable
              placeholder="请选择资源分类"
            >
              <el-option
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :disabled="isLoading"
              >查询</el-button
            >
            <el-button type="info" plain :disabled="isLoading"
              >重置</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <el-table
        :data="resourceList"
        style="width: 100%; margin-bottom: 20px"
        v-loading="isLoading"
      >
        <el-table-column type="index" label="编号"> </el-table-column>
        <el-table-column prop="name" label="资源名称"> </el-table-column>
        <el-table-column prop="url" label="资源路径"> </el-table-column>
        <el-table-column prop="description" label="描述"> </el-table-column>
        <el-table-column prop="createdTime" label="添加时间"> </el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button size="mini"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        :page-sizes="[5, 10, 20]"
        :page-size="form.size"
        :disabled="isLoading"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      >
      </el-pagination>
    </el-card>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'resource-list',
  data () {
    return {
      form: {
        // id: 0,
        name: '',
        startCreateTime: '',
        url: '',
        categoryId: undefined,
        endCreateTime: '',
        current: 1,
        size: 5
      },
      totalCount: 0,
      resourceList: [],
      categoryList: [],
      isLoading: false
    }
  }
})
</script>
<style lang="scss" scoped></style>
