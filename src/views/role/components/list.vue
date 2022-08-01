<template>
  <div class="role-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button type="primary" @click="addOpen">添加角色</el-button>
      </div>
      <el-table :data="roleList" style="width: 100%">
        <el-table-column prop="id" label="编号"> </el-table-column>
        <el-table-column prop="name" label="角色姓名"> </el-table-column>
        <el-table-column prop="description" label="描述"> </el-table-column>
        <el-table-column prop="createdTime" label="添加时间"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button size="mini" type="text" @click="handleDelete(scope.row)"
              >删除</el-button
            >
            <el-button size="mini" type="text" @click="allocMenu(scope.row)"
              >分配菜单</el-button
            >
            <el-button size="mini" type="text" @click="handleDelete(scope.row)"
              >分配资源</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog
      :title="isedit ? '编辑角色' : '添加角色'"
      :visible.sync="dialogFormVisible"
    >
      <createoredit-vue
        v-if="dialogFormVisible"
        ref="createoredit"
        :isedit="isedit"
        :id="editid"
      ></createoredit-vue>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click.native="addOrEditSubmit"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { getAllRole, addOrEditRole } from '@/services/role'
import createoreditVue from './createoredit.vue'
export default Vue.extend({
  name: 'role-list',
  data () {
    return {
      roleList: [],
      dialogFormVisible: false,
      isedit: false,
      editid: undefined
    }
  },
  created () {
    this.fetchAllRole()
  },
  components: {
    createoreditVue
  },
  methods: {
    async fetchAllRole () {
      const { data } = await getAllRole()
      if (data.code === '000000') {
        this.roleList = data.data
      }
    },
    addOpen () {
      this.isedit = false
      this.dialogFormVisible = true
    },
    handleEdit (row: any) {
      this.editid = row.id
      this.isedit = true
      this.dialogFormVisible = true
    },
    handleDelete (row: any) {
      console.log(row)
    },
    allocMenu (row: any) {
      this.$router.push({
        name: 'alloc-menu',
        params: {
          roleid: row.id
        }
      })
    },
    async addOrEditSubmit () {
      const { data } = await addOrEditRole(
        (this.$refs.createoredit as any).form
      )
      if (data.code === '000000') {
        // (this.$refs.createoredit as any).$refs.form.resetFields();
        this.dialogFormVisible = false
        this.fetchAllRole()
      }
    }
  }
})
</script>
<style lang="scss" scoped></style>
