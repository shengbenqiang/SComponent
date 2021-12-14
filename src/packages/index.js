import SButton from '../components/SButton/SButton'
import SCheckbox from '../components/SCheckbox/SCheckbox'
import SCheckboxGroup from '../components/SCheckboxGroup/SCheckboxGroup'
import SCheckButton from '../components/SCheckButton/SCheckButton'
import SInput from '../components/SInput/SInput'
import SInputNumber from '../components/SInputNumber/SInputNumber'
import SPopper from '../components/SPopper/SPopper'
import SRadio from '../components/SRadio/SRadio'
import SRadioButton from '../components/SRadioButton/SRadioButton'
import SRadioGroup from '../components/SRadioGroup/SRadioGroup'
import SSelect from '../components/SSelect/SSelect'
import SSwitch from '../components/SSwitch/SSwitch'

const components = [
  SInput,
  SButton,
  SCheckbox,
  SCheckboxGroup,
  SCheckButton,
  SInputNumber,
  SPopper,
  SRadio,
  SRadioButton,
  SRadioGroup,
  SSelect,
  SSwitch
]

const install = function (Vue) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })

  if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
  }
}

export default {
  install
}
