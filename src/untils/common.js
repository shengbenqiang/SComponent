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
