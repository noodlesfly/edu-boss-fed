<template>
  <div class="course-section">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>内容列表</span>
      </div>
      <!-- <el-tree
        :data="sections"
        :props="defaultProps"
        draggable
        :allow-drop="handleAllowDrop"
        @node-drop="handleNodeDrop"
      >
        <template slot-scope="{ node, data }">
          <div style="width: 100%">
            {{ node.label }}
            <span class="nodebtn" v-if="data.sectionName">
              <el-button type="plain">编辑</el-button>
              <el-button type="primary">添加课时</el-button>
              <el-button type="plain">隐藏</el-button>
            </span>
            <span class="nodebtn" v-else>
              <el-button type="plain">编辑</el-button>
              <el-button
                type="primary"
                @click="
                  $router.push({
                    name: 'course-video',
                    params: {
                      courseId: data.courseId,
                    },
                    query: {
                      sectionId: node.parent.id,
                      lessonId: data.id,
                    },
                  })
                "
                >上传视频</el-button
              >
              <el-button type="plain">隐藏</el-button>
            </span>
          </div>
        </template>
      </el-tree> -->
    </el-card>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
// import {
//   getSectionAndLesson,
//   saveOrUpdateSection,
//   saveOrUpdateLesson
// } from '@/services/course'
export default Vue.extend({
  name: 'course-section',
  props: {
    courseId: {
      type: [Number, String],
      required: true
    }
  }
  // created () {
  //   this.loadSections()
  // },
  // data () {
  //   return {
  //     sections: [
  //       {
  //         label: '一级 1',
  //         children: [
  //           {
  //             label: '二级 1-1',
  //             children: [
  //               {
  //                 label: '三级 1-1-1'
  //               }
  //             ]
  //           }
  //         ]
  //       },
  //       {
  //         label: '一级 2',
  //         children: [
  //           {
  //             label: '二级 2-1',
  //             children: [
  //               {
  //                 label: '三级 2-1-1'
  //               }
  //             ]
  //           },
  //           {
  //             label: '二级 2-2',
  //             children: [
  //               {
  //                 label: '三级 2-2-1'
  //               }
  //             ]
  //           }
  //         ]
  //       },
  //       {
  //         label: '一级 3',
  //         children: [
  //           {
  //             label: '二级 3-1',
  //             children: [
  //               {
  //                 label: '三级 3-1-1'
  //               }
  //             ]
  //           },
  //           {
  //             label: '二级 3-2',
  //             children: [
  //               {
  //                 label: '三级 3-2-1'
  //               }
  //             ]
  //           }
  //         ]
  //       }
  //     ],
  //     defaultProps: {
  //       children: 'lessonDTOS',
  //       label (data: any) {
  //         return data.sectionName || data.theme
  //       }
  //     }
  //   }
  // },
  // methods: {
  //   async loadSections () {
  //     const { data } = await getSectionAndLesson(this.courseId)
  //     if (data.code === '000000') {
  //       this.sections = data.data
  //     }
  //   },
  //   handleAllowDrop (draggingNode: any, dropNode: any, type: any) {
  //     return (
  //       draggingNode.data.sectionId === dropNode.data.sectionId &&
  //       type !== 'inner'
  //     )
  //   },
  //   handleNodeDrop (dragnode: any, dropnode: any, type: any, event: any) {
  //     const promises = dropnode.parent.childNodes.map((item: any, index: any) => {
  //       if (dragnode.data.sectionName) {
  //         return saveOrUpdateSection({
  //           id: item.data.id,
  //           orderNum: index + 1
  //         })
  //       } else {
  //         return saveOrUpdateLesson({
  //           id: item.data.id,
  //           orderNum: index + 1
  //         })
  //       }
  //     })

  //     Promise.all(promises).then((res) => {
  //       this.$message.success('处理成功')
  //     })
  //   }
  // }
})
</script>
<style lang="scss" scoped>
::v-deep .el-tree .el-tree-node__content {
  height: auto;
  padding: 4px 0;

  .tree-item {
    width: 100%;
  }
}

.nodebtn {
  float: right;
}
</style>
