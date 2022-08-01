<template>
  <div class="user-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item label="手机号">
            <el-input
              v-model="form.phone"
              placeholder="请输入手机号"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="注册时间">
            <el-date-picker
              v-model="form.startCreateTime"
              type="date"
              placeholder="开始日期"
            >
            </el-date-picker>
            -
            <el-date-picker
              v-model="form.endCreateTime"
              type="date"
              placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="loadUserPages"
              :disabled="isLoading"
              >查询</el-button
            >
          </el-form-item>
        </el-form>
      </div>

      <el-table :data="userList" style="width: 100%" v-loading="isLoading">
        <el-table-column prop="id" label="用户ID"> </el-table-column>
        <el-table-column prop="portrait" label="头像"> </el-table-column>
        <el-table-column prop="name" label="用户名"> </el-table-column>
        <el-table-column prop="phone" label="手机号"> </el-table-column>
        <el-table-column prop="createTime" label="注册时间"> </el-table-column>
        <el-table-column prop="status" label="状态"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="text">禁用</el-button>
            <el-button size="mini" type="text" @click="handleRole(scope.row.id)"
              >分配角色</el-button
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

    <el-dialog
      title="分配角色"
      :visible.sync="dialogVisible"
      width="30%"
      :close-on-click-modal="false"
      :show-close="false"
    >
      <el-select
        v-model="roleIdList"
        multiple
        placeholder="请选择"
        style="width: 100%"
      >
        <el-option
          v-for="item in roleList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleAllocaRole">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { getUserPages, allocateUserRoles } from '@/services/user'
import { getAllRole, getUserRoleById } from '@/services/role'
export default Vue.extend({
  name: 'user-list',
  data () {
    return {
      form: {
        phone: undefined,
        startCreateTime: undefined,
        endCreateTime: undefined,
        currentPage: 1,
        pageSize: 10
      },
      totalNum: 0,
      value1: '',
      userList: [],
      isLoading: false,
      dialogVisible: false,
      roleList: [],
      roleIdList: [],
      chosenUserId: -1
    }
  },
  created () {
    this.loadUserPages()
    this.loadAllRoles()
  },
  methods: {
    handleSizeChange (val: number) {
      this.form.pageSize = val
      this.loadUserPages()
    },
    handleCurrentChange (val: number) {
      this.form.currentPage = val
      this.loadUserPages()
    },
    async loadUserPages () {
      this.isLoading = true
      const { data } = await getUserPages(this.form)
      if (data.code === '000000') {
        this.userList = data.data.records
        this.totalNum = data.data.total
      }
      this.isLoading = false
    },
    async loadAllRoles () {
      const { data } = await getAllRole()
      if (data.code === '000000') {
        this.roleList = data.data
      }
    },
    async handleRole (userId: string | number) {
      this.dialogVisible = true;
      (this.chosenUserId as string | number) = userId
      const { data } = await getUserRoleById(userId)
      if (data.code === '000000') {
        if (data.data && data.data.length) {
          this.roleIdList = data.data.map((item: any) => item.id)
        }
      }
    },
    async handleAllocaRole () {
      const { data } = await allocateUserRoles({
        userId: this.chosenUserId,
        roleIdList: this.roleIdList
      })
      if (data.code === '000000') {
        this.dialogVisible = false
        this.chosenUserId = -1
        this.roleIdList = []
        this.$message.success('分配成功')
      }
    },
    handleCancel () {
      this.dialogVisible = false
      this.chosenUserId = -1
      this.roleIdList = []
    }
  }
})
</script>
<style lang="scss" scoped></style>
