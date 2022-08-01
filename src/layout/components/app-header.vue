<template>
  <div class="header">
    <div class="header-left">
      <el-button
        plain
        icon="el-icon-menu"
        size="mini"
        @click="toggleTap"
        style="margin-right: 10px"
      ></el-button>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-if="ptitle">{{ ptitle }}</el-breadcrumb-item>
        <el-breadcrumb-item v-if="title" :to="{ path: topath }">{{
          title
        }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-dropdown v-if="user">
      <span class="el-dropdown-link">
        <el-avatar :src="user.portrait" :size="34">
          <img :src="require('@/assets/avatarfallback.png')" /> </el-avatar
        ><i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>{{ user.userName }}</el-dropdown-item>
        <el-dropdown-item divided @click.native="handleLogout"
          >退出</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { useUserStore } from '@/store/user'
import { mapActions } from 'pinia'
import { getUserInfo, logout } from '@/services/user'
import type { User } from '@/services/types/user'

export default Vue.extend({
  name: 'AppHeader',
  data () {
    return {
      user: {} as User
    }
  },
  methods: {
    ...mapActions(useUserStore, ['toggleTap', 'setUser']),
    async loadUserInfo () {
      const { content } = await getUserInfo()
      this.user = content
    },
    async handleLogout () {
      const { state } = await logout()
      if (state === 1 || state === 200) {
        this.$message.success('退出成功')
        this.setUser(null)
        this.$router.replace('/login')
      }
    }
  },
  computed: {
    ptitle () {
      return this.$route.meta?.ptitle
    },
    title () {
      return this.$route.meta?.title
    },
    topath () {
      return this.$route.fullPath
    }
  },
  created () {
    this.loadUserInfo()
  }
})
</script>
<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;

  .header-left {
    display: flex;
    align-items: center;
  }
  .el-dropdown-link {
    display: flex;
    align-items: center;
  }
}
</style>
