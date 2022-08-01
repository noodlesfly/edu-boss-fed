<template>
  <div class="menu">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button @click="$router.push({ name: 'menu-create' })">
          添加菜单
        </el-button>
      </div>
      <el-table :data="filterAllMenus" style="width: 100%" v-loading="isLoading">
        <el-table-column label="编号" type="index"> </el-table-column>
        <el-table-column prop="name" label="菜单名称" width="180">
        </el-table-column>
        <el-table-column prop="level" label="菜单级数"> </el-table-column>
        <el-table-column prop="icon" label="前端图标"> </el-table-column>
        <el-table-column prop="orderNum" label="排序"> </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
            <el-button @click="handleDel(scope.row)" size="mini" type="danger" :loading="scope.row.isDeleting">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts">
import { getAllMenus, delMenu } from '@/services/menu'
import type { menuData } from '@/services/types/menu'
import Vue from 'vue'

type MenuList = {
  isDeleting: boolean
} & menuData

export default Vue.extend({
  name: 'MenuIndex',
  data () {
    return {
      menuList: [] as MenuList[],
      isDeleting: false,
      isLoading: false
    }
  },
  created () {
    this.loadAllMenus()
  },
  methods: {
    async loadAllMenus () {
      try {
        this.isLoading = true
        this.menuList = await getAllMenus() as any[]
        this.menuList.forEach(item => {
          item.isDeleting = false
        })
      } catch (error) {

      } finally {
        this.isLoading = false
      }
    },
    handleEdit (id: number) {
      this.$router.push({
        name: 'menu-edit',
        params: {
          id: String(id)
        }
      })
    },
    async handleDel (row: MenuList) {
      try {
        await this.$confirm('确认删除吗？', '删除提示')
        row.isDeleting = true
        await delMenu(row.id as number)
        this.$message.error('删除成功')
        this.loadAllMenus()
      } catch (error) {
        console.log(error)
      } finally {
        row.isDeleting = false
      }
    }
  },
  computed: {
    filterAllMenus () {
      return this.menuList.filter(menu => menu.shown)
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
