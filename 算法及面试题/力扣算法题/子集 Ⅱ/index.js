/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const subsetsWithDup = function(nums) {
  if (!Array.isArray(nums)) return nums

  // 当前已得到的子集（已去重）
  let arr = [[]]
  // 缓存每个数字出现次数
  let count = {}

  if (nums.length < 1) return arr

  // 依次遍历传入数组中的元素
  nums.forEach((num, i) => {
    count[num] = count[num] ? count[num] + 1 : 1

    // nums中的当前值与已得到的子级的副本的每一项结合，得到新的子集，然后将新子集与当前子集合并即为当前值
    let mixed = []
    for (let i = 0; i < arr.length; i++) {
      // 根据解题思路得到如下代码
      // if (count[num] > 1 && arr[i].filter(value => value === num).length !== count[num] - 1) {
      //   continue
      // }
      //
      // mixed.push([...arr[i], num])

      // 优化后代码
      if (count[num] <= 1 || arr[i].filter(value => value === num).length === count[num] - 1) {
        mixed.push([...arr[i], num])
      }
    }

    arr = arr.concat(mixed)
  })

  return arr
}

console.log(subsetsWithDup([1, 2, 3, 2]))
