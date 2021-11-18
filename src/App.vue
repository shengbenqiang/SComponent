<template>
  <SButton
    type="danger"
    round
  >
    添加组件
  </SButton>
</template>

<script>
import SButton from '@/components/SButton/SButton'

export default {
  name: 'App',
  components: {
    SButton
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
