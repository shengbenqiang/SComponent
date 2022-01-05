<template>
  <div
    :class="[
      's-popper-base-sty'
    ]"
  >
    <div>
      <div :id="slotDomId">
        <slot />
      </div>
    </div>
    <div
      :id="showDomId"
      :class="[
        effect === 'dark' ? 's-popper-dark-bg' : 's-popper-light-bg',
        'animate__animated',
        's-popper-show-base',
        content ? 's-popper-content-padding' : 's-popper-slot-padding'
      ]"
    >
      {{ content ? content : '' }}
      <slot name="content" />
      <div id="arrow" data-popper-arrow></div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import { createPopper } from '@popperjs/core'
import { GenNonDuplicateID } from '@/untils/common'
import './SPopper.css'
import 'animate.css'
import '@/assets/transition/transition.css'

let showEvents = ['mouseenter', 'focus']
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
      default: 'absolute'
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
    },
    emitType: {
      type: Array,
      default: () => ([])
    },
    visible: {
      default: undefined
    }
  },
  setup (props) {
    const instance = ref(null)
    const slotDomId = GenNonDuplicateID()
    const showDomId = GenNonDuplicateID()
    const slotDom = ref(null)
    const showDom = ref(null)
    const animation = ref(false)

    const emitLength = computed(() => {
      return props.emitType.length
    })

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
    function setShowStatus () {
      if (typeof props.visible !== 'boolean') {
        if (emitLength.value > 0) {
          showEvents = props.emitType
          showEvents.forEach(item => {
            slotDom.value.addEventListener(item, show)
            showDom.value.addEventListener(item, show)
          })
        } else {
          showEvents.forEach(item => {
            slotDom.value.addEventListener(item, show)
            showDom.value.addEventListener(item, show)
          })
          hideEvents.forEach(item => {
            slotDom.value.addEventListener(item, hide)
            showDom.value.addEventListener(item, hide)
          })
        }
      } else {
        if (props.visible) {
          showDom.value.setAttribute('data-show', '')
          if (props.effect === 'light') {
            showDom.value.setAttribute('data-light', 'light')
          }
        } else {
          showDom.value.removeAttribute('data-show')
          if (props.effect === 'light') {
            showDom.value.removeAttribute('data-light')
          }
        }
      }
    }

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

    onMounted(() => {
      slotDom.value = document.getElementById(slotDomId)
      showDom.value = document.getElementById(showDomId)
      instance.value = createPopper(slotDom.value, showDom.value)
      setInstance()
      setShowStatus()
    })

    watch(props, () => {
      setInstance()
      setShowStatus()
    })

    return {
      delayTime,
      animation,
      hideDelayTime,
      slotDomId,
      showDomId
    }
  }
})
</script>
