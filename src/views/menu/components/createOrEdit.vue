<template>
  <div class="create-or-edit">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        {{ isEdit ? "编辑菜单" : "添加菜单" }}
      </div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="菜单名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="菜单路径">
          <el-input v-model="form.href"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单">
          <el-select v-model="form.parentId" placeholder="请选择上级菜单">
            <el-option label="无上级菜单" :value="-1"></el-option>
            <el-option
              :label="item.name"
              :value="item.id"
              v-for="item in parentList"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="前端图标">
          <el-input v-model="form.icon"></el-input>
        </el-form-item>

        <el-form-item label="是否显示">
          <el-radio-group v-model="form.shown">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number
            :min="1"
            :max="10"
            v-model="form.orderNum"
            label="描述文字"
          ></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button v-if="!isEdit">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { addOrUpdateMenu, getParentList } from '@/services/menu'
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
      },
      parentList: []
    }
  },
  created () {
    this.fetchParentList()
  },
  methods: {
    async onSubmit () {
      const { data } = await addOrUpdateMenu(this.form)

      if (data.code === '000000') {
        this.$message.success('提交成功')
        this.$router.push({
          name: 'menu'
        })
      }
    },
    async fetchParentList () {
      const { data } = await getParentList(this.$route.params.id)
      if (data.code === '000000') {
        if (data.data.menuInfo) {
          this.form = data.data.menuInfo
        }
        this.parentList = data.data.parentMenuList
      }
    }
  }
})
</script>
<style lang="scss" scoped></style>
