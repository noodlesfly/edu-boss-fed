<template>
  <div class="course-update">
    <add-or-update :is-edit="true" :course-id="courseId"></add-or-update>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import AddOrUpdate from './addorupdate.vue'

export default Vue.extend({
  props: {
    courseId: {
      required: true,
      type: [Number, String]
    }
  },
  name: 'course-update',
  components: {
    AddOrUpdate
  }
})
</script>
<style lang="scss" scoped></style>
