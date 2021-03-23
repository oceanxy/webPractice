/**
 * 凑成总金额所需最小硬币数
 * @param coins {number[]} 硬币面额
 * @param amount {number} 总金额
 * @return {number} 最小硬币数量
 */
function minNumberOfCoins(coins, amount) {
  // dp状态和选择
  // 状态 需要凑齐的总金额 可选择的硬币

  // amount-coins[i] 总金额amount减去一枚硬币后的剩余金额
  // 假设 dp[amount] 为凑齐amount需要的最小硬币个数
  // dp[amount-coins[i]] 总金额amount减去一枚硬币后的剩余金额需要的硬币个数
  // min(dp[amount-coins[i]]) 总金额amount减去一枚硬币后的剩余金额需要的最小硬币个数
  // min(dp[amount-coins[i]]) + 1 总金额amount减去一枚硬币后的剩余金额需要的最小硬币个数 + 减去的一枚硬币 = 凑成总金额amount所需最小硬币数

  // 得出状态转移方程
  // dp[amount] = min(dp[amount - coins[i]]) + 1

  // 创建一个数组来保存凑齐每种金额所需最小硬币数，根据最优子结构依次往上递推，数组最后一位则为正解
  const dp = new Array(amount + 1).fill(0)

  // 从1开始遍历是因为 dp[0] = 0，凑齐总金额0最小需要0枚金币
  for (let i = 1; i <= amount; i++) {
    // 用当前金额和coins内每一枚硬币比较，若硬币面额大于当前金额，则表示当前硬币不能凑零钱
    // 因为本题是求最小值，所以这里用一个正无穷来标识无解的情况
    dp[i] = Math.min(...coins.map(coin => i >= coin ? dp[i - coin] : Infinity)) + 1
  }

  if (dp[amount] === Infinity) return -1
  return dp[amount]
}

/**
 * 凑成总金额所需最少的硬币由哪些面值组成
 * @param coins {number[]} 硬币面额
 * @param amount {number} 总金额
 * @return {Array} 组成总金额所需最小硬币数量的面值集合
 */
function minNumberOfCoinDenominations(coins, amount) {
  const dp = new Array(amount + 1).fill(0)
  const denominations = Array.from(new Array(amount + 1), () => [])

  for (let i = 1; i <= amount; i++) {
    // 求出每一种面值凑出总金额所需硬币数量
    const currentNumber = coins.map(coin => i >= coin ? dp[i - coin] + 1 : Infinity)
    // 求凑成总金额所需最小硬币数
    dp[i] = Math.min(...currentNumber)

    // 检测当前总金额能否由当前提供的金币所凑成
    if (dp[i] !== Infinity) {
      // 求凑成总金额i所需最小硬币数时的最后一枚硬币面值（在coin遍历时最小值出现的索引，根据这个索引从coins数组得到硬币面值）
      const currentDenomination = coins[currentNumber.indexOf(dp[i])]
      // 当前总金额减去最后一枚硬币的面值得出已缓存的总金额为 i - currentDenomination 时的面值数组，与上一步计算的最后一枚硬币面值合并,
      // 即得出组成当前总金额所需最小硬币数量的面值集合
      denominations[i] = [...denominations[i - currentDenomination], currentDenomination]
    }
  }

  return denominations[amount]
}

const coins = [1, 2, 5], amount = 13
console.log(minNumberOfCoins(coins, amount)) // 11
console.log(minNumberOfCoinDenominations(coins, amount)) // 11

const coins2 = [2], amount2 = 3
console.log(minNumberOfCoins(coins2, amount2)) // -1
console.log(minNumberOfCoinDenominations(coins2, amount2)) // -1
