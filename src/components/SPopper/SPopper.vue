<template>
  <div
    :class="[
      's-popper-base-sty'
    ]"
  >
    <div id="showPopper">
      <slot />
    </div>
    <div id="popperCon">
      {{ content }}
      <div id="arrow" data-popper-arrow></div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, watch } from 'vue'
import { createPopper } from '@popperjs/core'
import './SPopper.css'

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
    }
  },
  setup (props) {
    const instance = ref(null)

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
      const slotDom = document.getElementById('showPopper')
      const showDom = document.getElementById('popperCon')
      instance.value = createPopper(slotDom, showDom)
      setInstance()
      showEvents.forEach(item => {
        slotDom.addEventListener(item, show)
      })
      hideEvents.forEach(item => {
        slotDom.addEventListener(item, hide)
      })

      function show () {
        showDom.setAttribute('data-show', '')
        setInstance()
      }
      // 隐藏事件
      function hide () {
        showDom.removeAttribute('data-show')
      }
    })

    watch(props, () => {
      setInstance()
    })
  }
})
</script>
