<template>
  <div class="create-or-edit-role">
    <el-form :model="form" ref="form">
      <el-form-item label="角色名称" prop="name" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色编码" prop="code" :label-width="formLabelWidth">
        <el-input v-model="form.code" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item
        label="角色描述"
        prop="description"
        :label-width="formLabelWidth"
      >
        <el-input v-model="form.description" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { getRoleById } from '@/services/role'
import type { roleData } from '@/services/types/role'
export default Vue.extend({
  name: 'create-or-edit-role',
  props: {
    isedit: {
      type: Boolean
    },
    id: {
      type: Number
    }
  },
  data () {
    return {
      form: {
        id: this.id,
        code: '',
        name: '',
        description: ''
      } as roleData,
      formLabelWidth: '120px'
    }
  },
  created () {
    if (this.isedit) {
      this.fetchRoleById()
    }
  },
  methods: {
    async fetchRoleById () {
      try {
        const ret = await getRoleById(this.id) as roleData
        this.form.name = ret.name
        this.form.description = ret.description
        this.form.code = ret.code
      } catch (error) {

      }
    }
  }
})
</script>
<style lang="scss" scoped></style>
