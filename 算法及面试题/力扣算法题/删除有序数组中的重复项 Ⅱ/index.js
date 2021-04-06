/**
 * @param {number[]} nums
 * @return {number}
 */
const removeDuplicates = function(nums) {
  for (let i = nums.length - 2; i >= 1; i--) {
    if (nums[i] === nums[i - 1] && nums[i] === nums[i + 1]) {
      nums.splice(i + 1, 1)
    }
  }

  return nums.length
}

console.log(removeDuplicates([1, 1, 1, 2, 2, 3])) // 5, [1,1,2,2,3]
