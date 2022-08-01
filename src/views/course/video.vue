<template>
  <div class="course-video">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <p>课程： xxx</p>
        <p>阶段： xxx</p>
        <p>课时： xxx</p>
      </div>

      <el-form ref="form" label-width="80px">
        <el-form-item label="视频上传">
          <input type="file" ref="videofile" />
        </el-form-item>
        <el-form-item label="封面上传">
          <input type="file" ref="imagefile" />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="handleUpload"
            :disabled="percent > 0 && percent < 100"
            >开始上传</el-button
          >
          <el-button type="plain">返回</el-button>
        </el-form-item>
        <el-form-item v-if="percent">
          <p>视频上传中：{{ percent }}%</p>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script lang="ts">
/*eslint-disable*/
import Vue from "vue";
import {
  aliyunVideoUploadAddressAdnAuth,
  aliyunImagUploadAddressAdnAuth,
  aliyunTransCode,
  aliyunTransCodePercent,
} from "@/services/aliyun";
export default Vue.extend({
  name: "course-video",
  data() {
    return {
      uploader: null,
      imageUrl: "",
      videoId: null,
      percent: 0,
    };
  },
  created() {
    this.init();
  },
  props: {
    courseId: {
      type: [Number, String],
      required: true,
    },
  },
  methods: {
    init() {
      this.uploader = new window.AliyunUpload.Vod({
        //userID，必填，您可以使用阿里云账号访问账号中心（https://account.console.aliyun.com/），即可查看账号ID
        userId: "1618139964448548",
        //上传到视频点播的地域，默认值为'cn-shanghai'，
        //eu-central-1，ap-southeast-1
        region: "",
        //分片大小默认1 MB，不能小于100 KB（100*1024）
        partSize: 1048576,
        //并行上传分片个数，默认5
        parallel: 5,
        //网络原因失败时，重新上传次数，默认为3
        retryCount: 3,
        //网络原因失败时，重新上传间隔时间，默认为2秒
        retryDuration: 2,
        //开始上传
        onUploadstarted: async (uploadInfo: any) => {
          let uploadAdressAndAuth;
          if (uploadInfo.isImage) {
            const { data } = await aliyunImagUploadAddressAdnAuth();
            this.imageUrl = data.data.imageUrl;
            uploadAdressAndAuth = data.data;
          } else {
            const { data } = await aliyunVideoUploadAddressAdnAuth({
              fileName: uploadInfo.file.name,
              imageUrl: this.imageUrl,
            });
            uploadAdressAndAuth = data.data;
            this.videoId = uploadAdressAndAuth.videoId;
          }

          (this.uploader as any).setUploadAuthAndAddress(
            uploadInfo,
            uploadAdressAndAuth.uploadAuth,
            uploadAdressAndAuth.uploadAddress,
            uploadAdressAndAuth.videoId || uploadAdressAndAuth.imageId
          );
        },
        //文件上传成功
        onUploadSucceed: function (uploadInfo: any) {
          console.log(uploadInfo, "成功");
        },
        //文件上传失败
        onUploadFailed: function (uploadInfo: any, code: any, message: any) {},
        //文件上传进度，单位：字节
        onUploadProgress: (
          uploadInfo: any,
          totalSize: any,
          loadedPercent: any
        ) => {
          this.percent = Math.floor(loadedPercent * 100);
        },
        //上传凭证或STS token超时
        onUploadTokenExpired: function (uploadInfo: any) {},
        //全部文件上传结束
        onUploadEnd: async (uploadInfo: any) => {
          (this.uploader as any).cleanList();
          this.percent = 0;
          const { data } = await aliyunTransCode({
            lessonId: this.$route.query.lessonId,
            coverImageUrl: this.imageUrl,
            fileId: this.videoId,
            fileName: (this.$refs as any)["videofile"].files[0].name,
          });
          console.log("申请转码", data);
          const timeId = setInterval(async () => {
            const { data } = await aliyunTransCodePercent(
              this.$route.query.lessonId
            );
            if (data.data === 100) {
              clearInterval(timeId);
              console.log("转码成功");
            }
          }, 3000);
        },
      });
    },
    handleUpload() {
      this.imageUrl = "";
      this.percent = 0;
      this.videoId = null;
      const videoFile = (this.$refs as any)["videofile"].files[0];
      const imageFile = (this.$refs as any)["imagefile"].files[0];
      const uploader = this.uploader;
      if (videoFile) {
        (uploader as any).addFile(videoFile, null, null, null, '{"Vod":{}}');
      } else if (imageFile) {
        (uploader as any).addFile(imageFile, null, null, null, '{"Vod":{}}');
      }

      (uploader as any).startUpload();
    },
  },
});
</script>
<style lang="scss" scoped></style>
