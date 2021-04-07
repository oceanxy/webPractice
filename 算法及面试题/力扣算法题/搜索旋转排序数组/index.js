/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const search = function(nums, target) {
  let start = 0
  let end = nums.length - 1
  let mid

  // 检测数组长度
  while (start <= end) {
    mid = start + ((end - start) >> 1)
    // 二分查找边界条件
    if (nums[mid] === target) return mid

    // 若 [start, mid]是有序数组
    if (nums[start] <= nums[mid]) {
      // 若target在nums[start]和nums[mid]之间
      if (nums[start] <= target && nums[mid] > target) {
        end = mid - 1
      } else {
        // target不在nums[start]和nums[mid]之间
        start = mid + 1
      }
    } else {
      // 否则[mid, end]是有序数组
      if (nums[mid] < target && nums[end] >= target) {
        // target在nums[mid]和nums[end]之间
        start = mid + 1
      } else {
        // target不在nums[mid]和nums[end]之间
        end = mid - 1
      }
    }
  }

  return -1
}

console.log(search([4, 5, 6, 7, 0, 1, 2], 0)) // 4
