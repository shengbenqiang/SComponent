<template>
  <button
    :class="[
      typeClass,
      'baseStyle',
      sizeClass,
      disabled ? 'pointSty' : '',
      round ? 'halfCir' : '',
      circle ? 'allCir' : ''
    ]"
    :disabled="disabled"
    :style="{
      ...styleObj,
      width: myWidth ? myWidth + 'px' : styleObj.width ? styleObj.width : '',
      height: myHeight ? myHeight + 'px' : styleObj.height ? styleObj.height : '',
      fontSize: myFontSize ? myFontSize + 'px' : styleObj.fontSize ? styleObj.fontSize : '',
      backgroundColor: myBg ? myBg : styleObj.backgroundColor ? styleObj.backgroundColor : ''
    }"
  >
    <img v-show="icon" :src="icon" alt="" class="SBtnImg">
    <slot />
  </button>
</template>

<script>
import { defineComponent, computed, watch, ref } from 'vue'
export default defineComponent({
  name: 'SButton',
  props: {
    size: {
      type: String,
      default: 'small'
    },
    type: {
      type: String,
      default: 'primary'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    styleObj: {
      type: Object,
      default: () => ({})
    },
    plain: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ''
    },
    myWidth: {
      type: Number,
      default: 0
    },
    myFontSize: {
      type: Number,
      default: 0
    },
    myHeight: {
      type: Number,
      default: 0
    },
    myBg: {
      type: String,
      default: ''
    },
    circle: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const typeClass = ref(null)
    const sizeClass = computed(() => {
      return props.size
    })
    watch(props, (val) => {
      if (val.plain) {
        typeClass.value = 'plain' + val.type
      }
      if (val.disabled) {
        typeClass.value = 'dis' + val.type
      }
      if (val.plain && val.disabled) {
        typeClass.value = 'displain' + val.type
      } else if (!val.plain && !val.disabled) {
        typeClass.value = val.type
      }
    }, { immediate: true })

    return {
      typeClass,
      sizeClass
    }
  }
})
</script>

<style scoped>
@import "./SButton.css";
</style>
