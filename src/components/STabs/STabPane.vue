<template>
  <div
    ref="tabsPane"
    v-show="showPane"
    :class="[
      's-tab-pane-con'
    ]"
  >
    <slot />
  </div>
</template>

<script>
import { computed, defineComponent, inject, ref, getCurrentInstance, onMounted } from 'vue'
import './STabPane.css'

export default defineComponent({
  name: 'STabPane',
  props: {
    label: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const instance = getCurrentInstance()
    const tabsPane = ref(null)
    const tabValue = inject('tabsValue', undefined)
    const tabPaneValue = inject('tabPaneValue', undefined)
    const { modelValue } = tabValue

    const showPane = computed(() => {
      return props.name === modelValue.value
    })

    onMounted(() => {
      tabPaneValue.getTabPaneInstance(instance)
    })

    return {
      showPane,
      tabsPane
    }
  }
})
</script>
