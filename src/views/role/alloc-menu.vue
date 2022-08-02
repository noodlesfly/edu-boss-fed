<template>
  <div class="alloc-menu">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>分配菜单</span>
        <el-tree
          :data="menus"
          :props="defaultProps"
          show-checkbox
          default-expand-all
          :default-checked-keys="hadkeys"
          node-key="id"
          style="margin-top: 30px"
          ref="menutree"
        ></el-tree>
      </div>
      <div>
        <el-button type="primary" @click="onsubmit">保存</el-button>
        <el-button type="text" @click="resetChecked">清空</el-button>
      </div>
    </el-card>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import {
  getMenuNodeList,
  allocateRoleMenus,
  getRoleMenus
} from '@/services/menu'
import { Tree } from 'element-ui'

export default Vue.extend({
  name: 'alloc-menu',
  props: {
    roleid: {
      type: [Number, String]
    }
  },
  data () {
    return {
      menus: [],
      defaultProps: {
        children: 'subMenuList',
        label: 'name'
      },
      hadkeys: [] as any[]
    }
  },
  created () {
    this.loadMenuNodeList()
    this.loadRoleMenus()
  },
  methods: {
    async loadMenuNodeList () {
      try {
        this.menus = await getMenuNodeList() as any
      } catch (error) {

      }
    },
    async loadRoleMenus () {
      try {
        const ret = await getRoleMenus(this.roleid) as any
        this.getKeys(ret)
      } catch (error) {

      }
    },
    getKeys (data: object[]) {
      Array.isArray(data) && data.forEach((node: any) => {
        if (node.selected === true) {
          this.hadkeys = [...this.hadkeys, node.id]
        }

        if (node.subMenuList && node.subMenuList.length) {
          this.getKeys(node.subMenuList)
        }
      })
    },
    async onsubmit () {
      try {
        const menuIdList = (this.$refs.menutree as Tree).getCheckedKeys()
        console.log(menuIdList)
        await allocateRoleMenus({
          roleId: this.roleid,
          menuIdList
        })
        this.$router.push({
          name: 'role'
        })
        this.$message.success('分配成功')
      } catch (error) {

      }
    },
    resetChecked () {
      (this.$refs.menutree as Tree).setCheckedKeys([])
    }
  }
})
</script>
<style lang="scss" scoped></style>
