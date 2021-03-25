/**
 * @param {number[]} nums
 * @return {number}
 */
const maxSubArray = function(nums) {
  // 要子数组的和最大，子数组首尾一定为正数
  // dp[i] 表示以索引i为结尾的子数组的和为最大值，
  // dp[0] = nums[0]
  // 如果dp[i-1] > 0，dp[i] = [i-1] + nums[i]
  // 如果dp[i-1] <= 0, 负数加任何数肯定总值会减少，本题求最大值，所以连续子数组中断，从dp[i]从num[i]从新计算，最后取dp数组的最大值即可，dp[i] = nums[i]
  // 状态转移方程，dp[i] = max(dp[i-1]+nums[i], nums[i])

  const dp = [nums[0], ...new Array(nums.length - 1)]

  for (let i = 1; i < nums.length; i++) {
    dp[i] = Math.max(dp[i - 1] + nums[i], nums[i])
  }

  return Math.max(...dp)
}

console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])) // 6
