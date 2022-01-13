<template>
  <div
    :class="[
      !type ? tabPosition !== 'top' && tabPosition !== 'bottom' ? `s-tab-nav-${tabPosition}-con` : 's-tab-nav-con' : `s-tab-nav-${type}-con`,
      tabPosition !== 'top' && tabPosition !== 'bottom' ? `s-tab-nav-${tabPosition}` : ''
    ]"
  >
    <div
      v-for="itemNav in modelValue"
      :key="itemNav.name"
      :ref="getRefs"
      :dom-name="itemNav.name"
      :class="[
        !type ?
        tabPosition !== 'top' && tabPosition !== 'bottom' ? `s-tab-nav-${tabPosition}-item-con` : 's-tab-nav-item-con' :
        tabPosition === 'left' || tabPosition === 'right' ? `s-tab-nav-${type}-item-${tabPosition}-con` : `s-tab-nav-${type}-item-con`,
        type && isSelect === itemNav.name ?
        tabPosition === 'left' || tabPosition === 'right' ? `s-tab-nav-${type}-item-${tabPosition}-select` : `s-tab-nav-${type}-item-select` : ''
      ]"
      @mouseenter="handleNavEnter(itemNav.name)"
      @mouseleave="handleNavLeave"
      @click.prevent.stop="handleNavClick(itemNav.name)"
    >
      <span
        :class="[
          navEnter === itemNav.name ? 's-tab-nav-enter' : '',
          isSelect === itemNav.name ? 's-tab-nav-select' : ''
        ]"
      >
        <span v-if="!isShowDefault(itemNav)">{{ itemNav.label }}</span>
        <span v-else class="customNav" :dom-name="itemNav.name"></span>
      </span>
    </div>
    <s-tab-nav-bar v-if="!type" :bar-style="styleObj" :tab-position="tabPosition" />
  </div>
</template>

<script>
import { defineComponent, ref, inject, computed, onMounted, nextTick, watch, h, createApp } from 'vue'
import './STabNav.css'
import STabNavBar from './STabNavBar'

export default defineComponent({
  name: 'STabNav',
  props: {
    modelValue: {
      type: Array,
      default: () => ([])
    }
  },
  components: {
    STabNavBar
  },
  setup (props, { emit }) {
    const navEnter = ref(undefined)
    const refArr = ref([])
    const styleObj = ref({})
    const tabValue = inject('tabsValue', undefined)
    const { modelValue, type, tabPosition, slotArr } = tabValue

    const isSelect = computed(() => {
      return modelValue.value
    })

    const getRefs = async (el) => {
      await nextTick()
      let haveDom = false
      refArr.value.forEach(itemEl => {
        if (el === null) { return }
        if (itemEl.name === el.getAttribute('dom-name')) {
          haveDom = true
        }
      })
      if (!haveDom) {
        if (el === null) { return }
        refArr.value.push({
          name: el.getAttribute('dom-name'),
          el: el
        })
      }
    }

    const handleNavEnter = (itemKey) => {
      navEnter.value = itemKey
    }

    const handleNavLeave = () => {
      navEnter.value = ''
    }

    const handleNavClick = (navName) => {
      if (isSelect.value === navName) { return }
      emit('changeNav', navName)
    }

    const handleBarStyle = async (val) => {
      await nextTick()
      styleObj.value = {}
      let tranX = 0
      refArr.value.forEach(itemDom => {
        if (tabPosition.value === 'left' || tabPosition.value === 'right') {
          tranX = tranX + itemDom.el.clientHeight
          if (itemDom.name === val) {
            if (refArr.value[0].name === itemDom.name) {
              styleObj.value.height = `${itemDom.el.clientHeight}px`
              styleObj.value.transform = `translateY(${0}px)`
            } else {
              styleObj.value.height = `${itemDom.el.clientHeight}px`
              styleObj.value.transform = `translateY(${tranX - 40}px)`
            }
          }
        } else if (tabPosition.value === 'top' || tabPosition.value === 'bottom') {
          tranX = tranX + itemDom.el.clientWidth
          if (itemDom.name === val) {
            if (refArr.value[0].name === itemDom.name) {
              styleObj.value.width = `${itemDom.el.clientWidth - 20}px`
              styleObj.value.transform = `translateX(${0}px)`
            } else {
              styleObj.value.width = `${itemDom.el.clientWidth - 40}px`
              styleObj.value.transform = `translateX(${tranX - (itemDom.el.clientWidth - 20)}px)`
            }
          }
        }
      })
    }

    const isShowDefault = (navItem) => {
      let isHave = false
      slotArr.value.forEach(itemNode => {
        if (itemNode.props.name === navItem.name) {
          isHave = true
        }
      })
      return isHave
    }

    const solveSlot = () => {
      if (slotArr.value.length === 0) { return }
      slotArr.value.forEach(itemNode => {
        props.modelValue.forEach(navItem => {
          if (itemNode.props.name === navItem.name) {
            renderCustom(itemNode)
          }
        })
      })
    }

    const renderCustom = (itemNode) => {
      const { props, slots } = itemNode
      const domArr = document.getElementsByClassName('customNav')
      Object.keys(domArr).forEach(itemDom => {
        if (domArr[itemDom].getAttribute('dom-name') === props.name) {
          createApp({
            render () {
              return h('span', {}, slots.label())
            }
          }).mount(domArr[itemDom])
        }
      })
    }

    watch(modelValue, (val) => {
      handleBarStyle(val)
    })

    onMounted(async () => {
      await nextTick()
      solveSlot()
      await handleBarStyle(modelValue.value)
    })

    return {
      type,
      navEnter,
      isSelect,
      styleObj,
      tabPosition,
      getRefs,
      isShowDefault,
      handleNavEnter,
      handleNavLeave,
      handleNavClick
    }
  }
})
</script>
