/**
 * 凑成总金额所需最小硬币数
 * @param coins {number[]} 硬币面额
 * @param amount {number} 总金额
 * @return {number} 最小硬币数量
 */
function minNumberOfCoins(coins, amount) {
  // dp状态和选择
  // 状态 需要凑齐的总金额 可选择的硬币

  // dp[amount] 凑齐amount需要的最小硬币个数
  // amount-coins[i] 总金额amount减去一枚硬币后的剩余金额
  // dp[amount-coins[i]] 总金额amount减去一枚硬币后的剩余金额需要的硬币个数
  // min(dp[amount-coins[i]]) 总金额amount减去一枚硬币后的剩余金额需要的最小硬币个数
  // min(dp[amount-coins[i]]) + 1 总金额amount减去一枚硬币后的剩余金额需要的最小硬币个数 加上 减去的一枚硬币

  // 得出状态转移方程
  // dp[amount] = dp[amount - coins[i]] + 1

  const dp = new Array(amount + 1).fill(0)

  for (let i = 1; i <= amount; i++) {
    dp[i] = Math.min(...coins.map(coin => i >= coin ? dp[i - coin] : Infinity)) + 1
  }

  if (dp[amount] === Infinity) return -1
  return dp[amount]
}

const coins = [1, 2, 5], amount = 11
console.log(minNumberOfCoins(coins, amount)) // 11

const coins2 = [2], amount2 = 3
console.log(minNumberOfCoins(coins2, amount2)) // -1
