<template>
  <div class="alloc-menu">
    <el-card class="box-card">
      <!-- <div slot="header" class="clearfix">
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
        <el-button type="primary" @click="onsubmit">确定</el-button>
        <el-button type="text" @click="resetChecked">清空</el-button>
      </div> -->
    </el-card>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
// import {
//   getMenuNodeList,
//   allocateRoleMenus,
//   getRoleMenus
// } from '@/services/menu'
// import { Tree } from 'element-ui'

export default Vue.extend({
  name: 'alloc-menu',
  props: {
    roleid: {
      type: [Number, String]
    }
  }
  // data () {
  //   return {
  //     menus: [],
  //     defaultProps: {
  //       children: 'subMenuList',
  //       label: 'name'
  //     },
  //     hadkeys: []
  //   }
  // },
  // created () {
  //   this.fetchMenuNodeList()
  //   this.fetchRoleMenus()
  // },
  // methods: {
  //   async fetchMenuNodeList () {
  //     const { data } = await getMenuNodeList()
  //     if (data.code === '000000') {
  //       this.menus = data.data
  //     }
  //   },
  //   async onsubmit () {
  //     const menuIdList = (this.$refs.menutree as Tree).getCheckedKeys()
  //     const { data } = await allocateRoleMenus({
  //       roleId: this.roleid,
  //       menuIdList
  //     })
  //     if (data.code === '000000') {
  //       this.$router.push({
  //         name: 'role'
  //       })
  //       this.$message.success('分配成功')
  //     }
  //   },
  //   async fetchRoleMenus () {
  //     const { data } = await getRoleMenus(this.roleid)
  //     const keys = data.data
  //     this.getkeys(keys)
  //   },
  //   getkeys (arr: object[] | null) {
  //     if (arr && arr.length) {
  //       arr.forEach((node: any) => {
  //         if (node.selected == true) {
  //           (this.hadkeys as any) = [...this.hadkeys, node.id]
  //         }
  //         if (node.subMenuList && node.subMenuList.length) {
  //           this.getkeys(node.subMenuList)
  //         }
  //       })
  //     }
  //   },
  //   resetChecked () {
  //     (this.$refs.menutree as Tree).setCheckedKeys([])
  //   }
  // }
})
</script>
<style lang="scss" scoped></style>
