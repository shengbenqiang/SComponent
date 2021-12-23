<template>
  <span
    :class="[
      's-check-tag-base',
      checked ? 's-check-tag-checked' : 's-check-tag-un-checked'
    ]"
    @click="onChange"
  >
    <slot />
  </span>
</template>

<script>
import { defineComponent } from 'vue'
import './SCheckTag.css'

export default defineComponent({
  name: 'SCheckTag',
  props: {
    checked: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    const onChange = () => {
      const checked = !props.checked
      emit('change', checked)
      emit('update:checked', checked)
    }

    return {
      onChange
    }
  }
})
</script>
