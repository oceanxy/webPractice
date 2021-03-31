/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const subsets = function(nums) {
  if (!Array.isArray(nums)) return nums

  let arr = [[]]

  if (nums.length < 1) return arr

  // 依次遍历传入数组中的元素
  nums.forEach(num => {

    // nums中的当前值与已得到的子级的副本的每一项结合，得到新的子集，然后将新子集与当前子集合并即为当前值
    arr = arr.concat(arr.map(subArr => {
      return [...subArr, num]
    }))
  })

  return arr
}

console.log(subsets([1, 2, 3])) // [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]
