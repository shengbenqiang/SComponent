<template>
  <div
    :class="[
      tabPosition !== 'top' && tabPosition !== 'bottom' ? `s-tab-nav-${tabPosition}-bar` : 's-tab-nav-bar'
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
    },
    tabPosition: {
      type: String,
      default: 'top'
    }
  }
})
</script>
