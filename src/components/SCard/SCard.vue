<template>
  <div
    :class="[
      's-card-con',
      shadow ? `s-card-${shadow}-shadow` : 's-card-always-shadow'
    ]"
  >
    <div v-if="$slots.header || header" :class="['s-card-header-con']">
      <slot name="header" />
    </div>
    <div :class="['s-card-body-con']" :style="bodyStyle">
      <slot />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import './SCard.css'

export default defineComponent({
  name: 'SCard',
  props: {
    bodyStyle: {
      type: Object,
      default: () => ({})
    },
    shadow: {
      type: String,
      default: ''
    },
    header: {
      type: String,
      default: ''
    }
  }
})
</script>
