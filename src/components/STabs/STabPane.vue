<template>
  <div
    :class="[
      's-tab-pane-con'
    ]"
  >
    <slot />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import './STabPane.css'

export default defineComponent({
  name: 'STabPane',
  props: {
    label: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    }
  }
})
</script>
