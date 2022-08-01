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
      },
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
      const { data } = await getRoleById(this.id)
      if (data.code === '000000') {
        const formdata = data.data
        this.form.id = formdata.id
        this.form.name = formdata.name
        this.form.code = formdata.code
        this.form.description = formdata.description
      }
    }
  }
})
</script>
<style lang="scss" scoped></style>
