<template>
  <el-container>
    <el-aside :width="tap? '64': '200'">
      <app-aside></app-aside>
    </el-aside>
    <el-container>
      <el-header>
        <app-header></app-header>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script lang="ts">
import Vue from 'vue'
import AppAside from './components/app-aside.vue'
import AppHeader from './components/app-header.vue'
import { useUserStore } from '@/store/user'
import { mapState } from 'pinia'

export default Vue.extend({
  name: 'LayoutIndex',
  components: {
    AppAside,
    AppHeader
  },
  computed: {
    ...mapState(useUserStore, ['tap'])
  }
})
</script>
<style lang="scss" scoped>
.el-header {
  background-color: #f0f0f0;
}

::v-deep .el-aside .aside {
  height: 100%;
}
::v-deep .el-aside .aside .el-menu {
  height: 100%;
  background-color: #d3dce6;
}
::v-deep .el-container {
  min-height: 100vh;
  min-width: 980px;

  .el-aside {
    background-color: #d3dce6;
    height: 100%;
  }
}
</style>
