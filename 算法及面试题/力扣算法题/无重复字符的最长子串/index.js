/**
 * @param {string} s
 * @return {number}
 */
const lengthOfLongestSubstring = function(s) {
  // let currentStr = ''
  // let maxStr = ''
  // let count = {}
  // let currentChar = ''
  //
  // for (let i = 0; i < s.length; i++) {
  //   currentChar = s.charAt(i)
  //
  //   // 不重复，直接累加
  //   if (!count[currentChar]) {
  //     count[currentChar] = (count[currentChar] ?? 0) + 1
  //     currentStr += currentChar
  //
  //     if (currentStr.length > maxStr.length) {
  //       maxStr = currentStr
  //     }
  //   } else {
  //     // 发现重复，处理重复
  //     count = {}
  //     currentStr = currentStr.slice(currentStr.lastIndexOf(currentChar) + 1) + currentChar
  //     currentStr.split('').forEach(str => {
  //       count[str] = 1
  //     })
  //   }
  // }
  //
  // return maxStr.length

  // 滑动窗口初始化为一个空数组
  let arr = [];
  // 要返回的字符串的长度
  let max = 0;
  for (let i = 0; i < s.length; i++) {
    // 使用 indexOf 判断是否在数组中出现过
    let index = arr.indexOf(s[i])
    // 如果出现过
    if (index !== -1) {
      // 从数组开头到当前字符串全部截取掉
      arr.splice(0, index + 1);
    }
    // 在窗口右边放进新的字符
    arr.push(s.charAt(i));
    // 更新下最大值
    max = Math.max(arr.length, max);
  }
  // 返回
  return max;
}

console.log(lengthOfLongestSubstring('pwwkew')) // 3, 'wke'
console.log(lengthOfLongestSubstring('tmmzuxt')) // 3, 'mzuxt'
