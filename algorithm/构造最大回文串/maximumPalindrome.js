/**
 * @param {string} s
 * @return {number}
 */
const longestPalindrome = function(s) {
  const o = {};

  for(let i = 0; i < s.length; i++) {
    if(o[s[i]]) {
      o[s[i]] += 1;
    } else {
      o[s[i]] = 1;
    }
  }

  const countArr = Object.values(o); // 获取出现次数数组
  let flag = false; // 最大奇数是否已计算

  let length = 0;
  for(let k = 0; k < countArr.length; k++) {
    if(!(countArr[k] % 2)) {
      length += countArr[k];
    } else {
      if(!flag) { // 如果出现奇数且首次出现，则累加，则往后的奇数在累加时都减去1
        flag = true;
        length += countArr[k];
      } else {
        length += countArr[k] - 1;
      }
    }
  }

  return length;
};

const result = longestPalindrome('jhgfiujjf');
console.log(result === 5);