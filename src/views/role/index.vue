<template>
  <div class="role">
    <role-list></role-list>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import roleList from './components/list.vue'

export default Vue.extend({
  name: 'RoleIndex',
  components: {
    roleList
  }
})
</script>

<style lang="scss" scoped></style>
