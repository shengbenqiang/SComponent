<template>
  <SButton
    type="danger"
    plain
  >
    测试按钮
  </SButton>
</template>

<script>
import SButton from '@/components/SButton/SButton'

export default {
  name: 'App',
  components: {
    SButton
  },
  data () {
    return {
      mySty: {
        width: '20px',
        height: '20px'
      }
    }
  }
}
</script>

<style>
html, body{
  margin: 0;
  padding: 10px;
  font-size: 10px;
}
</style>
