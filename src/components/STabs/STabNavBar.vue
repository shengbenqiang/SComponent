<template>
  <div
    :class="[
      's-tab-nav-bar'
    ]"
    :style="barStyle"
  ></div>
</template>

<script>
import { defineComponent } from 'vue'
import './STabNavBar.css'

export default defineComponent({
  name: 'STabNavBar',
  props: {
    barStyle: {
      type: Object,
      default: () => ({})
    }
  }
})
</script>
