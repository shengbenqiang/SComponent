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
    <div
      :class="[
        's-input-tow-div'
      ]"
    >
      <input
        :class="[
        's-input-base-sty',
        $slots.leftAppend ? 's-input-left-border' : 's-input-base-border',
        $slots.rightAppend ? 's-input-right-border' : 's-input-base-border',
        $slots.leftAppend && $slots.rightAppend ? 's-input-all-border' : 's-input-base-border',
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
        @blur="blurHandle"
        @change="changeHandle"
        @focus="focusHandle"
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
        <s-icon :icon="rightIcon" :size="16" />
      </span>
      <span
          v-if="leftIcon"
          :class="[
          sInputSize,
          's-input-left-icon',
          's-input-icon-base'
        ]"
        >
        <s-icon :icon="leftIcon" :size="16" />
      </span>
    </div>
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
import './SInput.css'
import SIcon from '@/components/SIcon/SIcon'

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
  components: {
    SIcon
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
      this.$emit('clear')
      showClear.value = false
    }
    function blurHandle (e) {
      this.$emit('blur', e)
    }
    // 用户失去焦点或按下回车时触发 内容改变的情况下
    function changeHandle (e) {
      this.$emit('change', e)
    }
    // 输入框组件获取焦点是触发事件
    function focusHandle (e) {
      this.$emit('focus', e)
    }
    showCLear()
    return {
      sInputSize,
      clearIcon,
      showClear,
      inputHandle,
      clearClick,
      blurHandle,
      changeHandle,
      focusHandle
    }
  }
})
</script>
