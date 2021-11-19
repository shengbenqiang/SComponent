<template>
  <div
    :class="[
      's-input-div'
    ]"
  >
    <span
      v-if="$slots.leftAppend"
      :class="[
        's-input-left-slot',
        sInputSize
      ]"
    >
      <slot name="leftAppend"/>
    </span>
    <input
      :class="[
        's-input-base-sty',
        leftIcon ? 's-input-left-padding' : rightIcon ? 's-input-right-padding s-input-padding' : 's-input-padding',
        sInputSize,
        disabled ? 'disableBg' : ''
      ]"
      :disabled="disabled"
      :placeholder="placeholder"
      :value="modelValue"
      :type="showPassword ? 'password' : ''"
      :maxlength="maxLength ? maxLength : null"
      :minlength="minLength ? minLength : null"
      @input="inputHandle"
    />
    <span
      v-if="clearable"
      :class="[
        's-input-span-base-sty',
        's-input-icon-base',
        sInputSize,
      ]"
      @click="clearClick"
    >
      <img
        :src="clearIcon"
        alt=""
        v-show="showClear"
      />
    </span>
    <span
      v-if="rightIcon"
      :class="[
        sInputSize,
        's-input-right-icon',
        's-input-icon-base'
      ]"
    >
      <img :src="rightIcon" alt=""/>
    </span>
    <span
      v-if="leftIcon"
      :class="[
        sInputSize,
        's-input-left-icon',
        's-input-icon-base'
      ]"
    >
      <img :src="leftIcon" alt=""/>
    </span>
    <span
      v-if="$slots.rightAppend"
      :class="[
        's-input-right-slot',
        sInputSize
      ]"
    >
      <slot name="rightAppend"/>
    </span>
  </div>
</template>

<script>
import { defineComponent, computed, ref } from 'vue'

export default defineComponent({
  name: 'SInput',
  props: {
    size: {
      type: String,
      default: 'max'
    },
    placeholder: {
      type: String,
      default: '请输入内容'
    },
    // v-model 在没有给点传输属性名下 vue 3.0的默认名称，vue 2.0的默认名称是 value
    modelValue: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    showPassword: {
      type: Boolean,
      default: false
    },
    leftIcon: {
      type: String,
      default: ''
    },
    rightIcon: {
      type: String,
      default: ''
    },
    maxLength: {
      type: String,
      default: ''
    },
    minLength: {
      type: String,
      default: ''
    }
  },
  setup (props, { slots }) {
    const showClear = ref(false)
    const clearIcon = require('../../assets/comIcon/inputClear.png')
    const sInputSize = computed(() => {
      return 's-input-size-' + props.size
    })
    function showCLear () {
      showClear.value = props.modelValue.length > 0
    }
    function inputHandle (e) {
      const { value } = e.target
      showClear.value = value.length > 0
      // 相当于父组件接了个 @update事件 只是在元素不显示
      this.$emit('update:modelValue', value)
    }
    function clearClick () {
      this.$emit('update:modelValue', '')
      showClear.value = false
    }
    console.log(slots)
    showCLear()
    return {
      sInputSize,
      clearIcon,
      showClear,
      inputHandle,
      clearClick
    }
  }
})
</script>

<style scoped>
@import "./SInput.css";
</style>
