/**
 * 编写一个方法，该方法接收两个参数，分别为k和一个无序的纯数字数组。
 * 该方法在执行后，会返回数组中第k大的数字。
 * 特别注意，如果数组中，有两位数值一样的数字，同数值数字排名并列。
 * 如[3,1,3,2,5,4,5]中，第1大的数字为5，第2大的数字为4，第5大的数字为1
 */

/**
 * 获取无序数组内第K大数字
 * @param {number} k k值
 * @param {number[]} arr 无序纯数字数组
 * @return {number | null} 返回结果数字，如果k值无效，则返回null
 */
function specifyNumber(k, arr) {
  if (k <= 1) return null
  const newArr = [...new Set(arr)]
  const sortArr = newArr.sort((a, b) => b - a)

  return sortArr[k - 1]
}

console.log(specifyNumber(3, [5, 2, 1, 8, 8, 7, 0, 6, 6, 4, 5, 2])) // 6
