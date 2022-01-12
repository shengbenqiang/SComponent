<template>
  <div
    :class="[
      's-tabs-con',
      type && type === 'border-card' ? 's-tabs-border-card-shadow' : '',
      tabPosition !== 'top' ? `s-tab-${tabPosition}` : ''
    ]"
  >
    <div
      v-if="tabPosition === 'left' || tabPosition === 'top'"
      :class="[
        's-tabs-header-con',
        type && type === 'border-card' ? `s-tabs-header-margin-none s-tabs-header-${tabPosition}-border` : tabPosition !== 'top' ? `s-tab-header-${tabPosition}-margin` : 's-tabs-header-margin',
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
        's-tabs-pane-con',
        type && type === 'border-card' ? 's-tabs-border-card-bg' : 's-tabs-common-bg'
      ]"
    >
      <slot />
    </div>
    <div
      v-if="tabPosition === 'right' || tabPosition === 'bottom'"
      :class="[
        's-tabs-header-con',
        type && type === 'border-card' ? `s-tabs-header-margin-none  s-tabs-header-${tabPosition}-border` : tabPosition !== 'top' ? `s-tab-header-${tabPosition}-margin` : 's-tabs-header-margin',
      ]"
    >
      <s-tab-nav
        v-model="navArr"
        @changeNav="handleTabClick"
      />
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
    },
    type: {
      type: String,
      default: ''
    },
    tabPosition: {
      type: String,
      default: 'top'
    }
  },
  components: {
    STabNav
  },
  setup (props, { emit }) {
    const tabsPane = ref(null)
    const navArr = reactive([])
    const slotArr = ref([])

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

    const getTabPaneInstance = (node) => {
      const tempObj = {}
      if (node.slots.label) {
        tempObj.props = node.props
        tempObj.slots = node.slots
        slotArr.value.push(tempObj)
      }
    }

    const handleTabClick = (navName, event) => {
      emit('update:modelValue', navName)
      emit('tab-click', navName, event)
    }

    provide('tabsValue', {
      ...toRefs(props),
      slotArr
    })

    provide('tabPaneValue', {
      getTabPaneInstance
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
