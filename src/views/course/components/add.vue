<template>
  <div class="course-add">
    <add-or-update></add-or-update>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import AddOrUpdate from './addorupdate.vue'

export default Vue.extend({
  name: 'course-add',
  components: {
    AddOrUpdate
  }
})
</script>
<style lang="scss" scoped></style>
