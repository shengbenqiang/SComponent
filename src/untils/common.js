// 16进制颜色码转 rgb 颜色值
export const convertHexToRGB = str => {
  str = str[0] === '#' ? str.slice(1) : str
  str = str.length === 3 ? str.repeat(2) : str
  if ((str.length !== 6) || !(/^[0-9a-fA-F]{3,6}$/i.test(str))) return 'Invalid data'
  return [parseInt(str[0] + str[1], 16), parseInt(str[2] + str[3], 16), parseInt(str[4] + str[5], 16)]
}

export const isObj = date => {
  return Object.prototype.toString.call(date) === '[Object Object]'
}

export const isArr = date => {
  return Object.prototype.toString.call(date) === '[object Array]'
}
// 生成绝不重复的字符串
export const GenNonDuplicateID = (randomLength) => {
  return Number(Math.random().toString().substr(3, randomLength) + Date.now()).toString(36)
}

export const on = (eventName, eventFun) => {
  document.addEventListener(eventName, eventFun)
}

export const off = (eventName, eventFun) => {
  document.removeEventListener(eventName, eventFun)
}

export const IntegerForensics = (num, step) => {
  const numArr = (num / step).toString().split('.')
  if (num < 10) {
    if (num < step / 2) {
      return 0
    } else if (num >= step / 2) {
      return step
    }
  }
  if (num >= 10 && num < 100) {
    if (numArr[1] < step / 2) {
      return Number(numArr[0]) * step
    } else if (numArr[1] >= step / 2) {
      return (Number(numArr[0]) + 1) * step
    }
  }
  if (num >= 100) {
    if (numArr[1] < step / 2) {
      return Number(numArr[0]) * step
    } else if (numArr[1] >= step / 2) {
      return (Number(numArr[0]) + 1) * step
    }
  }
}

export const toIntNum = (num, limit) => {
  return Number(num.toFixed(limit))
}
