/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
const findMedianSortedArrays = function(nums1, nums2) {
  const nums = [].concat(nums1, nums2).sort((a, b) => a - b)
  const mid = nums.length >> 1

  if (nums.length % 2 === 0) {
    return (nums[mid - 1] + nums[mid]) / 2
  } else {
    return nums[mid]
  }
}

console.log(findMedianSortedArrays([1, 2], [3])) // 2
