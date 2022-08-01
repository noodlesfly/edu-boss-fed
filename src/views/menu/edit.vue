<template>
  <div class="menu-edit">
    <create-or-edit-vue :isEdit="true"></create-or-edit-vue>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import createOrEditVue from './components/createOrEdit.vue'
export default Vue.extend({
  props: {
    id: {
      type: String
    }
  },
  name: 'menu-edit',
  components: {
    createOrEditVue
  }
})
</script>
<style lang="scss" scoped></style>
