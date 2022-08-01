<template>
  <div class="resource-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form :inline="true" :model="form" ref="form" class="demo-form-inline">
          <el-form-item label="资源名称" prop="name">
            <el-input v-model="form.name" clearable placeholder="请输入资源名称"></el-input>
          </el-form-item>
          <el-form-item label="资源路径" prop="url">
            <el-input v-model="form.url" clearable placeholder="请输入资源路径"></el-input>
          </el-form-item>
          <el-form-item label="资源分类" prop="categoryId">
            <el-select v-model="form.categoryId" clearable placeholder="请选择资源分类">
              <el-option v-for="(item, index) in categoryList" :key="index" :value="item.id" :label="item.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :disabled="isLoading" @click="handleSearch">查询</el-button>
            <el-button type="info" plain :disabled="isLoading" @click="handleReset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table :data="resourceList" style="width: 100%; margin-bottom: 20px" v-loading="isLoading">
        <el-table-column type="index" label="编号"> </el-table-column>
        <el-table-column prop="name" label="资源名称"> </el-table-column>
        <el-table-column prop="url" label="资源路径"> </el-table-column>
        <el-table-column prop="description" label="描述"> </el-table-column>
        <el-table-column prop="createdTime" :formatter="formatTime" label="添加时间"> </el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button size="mini">编辑</el-button>
            <el-button size="mini" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page.sync="form.current" :page-sizes="[5, 10, 20]" :page-size="form.size" :disabled="isLoading"
        layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
      </el-pagination>
    </el-card>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { getResourcePages, getAllCategories } from '@/services/resource'
import type { ResourceData, ResourceCategories } from '@/services/types/resource'
import type { Form } from 'element-ui'
import moment from 'moment'

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
      } as ResourceData,
      totalCount: 0,
      resourceList: [],
      categoryList: [] as ResourceCategories[],
      isLoading: false
    }
  },
  created () {
    this.loadAllCategories()
    this.loadResourcePages()
  },
  methods: {
    async loadResourcePages () {
      try {
        this.isLoading = true
        const { total, records } = await getResourcePages(this.form) as any
        this.totalCount = total
        this.resourceList = records
      } catch (error) {
      } finally {
        this.isLoading = false
      }
    },
    async loadAllCategories () {
      try {
        this.categoryList = await getAllCategories()
      } catch (error) {
      }
    },
    handleSearch () {
      this.form.current = 1
      this.loadResourcePages()
    },
    handleReset () {
      (this.$refs.form as Form).resetFields()
      this.handleSearch()
    },
    handleSizeChange (val: number) {
      this.form.size = val
      this.form.current = 1
      this.loadResourcePages()
    },
    handleCurrentChange (val: number) {
      this.form.current = val
      this.loadResourcePages()
    },
    formatTime (row :any, column:any, cellValue:any) {
      return moment(cellValue).format('YYYY-MM-DD hh:mm:ss')
    }
  }
})
</script>
<style lang="scss" scoped>
</style>
