<template>
  <div class="create-or-edit">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        {{ isEdit ? "编辑菜单" : "添加菜单" }}
      </div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="菜单名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="菜单路径" prop="href">
          <el-input v-model="form.href"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" prop="parentId">
          <el-select v-model="form.parentId" placeholder="请选择上级菜单">
            <el-option label="无上级菜单" :value="-1"></el-option>
            <el-option v-for="(item, index) in parentList" :key="index" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="前端图标" prop="icon">
          <el-input v-model="form.icon"></el-input>
        </el-form-item>

        <el-form-item label="是否显示" prop="shown">
          <el-radio-group v-model="form.shown">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序" prop="orderNum">
          <el-input-number :min="1" :max="10" v-model="form.orderNum" label="描述文字"></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="DB">提交</el-button>
          <el-button v-if="!isEdit" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { getParentList, addOrUpdateMenu } from '@/services/menu'
import type { menuData } from '@/services/types/menu'
import { Form } from 'element-ui'
import _ from 'lodash'

export default Vue.extend({
  name: 'menu-create-or-edit',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      form: {
        parentId: -1, // -1表示没有上级菜单
        name: '',
        href: '',
        icon: '',
        orderNum: 0,
        description: '',
        shown: false
      } as menuData,
      parentList: [] as menuData[],
      DB: null
    }
  },
  created () {
    this.loadParentList()
    this.DB = _.debounce(this.handleSubmit, 500, true)
  },
  methods: {
    async loadParentList () {
      try {
        const { parentMenuList, menuInfo } = await getParentList(this.$route.params.id)
        if (menuInfo) {
          this.form = menuInfo as menuData
        }
        this.parentList = parentMenuList
      } catch (error) {
        console.log(error)
      }
    },
    async handleSubmit () {
      try {
        await addOrUpdateMenu(this.form)
        this.$message.success('提交成功')
        this.$router.push({
          name: 'menu'
        })
      } catch (error) {

      }
    },
    reset () {
      (this.$refs.form as Form).resetFields()
    }
  },
  computed: {
    filterParentList (): menuData[] {
      return this.parentList.filter(item => item.shown)
    }
  }
})
</script>
<style lang="scss" scoped>
</style>
