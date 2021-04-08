/**
 * @param {number[]} nums
 * @return {number}
 */
const findMin = function(nums) {
  if (nums.length > 5000 || nums.length < 1) return -1

  let left = 0
  let right = nums.length - 1
  let mid

  while (left < right) {
    mid = left + ((right - left) >> 1)

    // 因为是升序排列，且数字不重复，所以只需比较中值和右值即可
    // 若中值小于右值，说明最小值在左半部分或就是中值本身，所以舍弃右半部分
    if (nums[mid] < nums[right]) {
      // 若最小值就是中值本身，避免过多循环，这里做一步额外检查
      // 若mid下标不是0，且中值小于其左侧值，则证明自身就是最小值
      if (mid >= 1 && nums[mid] < nums[mid - 1]) {
        return nums[mid]
      } else {
        // nums[mid]不是最小值，舍弃右半部分
        right = mid
      }
    } else if (nums[mid] === nums[right]) {
      // 如果中值等于右值，无法判断数组旋转情况，无法决定舍弃哪一部分，所以采取缩小边界的做法
      right-- // 也可以left++，既然本题是用右值和中值比较，避免重复操作，所以采取了缩小右侧边界的做法
    } else {
      // 若中值大于右值，说明最小值在右半部分，所以舍弃左半部分
      left = mid + 1
    }
  }

  return nums[left]
}

// console.log(findMin([2, 5, 6, 0, 0, 1, 2])) // 0
console.log(findMin([1, 3, 3])) // 1
