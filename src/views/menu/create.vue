<template>
  <div class="menu-create">
    <create-or-edit-vue></create-or-edit-vue>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import createOrEditVue from './components/createOrEdit.vue'
export default Vue.extend({
  name: 'menu-create',
  components: {
    createOrEditVue
  }
})
</script>
<style lang="scss" scoped></style>
