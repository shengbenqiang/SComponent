<template>
  <div class="s-affix-con" :style="affixSty">
    <slot />
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue'
import './SAffix.css'

export default defineComponent({
  name: 'SAffix',
  props: {
    offset: {
      type: Number,
      default: 0
    },
    position: {
      type: String,
      default: 'top'
    },
    zIndex: {
      type: Number,
      default: 100
    },
    target: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const affixSty = reactive({
      zIndex: props.zIndex,
      top: props.position === 'top' ? props.offset : '',
      bottom: props.position === 'bottom' ? props.offset : ''
    })

    return {
      affixSty
    }
  }
})
</script>
