<template>
  <div
    :class="[
      `s-divider-con-${direction}`
    ]"
    :style="borderSty"
  >
    <div
      :class="[
        's-divider-text-con',
        `s-divider-text-${contentPosition}`
      ]"
    >
      <slot />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'
import './SDivider.css'

export default defineComponent({
  name: 'SDivider',
  props: {
    // horizontal / vertical
    direction: {
      type: String,
      default: 'horizontal'
    },
    borderExhibit: {
      type: String,
      default: 'solid'
    },
    // left / right / center
    contentPosition: {
      type: String,
      default: 'center'
    }
  },
  setup (props) {
    const borderSty = ref(null)

    watch(() => props.borderExhibit, (val) => {
      borderSty.value = props.direction === 'horizontal' ? { borderTopStyle: val } : { borderLeftStyle: val }
    }, { immediate: true })

    return {
      borderSty
    }
  }
})
</script>
