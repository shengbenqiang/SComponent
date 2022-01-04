<template>
  <div
    :class="[
      's-alter-base-div',
      effect !== 'light' ? darkType : typeSty,
      center ? 's-alter-text-center' : ''
    ]"
  >
    <div
      :class="[
        's-alter-content'
      ]"
    >
      <div
        v-if="showIcon"
        :class="[
          's-alter-type-icon'
        ]"
      >
        <s-icon
          :icon="typeIcon"
          :size="16"
        />
      </div>
      {{ title ? title : '' }}
    </div>
    <div
      v-if="closable || closeText"
      :class="[
        's-alter-close-div'
      ]"
    >
      <s-icon
        v-if="closable"
        :class="[
        's-alter-icon-base'
      ]"
        icon="icon-close1"
        :size="6"
        @click="handleClose"
      />
      <div
        v-if="closeText"
        :class="[
          's-alter-close-text'
        ]"
        @click="handleClose"
      >
        {{ closeText }}
      </div>
    </div>
    <div
      v-if="description"
      :class="[
        's-alter-des-con'
      ]"
    >
      {{ description }}
    </div>
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue'
import './SAlter.css'
import SIcon from '@/components/SIcon/SIcon'

export default defineComponent({
  name: 'SAlter',
  props: {
    title: {
      type: String,
      default: ''
    },
    // success/warning/info/error
    type: {
      type: String,
      default: 'info'
    },
    // light / dark
    effect: {
      type: String,
      default: 'light'
    },
    closable: {
      type: Boolean,
      default: false
    },
    closeText: {
      type: String,
      default: ''
    },
    showIcon: {
      type: Boolean,
      default: false
    },
    center: {
      type: Boolean,
      default: false
    },
    description: {
      type: String,
      default: ''
    }
  },
  components: {
    SIcon
  },
  setup (props, { emit }) {
    const typeSty = computed(() => {
      return 's-alter-' + props.type + '-type'
    })

    const darkType = computed(() => {
      return 's-alter-' + props.effect + '-' + props.type + '-type'
    })

    const showIconBg = computed(() => {
      return 's-alter-' + props.type + '-icon-bg'
    })

    // eslint-disable-next-line vue/return-in-computed-property
    const typeIcon = computed(() => {
      if (props.effect === 'light') {
        switch (props.type) {
          case 'success':
            return 'icon-chenggong'
          case 'info':
            return 'icon-info'
          case 'warning':
            return 'icon-warning2'
          case 'error':
            return 'icon-a-cuowu1'
        }
      } else {
        switch (props.type) {
          case 'success':
            return 'icon-success2'
          case 'info':
            return 'icon-info1'
          case 'warning':
            return 'icon-gantanhao1'
          case 'error':
            return 'icon-cuowu1'
        }
      }
    })

    const handleClose = () => {
      emit('close')
    }

    return {
      typeSty,
      darkType,
      typeIcon,
      showIconBg,
      handleClose
    }
  }
})
</script>
