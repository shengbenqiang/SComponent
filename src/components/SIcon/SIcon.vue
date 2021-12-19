<template>
  <FontAwesomeIcon :icon="[iconType, iconString]" />
</template>

<script>
import { defineComponent } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { far } from '@fortawesome/free-regular-svg-icons'

export default defineComponent({
  name: 'SIcon',
  components: {
    FontAwesomeIcon
  },
  props: {
    iconType: {
      type: String,
      default: '',
      require: true
    },
    iconString: {
      type: String,
      default: '',
      require: true
    }
  },
  setup () {
    library.add(far)
  }
})
</script>
