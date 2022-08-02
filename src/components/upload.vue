<template>
  <div class="uploadimg">
    <el-progress
      type="circle"
      :percentage="percentage"
      :width="178"
      :status="percentage === 100 ? 'success' : undefined"
      v-if="isUploading"
    ></el-progress>
    <el-upload
      v-else
      class="avatar-uploader"
      :show-file-list="false"
      action="/boss/course/upload"
      :http-request="handleUpload"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="value" :src="value" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { uploadCourseImg } from '@/services/course'
export default Vue.extend({
  props: {
    value: {
      type: String
    },
    size: {
      type: Number,
      default: 2
    },
    types: {
      type: Array,
      default: function () {
        return ['image/jpeg']
      }
    }
  },
  name: 'uploadImg',
  data () {
    return {
      percentage: 0,
      isUploading: false
    }
  },
  methods: {
    beforeAvatarUpload (file: any) {
      const isJPG = this.types.some((item: any) => file.type === item)
      const isLt = file.size / 1024 / 1024 < this.size

      if (!isJPG) {
        this.$message.error(`上传头像图片只能是 ${this.types.join(',')} 格式!`)
      }
      if (!isLt) {
        this.$message.error(`上传头像图片大小不能超过 ${this.size}MB`)
      }
      return isJPG && isLt
    },
    async handleUpload (res: any) {
      try {
        this.isUploading = true
        this.percentage = 0
        const fd = new FormData()
        fd.append('file', res.file)
        const { name } = await uploadCourseImg(fd, (e: any) => {
          this.percentage = Math.floor((e.loaded / e.total) * 100)
        }) as any
        this.$emit('input', name)
      } catch (error) {

      } finally {
        this.isUploading = false
      }
    }
  }
})
</script>
<style lang="scss" scoped>
::v-deep .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
::v-deep .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
