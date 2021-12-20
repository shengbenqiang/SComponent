<template>
  <span
    :class="[
      effectSty,
      effect !== 'dark' ? typeColor : 's-tag-dark-color',
      sizeStyl,
      's-tag-span-con'
    ]"
    :style="{
      backgroundColor: color,
      borderColor: color
    }"
    @click.stop="tagClick"
  >
    <slot />
    <SIcon
      v-if="closable"
      :class="[
        's-tag-close-sty',
        iconMouse ? iconHoverSty : '',
        effect !== 'dark' ? 's-tag-close-padding' : ''
      ]"
      icon="icon-close1"
      @mouseleave="handleIconLeave"
      @mouseenter="handleIconEnter"
      @click.stop.prevent="delClick"
    />
  </span>
</template>

<script>
import { computed, defineComponent, ref } from 'vue'
import './STag.css'
import SIcon from '@/components/SIcon/SIcon'

export default defineComponent({
  name: 'STag',
  components: {
    SIcon
  },
  props: {
    type: {
      type: String,
      default: 'default'
    },
    closable: {
      type: Boolean,
      default: false
    },
    // 暂未开放
    disableTransitions: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'large'
    },
    // dark / light / plain
    effect: {
      type: String,
      default: 'light'
    }
  },
  setup (props, { emit }) {
    const iconMouse = ref(false)
    const effectSty = computed(() => {
      return 's-tag-' + props.effect + '-' + props.type + '-effect'
    })

    const typeColor = computed(() => {
      return 's-tag-' + props.type + '-type'
    })

    const sizeStyl = computed(() => {
      return 's-size-' + props.size
    })

    const iconHoverSty = computed(() => {
      return 's-tag-icon-' + props.effect + '-' + props.type + '-hover'
    })

    function handleIconLeave () {
      iconMouse.value = false
    }

    function handleIconEnter () {
      iconMouse.value = true
    }

    function delClick () {
      emit('close')
    }

    function tagClick () {
      emit('click')
    }

    return {
      effectSty,
      typeColor,
      sizeStyl,
      iconMouse,
      iconHoverSty,
      handleIconLeave,
      handleIconEnter,
      delClick,
      tagClick
    }
  }
})
</script>
