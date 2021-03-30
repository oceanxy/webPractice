/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
const searchMatrix = function(matrix, target) {
  // 1 原生方法
  return matrix.flat().includes(target)

  // 2 二分查找

  // 3 双指针
}

console.log(searchMatrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]], 1))

