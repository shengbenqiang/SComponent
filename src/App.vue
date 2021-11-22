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
    max-length="10"
    @blur="handleBlur"
  >
    <template #rightAppend>
      <SButton @click="clickTest" :icon="leftImg" :style-obj="testBtnSty"></SButton>
    </template>
  </SInput>
  <br>
  <SInputNumber />
</template>

<script>
import SButton from '@/components/SButton/SButton'
import SInput from '@/components/SInput/SInput'
import SInputNumber from '@/components/SInputNumber/SInputNumber'

export default {
  name: 'App',
  components: {
    SButton,
    SInput,
    SInputNumber
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
      myInput: '',
      leftImg: require('./assets/comIcon/inoutSearch.png'),
      rightImg: require('./assets/comIcon/inputCalendar.png'),
      testBtnSty: {
        backgroundColor: '#F4F6F9',
        border: 'none',
        width: '40px'
      }
    }
  },
  methods: {
    clickTest () {
      console.log('测试一下')
    },
    handleBlur (e) {
      console.log(e)
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
