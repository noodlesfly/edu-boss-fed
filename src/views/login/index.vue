<template>
  <div class="login">
    <el-form ref="form" :model="form" :rules="rules" label-position="top" label-width="80px" class="login-form">
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" placeholder="请输入密码" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="login-btn" :loading="isLoginLoading" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Form } from 'element-ui'
import { login } from '@/services/user'
import { useUserStore } from '@/store/user'
import { mapActions } from 'pinia'

export default Vue.extend({
  name: 'LoginIndex',
  data () {
    return {
      form: {
        phone: '18201288771',
        password: '111111'
      },
      isLoginLoading: false,
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            pattern: /^1\d{10}$/,
            message: '请输入正确的手机号',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 18,
            message: '长度在 6 到 18 位',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    ...mapActions(useUserStore, ['setUser']),
    async onSubmit () {
      try {
        await (this.$refs.form as Form).validate()
        this.isLoginLoading = true
        const { state, content, message } = await login(this.form).finally(() => {
          this.isLoginLoading = false
        })
        if (state === 1 || state === 200) {
          this.$message.success('登录成功！')
          this.setUser(JSON.parse(content))
          const redirect = (this.$route.query?.redirect as string) || '/'
          this.$router.replace(redirect)
        } else {
          this.$message.error(`${message}`)
        }
      } catch (error) {
        this.$message.error(`登录失败,${error}`)
      }
    }
  }

})
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-form {
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    width: 300px;
  }

  .login-btn {
    width: 100%;
    margin-top: 24px;
  }
}
</style>
