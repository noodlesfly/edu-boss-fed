<template>
  <div class="resource">
    <resource-list></resource-list>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import resourceList from './components/list.vue'

export default Vue.extend({
  name: 'ResourceIndex',
  components: {
    resourceList
  }
})
</script>

<style lang="scss" scoped></style>
