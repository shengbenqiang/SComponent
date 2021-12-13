<template>
  <div
    :class="[
      sizeDiv,
      's-input-div-base-sty',
      divBorder ? 's-focus-div-border' : 's-no-focus-div-border'
    ]"
  >
    <span
      v-if="!showWay"
      :class="[
        sizeSty,
        operateWidth,
        disabled ?
        's-input-disable-operate-bg s-input-number-operate-disable-cursor s-input-dis-operate-color' :
        's-input-use-operate-bg s-input-number-operate .s-input-use-operate-color',
        leftOperate ? 's-input-operate-hover' : '',
        limitMax ? 's-input-equal' : '',
        's-input-number-left-operate'
      ]"
      @click="addOperate"
      @mouseenter="operateEnter(1)"
      @mouseleave="operateLeave(1)"
    >
      +
    </span>
    <input
      type="number"
      :class="[
        's-input-number-base-sty',
        's-input-number-split-btn',
        sizeSty,
        disabled ? 's-input-disable-operate-bg s-input-number-operate-disable-cursor s-input-num-dis' : '',
      ]"
      :value="modelValue"
      :min="min"
      :max="max"
      :step="step"
      :disabled="disabled"
      @focus="focusNumHandle"
      @blur="blurNumHandle"
    >
    <span
      v-if="!showWay"
      :class="[
        sizeSty,
        operateWidth,
        disabled ?
        's-input-disable-operate-bg s-input-number-operate-disable-cursor s-input-dis-operate-color' :
        's-input-use-operate-bg s-input-number-operate .s-input-use-operate-color',
        rightOperate ? 's-input-operate-hover' : '',
        limitMin ? 's-input-equal' : '',
        's-input-number-right-operate'
      ]"
      @click="reduceOperate"
      @mouseenter="operateEnter(2)"
      @mouseleave="operateLeave(2)"
    >
      -
    </span>
    <span
      v-if="showWay"
      :class="[
        sizeSty,
        operateWidth,
        's-input-way-base'
      ]"
      @mouseenter="operateEnter()"
      @mouseleave="operateLeave()"
    >
      <div
        :class="[
          rightTop ? 's-input-right-hover' : '',
          limitMax ? 's-input-equal' : '',
          's-input-way-top-base',
          's-input-way-common',
          'fa fa-angle-up fa-lg'
        ]"
        @click="addOperate"
        @mouseenter="operateRightEnter(1)"
        @mouseleave="operateRightLeave(1)"
      />
      <div
        :class="[
          rightBto ? 's-input-right-hover' : '',
          limitMin ? 's-input-equal' : '',
          's-input-way-bot-base',
          's-input-way-common',
          'fa fa-angle-down'
        ]"
        @click="reduceOperate"
        @mouseenter="operateRightEnter(2)"
        @mouseleave="operateRightLeave(2)"
      />
    </span>
  </div>
</template>

<script>
import { defineComponent, computed, ref } from 'vue'
import './SInputNumber.css'

export default defineComponent({
  name: 'SInputNumber',
  props: {
    size: {
      type: String,
      default: 'large'
    },
    showWay: {
      type: String,
      default: ''
    },
    modelValue: {
      type: Number,
      default: null
    },
    min: {
      type: Number,
      default: null
    },
    max: {
      type: Number,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    step: {
      type: Number,
      default: null
    }
  },
  setup (props) {
    const divBorder = ref(false)
    const leftOperate = ref(false)
    const rightOperate = ref(false)
    const rightTop = ref(false)
    const rightBto = ref(false)
    const limitMin = ref(false)
    const limitMax = ref(false)
    const sizeSty = computed(() => {
      return props.size + 'Size'
    })
    const sizeDiv = computed(() => {
      return props.size + '-size-div'
    })
    const operateWidth = computed(() => {
      return 's-' + props.size + '-size-operate'
    })
    function focusNumHandle (e) {
      divBorder.value = true
      this.$emit('focus', e)
    }
    function blurNumHandle (e) {
      divBorder.value = false
      this.$emit('blur', e)
    }
    function isAdd (num) {
      if (props.max) {
        return num <= props.max
      }
    }
    function confirmAdd (_that) {
      if (props.step) {
        _that.$emit('update:modelValue', props.modelValue + props.step)
      } else {
        _that.$emit('update:modelValue', props.modelValue + 1)
      }
    }
    function addOperate () {
      const that = this
      const add = isAdd(props.modelValue + 1)
      if (!add) {
        return
      }
      if (props.max !== null || props.min !== null) {
        limitMax.value = (props.max && props.modelValue + 1 === props.max)
        limitMin.value = !(props.max + 1 > props.min)
      }
      if (!props.disabled) {
        if (add && props.max) {
          confirmAdd(that)
        } else if (props.max === null) {
          confirmAdd(that)
        }
      }
    }
    function isReduce (num) {
      if (props.min !== null) {
        return num >= props.min
      }
    }
    function confirmReduce (_that) {
      if (props.step) {
        _that.$emit('update:modelValue', props.modelValue - props.step)
      } else {
        _that.$emit('update:modelValue', props.modelValue - 1)
      }
    }
    function reduceOperate () {
      const that = this
      const reduce = isReduce(props.modelValue - 1)
      if (!reduce) {
        return
      }
      if (props.max !== null || props.min !== null) {
        limitMin.value = (props.modelValue - 1 === props.min && props.min)
        limitMax.value = !(props.modelValue - 1 < props.max)
      }
      if (!props.disabled) {
        if (reduce && props.min !== null) {
          confirmReduce(that)
        } else if (props.min === null) {
          confirmReduce(that)
        }
      }
    }
    function handleOperateColor (operateType, isChange) {
      if (operateType) {
        if (operateType === 1) {
          leftOperate.value = isChange
        } else if (operateType === 2) {
          rightOperate.value = isChange
        }
      }
    }
    function operateEnter (operate) {
      if (!props.disabled) {
        divBorder.value = true
        handleOperateColor(operate, true)
      }
    }
    function operateLeave (operate) {
      divBorder.value = false
      handleOperateColor(operate, false)
    }
    function handleRightClass (type, change) {
      if (type === 1) {
        rightTop.value = change
      } else if (type === 2) {
        rightBto.value = change
      }
    }
    function operateRightEnter (rightType) {
      handleRightClass(rightType, true)
    }
    function operateRightLeave (rightType) {
      handleRightClass(rightType, false)
    }
    return {
      sizeSty,
      sizeDiv,
      operateWidth,
      divBorder,
      leftOperate,
      rightOperate,
      rightTop,
      rightBto,
      limitMin,
      limitMax,
      focusNumHandle,
      blurNumHandle,
      addOperate,
      reduceOperate,
      operateEnter,
      operateLeave,
      operateRightEnter,
      operateRightLeave
    }
  }
})
</script>
