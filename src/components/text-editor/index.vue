<template>
  <div ref="editor"></div>
</template>
<script lang="ts">
import Vue from 'vue'
import E from 'wangeditor'
import { uploadCourseImg } from '@/services/course'
export default Vue.extend({
  name: 'EditorIndex',
  props: {
    value: {
      type: String
    }
  },
  mounted () {
    this.initEditor()
  },
  methods: {
    initEditor () {
      const editor = new E(this.$refs.editor as any)
      // 或者 const editor = new E( document.getElementById('div1') )
      editor.config.onchange = (newHtml: any) => {
        this.$emit('input', newHtml)
      }
      editor.config.customUploadImg = async (
        resultFiles: any,
        insertImgFn: any
      ) => {
        const fd = new FormData()
        fd.append('file', resultFiles[0])
        const { name } = await uploadCourseImg(fd) as any

        // resultFiles 是 input 中选中的文件列表
        // insertImgFn 是获取图片 url 后，插入到编辑器的方法
        // 上传图片，返回结果，将图片插入到编辑器中
        insertImgFn(name)
      }
      editor.create()
      //
      const unwatchFn = this.$watch('value', (newV) => {
        editor.txt.html(newV)
        unwatchFn()
      })
    }
  }
})
</script>
<style lang="scss" scoped></style>
