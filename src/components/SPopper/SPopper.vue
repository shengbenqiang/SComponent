<template>
  <div
    :class="[
      's-popper-base-sty'
    ]"
  >
    <div id="showPopper">
      <slot />
    </div>
    <!-- showAfter ? delayTime : '',transition -->
    <div
      id="popperCon"
      :class="[
        effect === 'dark' ? 's-popper-dark-bg' : 's-popper-light-bg',
        'animate__animated',
        's-popper-show-base'
      ]"
    >
      {{ content ? content : '' }}
      <slot name="content"/>
      <div id="arrow" data-popper-arrow></div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import { createPopper } from '@popperjs/core'
// import { GenNonDuplicateID } from '@/untils/common'
import './SPopper.css'
import 'animate.css'

const showEvents = ['mouseenter', 'focus']
const hideEvents = ['mouseleave', 'blur']

export default defineComponent({
  name: 'SPopper',
  props: {
    ways: {
      type: String,
      default: ''
    },
    // bottom top
    placement: {
      type: String,
      default: 'top'
    },
    // 'absolute' | 'fixed'
    strategy: {
      type: String,
      default: 'fixed'
    },
    content: {
      type: String,
      default: '',
      require: true
    },
    offset: {
      type: Array,
      default: () => ([0, 6])
    },
    // dark | light
    effect: {
      type: String,
      default: 'dark'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    transition: {
      type: String,
      default: 'animate__fadeIn'
    },
    showAfter: {
      type: Number,
      default: 0
    },
    hideAfter: {
      type: Number,
      default: 500
    }
  },
  setup (props) {
    const instance = ref(null)
    // const slotDomId = GenNonDuplicateID()
    // const showDomId = GenNonDuplicateID()
    const slotDom = ref(null)
    const showDom = ref(null)
    const animation = ref(false)

    const delayTime = computed(() => {
      return 'animate__delay-' + props.showAfter + 's'
    })

    const hideDelayTime = computed(() => {
      const tempTime = props.hideAfter / 1000
      return 'animate__delay-' + tempTime + 's'
    })

    function setInstance () {
      instance.value.setOptions({
        placement: props.placement,
        strategy: props.strategy,
        modifiers: [{
          name: 'offset',
          options: {
            offset: props.offset
          }
        }]
      })
    }
    onMounted(() => {
      console.log('执行几次')
      slotDom.value = document.getElementById('showPopper')
      showDom.value = document.getElementById('popperCon')
      instance.value = createPopper(slotDom.value, showDom.value)
      setInstance()
      showEvents.forEach(item => {
        slotDom.value.addEventListener(item, show)
        showDom.value.addEventListener(item, show)
      })
      hideEvents.forEach(item => {
        slotDom.value.addEventListener(item, hide)
        showDom.value.addEventListener(item, hide)
      })
    })

    // 显示时间
    function show () {
      if (props.disabled) { return }
      if (props.effect === 'light') {
        showDom.value.setAttribute('data-light', 'light')
      }
      showDom.value.setAttribute('data-show', '')
      if (props.showAfter) {
        showDom.value.classList.add(delayTime)
      }
      showDom.value.classList.add(props.transition)
      showDom.value.addEventListener('animationend', () => delClass())
      setInstance()
    }
    // 隐藏事件
    function hide () {
      if (props.effect === 'light') {
        showDom.value.removeAttribute('data-light')
      }
      showDom.value.removeAttribute('data-show')
    }
    // 删除类方法
    function delClass () {
      if (props.showAfter) {
        showDom.value.classList.remove('delayTime')
      }
      showDom.value.classList.remove(props.transition)
    }

    watch(props, () => {
      setInstance()
    })

    return {
      delayTime,
      animation,
      hideDelayTime
    }
  }
})
</script>
