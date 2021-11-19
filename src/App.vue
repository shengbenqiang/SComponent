<template>
  <SButton
    type="danger"
    plain
  >
    测试按钮
  </SButton>
  <br>
  <SInput
    placeholder="Please input"
    v-model="myInput"
    :right-icon="rightImg"
    max-length="10"
  >
    <template #leftAppend>你好啊</template>
    <template #rightAppend>我很好</template>
  </SInput>
</template>

<script>
import SButton from '@/components/SButton/SButton'
import SInput from '@/components/SInput/SInput'

export default {
  name: 'App',
  components: {
    SButton,
    SInput
  },
  watch: {
    myInput: {
      handler (val) {
        console.log(val)
      }
    }
  },
  data () {
    return {
      mySty: {
        width: '20px',
        height: '20px'
      },
      myInput: '你好啊',
      leftImg: require('./assets/comIcon/inoutSearch.png'),
      rightImg: require('./assets/comIcon/inputCalendar.png')
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
