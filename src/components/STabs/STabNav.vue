<template>
  <div
    :class="[
      !type ? 's-tab-nav-con' : `s-tab-nav-${type}-con`
    ]"
  >
    <div
      v-for="itemNav in modelValue"
      :key="itemNav.name"
      :ref="getRefs"
      :dom-name="itemNav.name"
      :class="[
        !type ? 's-tab-nav-item-con' : `s-tab-nav-${type}-item-con`,
        type && isSelect === itemNav.name ? `s-tab-nav-${type}-item-select` : ''
      ]"
      @mouseenter="handleNavEnter(itemNav.name)"
      @mouseleave="handleNavLeave"
      @click.prevent.stop="handleNavClick(itemNav.name)"
    >
      <span
        :class="[
          navEnter === itemNav.name ? 's-tab-nav-enter' : '',
          isSelect === itemNav.name ? 's-tab-nav-select' : '',
        ]"
      >
        {{ itemNav.label }}
      </span>
    </div>
    <s-tab-nav-bar v-if="!type" :bar-style="styleObj" />
  </div>
</template>

<script>
import { defineComponent, ref, inject, computed, onMounted, nextTick, watch } from 'vue'
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
    const { modelValue, type } = tabValue

    const isSelect = computed(() => {
      return modelValue.value
    })

    const getRefs = (el) => {
      let haveDom = false
      refArr.value.forEach(itemEl => {
        if (itemEl.name === el.getAttribute('dom-name')) {
          haveDom = true
        }
      })
      if (!haveDom) {
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

    const handleBarStyle = (val) => {
      styleObj.value = {}
      let tranX = 0
      refArr.value.forEach(itemDom => {
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
      })
    }

    watch(modelValue, (val) => {
      handleBarStyle(val)
    })

    onMounted(async () => {
      await nextTick()
      console.log(type)
      handleBarStyle(modelValue.value)
    })

    return {
      type,
      navEnter,
      isSelect,
      styleObj,
      getRefs,
      handleNavEnter,
      handleNavLeave,
      handleNavClick
    }
  }
})
</script>
