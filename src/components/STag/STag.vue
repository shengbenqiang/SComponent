<template>
  <span
    :class="[
      effectSty,
      typeColor,
      sizeStyl,
      's-tag-span-con'
    ]"
  >
    <slot />
<!--    <span-->
<!--      v-if="closable"-->
<!--      :class="[-->
<!--        'fa fa-times closeSty'-->
<!--      ]"-->
<!--    />-->
    <span
      v-if="closable"
      :class="['closeSty']"
    >
      <!-- 思考：未准备默认值 -->
      <SIcon iconType="fa-regular" iconString="fa-xmark" />
    </span>
  </span>
</template>

<script>
import { computed, defineComponent } from 'vue'
import './STag.css'
import SIcon from '../SIcon/SIcon'

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
  setup (props) {
    const effectSty = computed(() => {
      return 's-tag-' + props.effect + '-' + props.type + '-effect'
    })

    const typeColor = computed(() => {
      return 's-tag-' + props.type + '-type'
    })

    const sizeStyl = computed(() => {
      return 's-size-' + props.size
    })

    return {
      effectSty,
      typeColor,
      sizeStyl
    }
  }
})
</script>
