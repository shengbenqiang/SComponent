<template>
  <div>按钮</div>
  <br>
  <s-button
    type="danger"
    plain
  >
    测试按钮
  </s-button>
  <br>
  <div>输入框</div>
  <br>
  <s-input
    placeholder="Please input"
    v-model="myInput"
    max-length="10"
    @blur="handleBlur"
  >
    <template #rightAppend>
      <SButton @click="clickTest" :icon="leftImg" :style-obj="testBtnSty"></SButton>
    </template>
  </s-input>
  <br>
  <div>数字输入框</div>
  <br>
  <s-input-number
    v-model="myInputNum"
    :min="1"
    :max="10"
    show-way="right"
  />
  <br>
  <div>单选框</div>
  <br>
  <!-- medium -->
  <SRadio
    v-model="radio1"
    label="1"
    size="small"
    border
    @change="changeRadio"
  >
    Option 1
  </SRadio>
  <br>
  <SRadio
    v-model="radio1"
    label="2"
    border
    size="small"
  >
    Option 2
  </SRadio>
  <br>
  <div>单选框组</div>
  <br>
  <SRadioGroup v-model="radioGroup1">
    <s-radio size="small" label="1">选项1</s-radio>
    <s-radio size="small" label="2">选项2</s-radio>
    <s-radio size="small" label="3">选项3</s-radio>
  </SRadioGroup>
</template>

<script>
import SButton from '@/components/SButton/SButton'
import SInput from '@/components/SInput/SInput'
import SInputNumber from '@/components/SInputNumber/SInputNumber'
import SRadio from '@/components/SRadio/SRadio'
import SRadioGroup from '@/components/SRadioGroup/SRadioGroup'

export default {
  name: 'App',
  components: {
    SButton,
    SInput,
    SInputNumber,
    SRadio,
    SRadioGroup
  },
  watch: {
    myInput: {
      handler (val) {
        console.log(val)
      }
    },
    myInputNum: {
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
      },
      myInputNum: 0,
      maxNumber: 10,
      minNumber: 0,
      radio1: '1',
      radioGroup1: '1'
    }
  },
  methods: {
    clickTest () {
      console.log('测试一下')
    },
    handleBlur (e) {
      console.log(e)
    },
    changeRadio (val) {
      console.log(val)
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
