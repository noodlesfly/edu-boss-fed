<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <template>
        <el-steps :active="activeStep" finish-status="success">
          <el-step
            :title="step.title"
            v-for="(step, index) in steps"
            :key="index"
            :icon="step.icon"
            @click.native="activeStep = index"
          ></el-step>
        </el-steps>
      </template>
    </div>
    <el-form label-width="80px">
      <div v-show="activeStep === 0">
        <el-form-item label="课程名称">
          <el-input v-model="course.courseName"></el-input>
        </el-form-item>
        <el-form-item label="课程简介">
          <el-input v-model="course.brief"></el-input>
        </el-form-item>
        <el-form-item label="课程概述">
          <el-input
            type="textarea"
            v-model="course.previewFirstField"
            placeholder="概述1"
          ></el-input>
          <el-input
            type="textarea"
            placeholder="概述2"
            v-model="course.previewSecondField"
          ></el-input>
        </el-form-item>
        <el-form-item label="讲师姓名">
          <el-input v-model="course.teacherDTO.teacherName"></el-input>
        </el-form-item>
        <el-form-item label="讲师简介">
          <el-input v-model="course.teacherDTO.description"></el-input>
        </el-form-item>
        <el-form-item label="课程排序">
          <el-input v-model="course.sortNum"></el-input>
        </el-form-item>
      </div>
      <div v-show="activeStep === 1">
        <el-form-item label="课程封面">
          <!-- <upload-img v-model="course.courseListImg"></upload-img> -->
        </el-form-item>
        <el-form-item label="介绍封面">
          <!-- <upload-img v-model="course.courseImgUrl"></upload-img> -->
        </el-form-item>
      </div>
      <div v-show="activeStep === 2">
        <el-form-item label="售卖价格">
          <el-input v-model="course.discounts" placeholder="请输入内容">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="商品原价">
          <el-input v-model="course.price" placeholder="请输入内容">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="销量">
          <el-input v-model="course.sales" placeholder="请输入内容">
            <template slot="append">单</template>
          </el-input>
        </el-form-item>
        <el-form-item label="活动标签">
          <el-input placeholder="请输入内容" v-model="course.discountsTag">
          </el-input>
        </el-form-item>
      </div>
      <div v-show="activeStep === 3">
        <el-form-item label="限时秒杀开关">
          <el-switch
            v-model="isSecKill"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </el-form-item>
        <template v-if="isSecKill">
          <el-form-item label="开始时间">
            <el-date-picker
              type="date"
              v-model="course.activityCourseDTO.beginTime"
              placeholder="选择开始时间"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间">
            <el-date-picker
              type="date"
              v-model="course.activityCourseDTO.endTime"
              placeholder="选择结束时间"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="秒杀价">
            <el-input
              v-model="course.activityCourseDTO.amount"
              placeholder="请输入内容"
            >
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="秒杀库存">
            <el-input
              v-model="course.activityCourseDTO.stock"
              placeholder="请输入内容"
            >
              <template slot="append">个</template>
            </el-input>
          </el-form-item>
        </template>
      </div>
      <div v-show="activeStep === 4">
        <el-form-item label="课程详情">
          <wang-editor v-model="course.courseDescriptionMarkDown"></wang-editor>
        </el-form-item>
        <el-form-item>
          <!-- <el-button type="primary" @click="handleSave">保存</el-button> -->
        </el-form-item>
      </div>
      <el-form-item v-if="activeStep < 4">
        <el-button @click="nextStep">下一步</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script lang="ts">
import Vue from 'vue'
// import UploadImg from '@/components/upload.vue'
// import { saveOrUpdateCourse, getCourseById } from '@/services/course'
// import WangEditor from '@/components/text-editor/index.vue'

export default Vue.extend({
  name: 'add-update',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    courseId: {
      type: [Number, String]
    }
  },
  components: {
    // UploadImg
    // WangEditor
  },
  data () {
    return {
      activeStep: 0,
      steps: [
        {
          title: '基本信息',
          icon: 'el-icon-platform-eleme'
        },
        {
          title: '课程封面',
          icon: 'el-icon-s-goods'
        },
        {
          title: '销售信息',
          icon: 'el-icon-message-solid'
        },
        {
          title: '秒杀活动',
          icon: 'el-icon-camera-solid'
        },
        {
          title: '课程详情',
          icon: 'el-icon-s-platform'
        }
      ],
      isSecKill: false,
      course: {
        courseName: '',
        brief: '',
        teacherDTO: {
          teacherName: '',
          teacherHeadPicUrl: '',
          position: '',
          description: ''
        },
        courseDescriptionMarkDown: '',
        price: 0,
        discounts: 0,
        priceTag: '',
        discountsTag: '',
        isNew: true,
        isNewDes: '',
        courseListImg: '',
        courseImgUrl: '',
        sortNum: 0,
        previewFirstField: '',
        previewSecondField: '',
        status: 0,
        sales: 0,
        activityCourse: false,
        activityCourseDTO: {
          beginTime: '',
          endTime: '',
          amount: 0,
          stock: 0
        },
        autoOnlineTime: ''
      }
    }
  },
  created () {
    if (this.isEdit) {
      // this.loadCourse()
    }
  },
  methods: {
    nextStep () {
      this.activeStep++
      if (this.activeStep >= 5) {
        console.log(this.activeStep)
      }
    }
    // async handleSave () {
    //   const { data } = await saveOrUpdateCourse(this.course)
    //   if (data.code === '000000') {
    //     this.$router.push({
    //       name: 'course'
    //     })
    //   }
    // },
    // async loadCourse () {
    //   const { data } = await getCourseById(this.courseId)
    //   if (data.code === '000000') {
    //     this.course = data.data
    //   }
    // }
  }
})
</script>
<style lang="scss" scoped>
.el-step {
  cursor: pointer;
}

.el-input-number {
  width: 100%;
}
</style>
