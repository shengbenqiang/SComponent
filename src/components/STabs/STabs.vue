<template>
  <div
    :class="[
      's-tabs-con'
    ]"
  >
    <div
      :class="[
        's-tabs-header-con'
      ]"
    >
      <s-tab-nav
        v-model="navArr"
        @changeNav="handleTabClick"
      />
    </div>
    <div
      ref="tabsPane"
      :class="[
        's-tabs-pane-con'
      ]"
    >
      <slot />
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, onUpdated, provide, reactive, ref, toRefs } from 'vue'
import './STabs.css'
import STabNav from './STabNav'

export default defineComponent({
  name: 'STabs',
  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },
  components: {
    STabNav
  },
  setup (props, { emit }) {
    const tabsPane = ref(null)
    const navArr = reactive([])

    const getPaneName = () => {
      const childNodes = tabsPane.value.children
      navArr.splice(0, navArr.length)
      Object.keys(childNodes).forEach(key => {
        const propsObj = childNodes[key].__vnode.ref.i.props
        const tempObj = {
          name: propsObj.name,
          label: propsObj.label
        }
        navArr.push(tempObj)
      })
    }

    const handleTabClick = (navName) => {
      emit('update:modelValue', navName)
      emit('tab-click', navName)
    }

    provide('tabsValue', {
      ...toRefs(props)
    })

    onMounted(() => {
      getPaneName()
    })

    onUpdated(() => {
      getPaneName()
    })

    return {
      navArr,
      tabsPane,
      handleTabClick
    }
  }
})
</script>
