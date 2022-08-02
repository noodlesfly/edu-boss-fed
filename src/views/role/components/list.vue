<template>
  <div class="role-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button type="primary" @click="addOpen" :disabled="isLoading">添加角色</el-button>
      </div>
      <el-table :data="roleList" style="width: 100%" v-loading="isLoading">
        <el-table-column prop="id" label="编号"> </el-table-column>
        <el-table-column prop="name" label="角色姓名"> </el-table-column>
        <el-table-column prop="description" label="描述"> </el-table-column>
        <el-table-column prop="createdTime" :formatter="formatTime" label="添加时间"> </el-table-column>
        <el-table-column label="操作" min-width="200">
          <template v-slot="scope">
            <el-button size="mini" type="text" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="text" @click="handleDelete(scope.row)">删除</el-button>
            <el-button size="mini" type="text" @click="allocMenu(scope.row)">分配菜单</el-button>
            <el-button size="mini" type="text" @click="handleDelete(scope.row)">分配资源</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog :title="isedit ? '编辑角色' : '添加角色'" :visible.sync="dialogFormVisible">
      <createoredit-vue v-if="dialogFormVisible" ref="createoredit" :isedit="isedit" :id="editid"></createoredit-vue>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click.native="addOrEditSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { getAllRole, addOrEditRole } from '@/services/role'
import type { roleData } from '@/services/types/role'
import moment from 'moment'
import createoreditVue from './createoredit.vue'
export default Vue.extend({
  name: 'role-list',
  data () {
    return {
      roleList: [] as roleData[],
      dialogFormVisible: false,
      isLoading: false,
      isedit: false,
      editid: undefined as number | undefined
    }
  },
  created () {
    this.loadAllRole()
  },
  components: {
    createoreditVue
  },
  methods: {
    addOpen () {
      this.isedit = false
      this.editid = undefined
      this.dialogFormVisible = true
    },
    async loadAllRole () {
      try {
        this.isLoading = true
        this.roleList = await getAllRole() as roleData[]
      } catch (error) {

      } finally {
        this.isLoading = false
      }
    },
    handleEdit (row: roleData) {
      this.editid = row.id
      this.isedit = true
      this.dialogFormVisible = true
    },
    handleDelete (row: roleData) {
      console.log(1)
    },
    allocMenu (row: roleData) {
      this.$router.push({
        name: 'alloc-menu',
        params: {
          roleid: String(row.id)
        }
      })
    },
    formatTime (row: any, column: any, cellValue: any) {
      return moment(cellValue).format('YYYY-MM-DD hh:mm:ss')
    },
    async addOrEditSubmit () {
      try {
        await addOrEditRole((this.$refs.createoredit as any).form)
        this.$message.success(`${this.isedit ? '编辑' : '添加'}成功`)
        this.loadAllRole()
      } catch (error) {

      } finally {
        this.dialogFormVisible = false
        this.editid = undefined
      }
    }
  }
})
</script>
<style lang="scss" scoped>
</style>
