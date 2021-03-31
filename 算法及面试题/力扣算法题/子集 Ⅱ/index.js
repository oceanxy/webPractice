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
    count[num] ? count[num]++ : 1
    // 区别于 上一题“子集”，这里需要去重
    // 去重思想：
    // 检测当前num是否在之前出现过，如出现过，分两种情况：
    //    1、 num已经与当时的arr数组每一项结合过，所以本次不再把这一部分结合过的arr子项再次与num结合，达到去重目的
    //     （假设num首次出现时的索引为i，则nums[0]到nums[i]的所有元素都与num结合一次了）
    //    2、 num出现时的索引为i，从nums[i]到nums[目前的索引]，所有遍历到的nums数组元素都会与num结合一次，所以这部分元素也不再与num结合
    // 结合1、2综合来看，目前的num只能与目前遍历到的所有nums元素组成的数组结合，即[nums[0], nums[1], ... , nums[i-1], nums[i]]
    // 因为 nums[i] = num, 所以 [nums[0], nums[1], ... , nums[i-1], num]，
    // 根据以上规律，可以得出 [nums[0], nums[1], ... , nums[i-1], num] 就是 当前arr数组的最后一项，即 arr[arr.length - 1]
    // 另外，因为当前nums[i]（num）不与arr每一项结合，还漏掉了一种可能，就是num与之前出现的相同数字的结合，
    // 即 [num, num],
    // 还要考虑到出现相同数字以后，继续遍历，后面还有可能再次出现相同的数字，
    // 所以不能单纯的把鱼自身的结合记为 [num, num]，
    // 应该为 new Array[到目前为止num出现的次数].fill(num)，即 new Array[count[num]].fill(num)
    // 总结，若出现重复数字，只需添加两项即可：
    //    arr = [...arr, new Array[count[num]].fill(num), arr[arr.length - 1]]

    // nums中的当前值与已得到的子级的副本的每一项结合，得到新的子集，然后将新子集与当前子集合并即为当前值
    arr = arr.concat(arr.map(subArr => {
      return [...subArr, num]
    }))
  })

  return arr
}

console.log(subsetsWithDup([1, 3, 2, 2, 2]))
