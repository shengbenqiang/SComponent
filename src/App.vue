<template>
  <div>按钮</div>
  <br>
  <s-button
    type="danger"
    plain
    icon="icon-usercenter"
  >
    测试按钮
  </s-button>
  <br>
  <s-button
    plain
  >
    普通按钮
  </s-button>
  <br>
  <div>输入框</div>
  <br>
  <s-input
    placeholder="Please input"
    v-model="myInput"
    max-length="10"
    @blur="handleBlur"
    left-icon="icon-user1"
    right-icon="icon-RectangleCopy43"
  >
  </s-input>
  <br>
  <div>数字输入框</div>
  <br>
  <!-- show-way="right" -->
  <s-input-number
    v-model="myInputNum"
    :min="1"
    :max="10"
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
    in-active-icon="icon-close"
    active-icon="icon-select"
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
  <SCheckboxGroup @change="appChange" :min="1" :max="2" v-model="checkedGroupArr">
    <s-checkbox label="Option A" />
    <s-checkbox label="Option B" />
    <s-checkbox label="Option C" />
  </SCheckboxGroup>
  <br>
  <div style="margin-top: 15px">复选框按钮</div>
  <br>
  <s-checkbox-group v-model="checkButton" @change="changeButton" size="small">
    <s-check-button label="Option A" true-label="100" false-label="0"/>
    <s-check-button label="Option B" disabled/>
    <s-check-button label="Option C" />
    <s-check-button label="Option D" />
  </s-checkbox-group>
  <br>
  <div style="margin-top: 15px">泡泡组件</div>
  <br>
  <s-popper placement="top" content="60%">
    <div>测试的泡泡组件1</div>
  </s-popper>
  <div style="margin-top: 15px"></div>
  <s-popper placement="right" effect="light" :visible="true" content="你好啊，美女">
    测试的泡泡组件2
  </s-popper>
  <br>
  <div style="margin-top: 15px">选择器组件</div>
  <br>
  <!-- large/medium/small/mini disabled-->
  <s-select
    size="medium"
    v-model="optionValue"
    clearable
  >
    <s-option label="北京" value="1" disabled/>
    <s-option label="南京" value="2"/>
    <s-option label="杭州" value="3"/>
    <s-option label="成都" value="4"/>
    <s-option label="西安" value="5"/>
  </s-select>
  <br>
  <div style="margin-top: 15px">选择器复杂功能测试1</div>
  <br>
  <s-select
    v-model="groupValue"
    @change="optionChange"
  >
    <s-option-group
      v-for="item in optionGroupData"
      :key="item.label"
      :label="item.label"
      :disabled="item.dis"
    >
      <s-option
        v-for="option in item.options"
        :key="option.value"
        :label="option.label"
        :value="option.value"
      ></s-option>
    </s-option-group>
  </s-select>
  <br>
  <div style="margin-top: 15px">选择器复杂功能测试2</div>
  <br>
  <s-select
    filterable
    v-model="filterValue"
  >
    <s-option
      v-for="option in filterOptionArr"
      :key="option.value"
      :label="option.label"
      :value="option.value"
    ></s-option>
  </s-select>
  <br>
  <div style="margin-top: 15px">tag 组件</div>
  <br>
  <s-tag closable>tag 1</s-tag>
  &nbsp;
  <s-tag type="success" effect="dark" closable>tag 2</s-tag>
  &nbsp;
  <s-tag type="info" effect="plain" closable>tag 3</s-tag>
  &nbsp;
  <s-tag type="warning" color="#E6433C">tag 4</s-tag>
  &nbsp;
  <s-tag type="danger" size="mini">tag 5</s-tag>
  <br>
  <div style="margin-top: 15px">选择器复杂功能测试3</div>
  <br>
  <s-select
    v-model="multipleArr"
    multiple
  >
    <s-option
      v-for="option in filterOptionArr"
      :key="option.value"
      :label="option.label"
      :value="option.value"
    ></s-option>
  </s-select>
  <br>
  <div style="margin-top: 15px">可选中的标签</div>
  <br>
  <s-check-tag
    @change="onChange"
    :checked="checked"
  >
    SCheckTag
  </s-check-tag>
  <br>
  <div style="margin-top: 15px">滑块</div>
  <br>
  <!-- disabled :format-tooltip="true"-->
  <s-slider
    v-model="sliderNum"
    :show-tooltip="true"
  />
  <br>
  <div style="margin-top: 15px">滑块高级属性</div>
  <br>
  <s-slider
    v-model="sliderTo"
    :step="10"
    show-stops
  />
  <br>
  <div style="margin-top: 15px">滑块高级属性</div>
  <br>
  <s-slider
    v-model="sliderThree"
    show-input
    :step="10"
    :mini="1"
    :max="200"
  />
  <br>
  <div>滑块高级属性</div>
  <br>
  <s-slider
    v-model="sliderFour"
    show-stops
    :max="10"
    range
  />
  <br>
  <div>提示</div>
  <br>
  <s-alter title="提示" show-icon description="这是我自己随便写的介绍内容"></s-alter>
  <br>
  <s-alter title="提示" type="success" show-icon description="这是我自己随便写的介绍内容"></s-alter>
  <br>
  <s-alter title="提示" type="warning" show-icon center></s-alter>
  <br>
  <s-alter title="提示" type="error" show-icon></s-alter>
  <br>
  <s-alter title="提示" effect="dark" closable show-icon></s-alter>
  <br>
  <s-alter title="提示" type="success" effect="dark" closable show-icon></s-alter>
  <br>
  <s-alter title="提示" type="warning" effect="dark"  close-text="关闭" show-icon></s-alter>
  <br>
  <s-alter title="提示" type="error" effect="dark" closable show-icon></s-alter>
  <br>
  <div>分割线</div>
  <br>
  <div>
    <span
    >I sit at my window this morning where the world like a passer-by stops
      for a moment, nods to me and goes.</span
    >
    <s-divider border-exhibit="dashed" content-position="center">Rabindranath Tagore</s-divider>
    <span
    >There little thoughts are the rustle of leaves; they have their whisper
      of joy in my mind.</span
    >
  </div>
  <br>
  <div>
    <span>Rain</span>
    <s-divider direction="vertical" border-exhibit="dashed"></s-divider>
    <span>Home</span>
    <s-divider direction="vertical"></s-divider>
    <span>Grass</span>
  </div>
  <br>
  <div>卡片</div>
  <br>
  <s-card shadow="never">
    你好啊
  </s-card>
  <br>
  <div>标签页</div>
  <br>
  <s-tabs v-model="activeName">
    <s-tab-pane label="User" name="first">User</s-tab-pane>
    <s-tab-pane label="Config" name="second">Config</s-tab-pane>
    <s-tab-pane label="Role" name="third">Role</s-tab-pane>
    <s-tab-pane label="Task" name="fourth">Task</s-tab-pane>
  </s-tabs>
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
import SCheckButton from '@/components/SCheckButton/SCheckButton'
import SPopper from '@/components/SPopper/SPopper'
import SSelect from '@/components/SSelect/SSelect'
import SOption from '@/components/SOption/SOption'
import SOptionGroup from '@/components/SOptionGroup/SOptionGroup'
import STag from '@/components/STag/STag'
import SCheckTag from '@/components/SCheckTag/SCheckTag'
import SSlider from '@/components/SSlider/SSlider'
import SAlter from '@/components/SAlter/SAlter'
import SDivider from '@/components/SDivider/SDivider'
import SCard from '@/components/SCard/SCard'
import STabs from '@/components/STabs/STabs'
import STabPane from '@/components/STabs/STabPane'

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
    SCheckboxGroup,
    SCheckButton,
    SPopper,
    SSelect,
    SOption,
    SOptionGroup,
    STag,
    SCheckTag,
    SSlider,
    SAlter,
    SDivider,
    SCard,
    STabs,
    STabPane
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
    // sliderNum: {
    //   handler (val) {
    //     console.log(val)
    //   }
    // }
  },
  data () {
    return {
      activeName: 'first',
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
      checkedGroupArr: ['Option A'],
      checkButton: ['100'],
      optionValue: '2',
      diffOption: '',
      optionGroupData: [
        {
          label: 'Popular cities',
          dis: true,
          options: [
            {
              value: 'Shanghai',
              label: 'Shanghai'
            },
            {
              value: 'Beijing',
              label: 'Beijing'
            }
          ]
        },
        {
          label: 'City name',
          dis: false,
          options: [
            {
              value: 'Chengdu',
              label: 'Chengdu'
            },
            {
              value: 'Shenzhen',
              label: 'Shenzhen'
            },
            {
              value: 'Guangzhou',
              label: 'Guangzhou'
            },
            {
              value: 'Dalian',
              label: 'Dalian'
            }
          ]
        }
      ],
      filterOptionArr: [
        {
          value: 'Chengdu',
          label: 'Chengdu'
        },
        {
          value: 'Shenzhen',
          label: 'Shenzhen'
        },
        {
          value: 'Guangzhou',
          label: 'Guangzhou'
        },
        {
          value: 'Dalian',
          label: 'Dalian'
        },
        {
          value: 'Heifer',
          label: 'Heifer'
        },
        {
          value: 'Beijing',
          label: 'Beijing'
        },
        {
          value: 'Nanjing',
          label: 'Nanjing'
        },
        {
          value: 'Xian',
          label: 'Xian'
        }
      ],
      filterValue: '',
      groupValue: '',
      multipleArr: [],
      checked: false,
      sliderNum: 20,
      sliderTo: 30,
      sliderThree: 10,
      sliderFour: [4, 8]
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
    },
    changeButton (val) {
      console.log(val)
    },
    filterChange (val) {
      console.log(val)
    },
    changeMore (val) {
      console.log(val)
    },
    optionChange (val) {
      console.log(val)
    },
    onChange (checked) {
      this.checked = checked
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
body {
  overflow-x: hidden;
  overflow-y: scroll;
  height: 3000px;
}
body::-webkit-scrollbar {
  display: none;
}
.testCard {
  width: 300px;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
</style>
