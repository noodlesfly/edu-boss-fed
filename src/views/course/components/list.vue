<template>
  <div class="course-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item label="课程名称">
            <el-input
              v-model="form.courseName"
              placeholder="请输入课程名称"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="form.status" clearable placeholder="请选择状态">
              <el-option label="已上架" :value="1"> </el-option>
              <el-option label="未上架" :value="0"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="loadCourses" :disabled="isLoading"
              >查询</el-button
            >
          </el-form-item>
          <el-button
            style="float: right"
            type="primary"
            @click="$router.push({ name: 'course-add' })"
            >添加课程</el-button
          >
        </el-form>
      </div>

      <el-table :data="courseList" style="width: 100%" v-loading="isLoading">
        <el-table-column prop="id" label="ID"> </el-table-column>
        <el-table-column prop="courseName" label="课程名称"> </el-table-column>
        <el-table-column prop="price" label="价格"> </el-table-column>
        <el-table-column prop="sortNum" label="排序"> </el-table-column>
        <el-table-column prop="status" label="状态">
          <template v-slot="scope">
            <el-switch
              v-model="scope.row.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="1"
              :inactive-value="0"
              :disabled="scope.row.isStateLoading"
              @change="onStateChange(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button
              size="mini"
              type="text"
              @click="
                $router.push({
                  name: 'course-update',
                  params: {
                    courseId: scope.row.id,
                  },
                })
              "
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="text"
              @click="
                $router.push({
                  name: 'course-section',
                  params: {
                    courseId: scope.row.id,
                  },
                })
              "
              >内容管理</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="form.currentPage"
        :page-sizes="[5, 10, 20, 40]"
        :page-size="form.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalNum"
        style="margin-top: 20px"
        :disabled="isLoading"
      >
      </el-pagination>
    </el-card>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { getQueryCourses, changeState } from '@/services/course'
export default Vue.extend({
  name: 'course-list',
  data () {
    return {
      form: {
        courseName: undefined,
        status: undefined,
        currentPage: 1,
        pageSize: 10
      },
      totalNum: 0,
      courseList: [],
      isLoading: false,
      dialogVisible: false
    }
  },
  created () {
    this.loadCourses()
  },
  methods: {
    handleSizeChange (val: number) {
      this.form.pageSize = val
      this.loadCourses()
    },
    handleCurrentChange (val: number) {
      this.form.currentPage = val
      this.loadCourses()
    },
    async loadCourses () {
      try {
        this.isLoading = true
        const { records, total } = await getQueryCourses(this.form) as any
        records.forEach((course: any) => {
          course.isStateLoading = false
        })
        this.courseList = records
        this.totalNum = total
      } catch (error) {

      } finally {
        this.isLoading = false
      }
    },
    handleCancel () {
      this.dialogVisible = false
    },
    async onStateChange (row: any) {
      try {
        row.isStateLoading = true
        await changeState({
          courseId: row.id,
          status: row.status
        })
        this.$message.success('操作成功')
      } catch (error) {

      } finally {
        row.isStateLoading = false
      }
    }
  }
})
</script>
<style lang="scss" scoped></style>
