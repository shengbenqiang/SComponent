<template>
  <div
    :class="[
      's-option-group-div-con'
    ]"
  >
    <div
      :class="[
        's-option-group-label-base'
      ]"
    >
      {{ label }}
    </div>
    <div>
      <slot />
    </div>
  </div>
</template>

<script>
import { defineComponent, provide, reactive, toRefs } from 'vue'
import './SOptionGroup.css'

export default defineComponent({
  name: 'SOptionGroup',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      require: true,
      default: ''
    }
  },
  setup (props) {
    provide('optionGroupValue', reactive({
      name: 'optionGroup',
      ...toRefs(props)
    }))
  }
})
</script>
