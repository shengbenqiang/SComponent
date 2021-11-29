// 16进制颜色码转 rgb 颜色值
export const convertHexToRGB = str => {
  str = str[0] === '#' ? str.slice(1) : str
  str = str.length === 3 ? str.repeat(2) : str
  if ((str.length !== 6) || !(/^[0-9a-fA-F]{3,6}$/i.test(str))) return 'Invalid data'
  return [parseInt(str[0] + str[1], 16), parseInt(str[2] + str[3], 16), parseInt(str[4] + str[5], 16)]
}
