<template>
  <i
    :class="['iconfont', icon]"
    :style="{
      fontSize: size + 'px'
    }"
  />
</template>

<script>
import { defineComponent } from 'vue'
import '@/assets/icon/iconfont.css'

export default defineComponent({
  name: 'SIcon',
  props: {
    icon: {
      type: String,
      require: true
    },
    size: {
      type: Number,
      default: 13
    }
  }
})
</script>
