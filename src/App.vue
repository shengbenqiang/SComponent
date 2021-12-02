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
  <br>
  <div>单选框按钮组</div>
  <br>
  <!-- medium -->
  <s-radio-group v-model="radioButtonGroup" size="small">
    <s-radio-button label="New York"></s-radio-button>
    <s-radio-button label="Washington"></s-radio-button>
    <s-radio-button label="Los Angeles"></s-radio-button>
    <s-radio-button label="Chicago"></s-radio-button>
  </s-radio-group>
  <br>
  <div>滑块</div>
  <br>
<!--  in-active-text="否"-->
<!--  active-text="是"-->
  <s-switch
    v-model="switchValue"
    active-color="#13ce66"
    in-active-color="#ff4949"
    in-active-icon="fa-times"
    active-icon="fa-check"
    active-value="100"
    in-active-value="0"
    @change="appSwitch"
  />
  <br>
  <div>多选框</div>
  <br>
  <!-- medium / small / mini -->
  <SCheckbox
    v-model="checkValue"
    label="Option1"
    true-label="100"
    false-label="0"
    border
    size="medium"
  />
  <br>
  <div style="margin-top: 15px">复选框组</div>
  <br>
  <SCheckboxGroup disabled @change="appChange" v-model="checkedGroupArr">
    <s-checkbox label="Option A" />
    <s-checkbox label="Option B" />
    <s-checkbox label="Option C" />
  </SCheckboxGroup>
</template>

<script>
import SButton from '@/components/SButton/SButton'
import SInput from '@/components/SInput/SInput'
import SInputNumber from '@/components/SInputNumber/SInputNumber'
import SRadio from '@/components/SRadio/SRadio'
import SRadioGroup from '@/components/SRadioGroup/SRadioGroup'
import SRadioButton from '@/components/SRadioButton/SRadioButton'
import SSwitch from '@/components/SSwitch/SSwitch'
import SCheckbox from '@/components/SCheckbox/SCheckbox'
import SCheckboxGroup from '@/components/SCheckboxGroup/SCheckboxGroup'

export default {
  name: 'App',
  components: {
    SButton,
    SInput,
    SInputNumber,
    SRadio,
    SRadioGroup,
    SRadioButton,
    SSwitch,
    SCheckbox,
    SCheckboxGroup
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
    },
    checkValue: {
      handler (val) {
        console.log(val)
      },
      deep: true
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
      radioGroup1: '2',
      radioButtonGroup: 'New York',
      switchValue: '100',
      checkValue: '100',
      checkedGroupArr: ['Option A']
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
    },
    appSwitch (val) {
      console.log(val)
    },
    appHandelCheck (val) {
      console.log(val)
    },
    appChange (val) {
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
