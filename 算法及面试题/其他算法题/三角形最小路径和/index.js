function sum(triangle) {
  // DP状态和选择
  // 以 dp[n][w] 表示已走路径和
  // 向左子节点移动或向右子节点移动
  // dp[n+1][w] 或 dp[n+1][w+1]

  // DP转移方程
  // dp[n][w] = dp[n][w] + min(dp[n+1][w], dp[n+1][w+1])

  // 根据方程写出代码
  const dp = triangle.map(item => [...item]) // 复制一个二维数组
  for (let n = dp.length - 2; n >= 0; n--) { // 从三角形倒数第二行往上开始遍历
    for (let w = 0; w <= n; w++) {
      dp[n][w] = dp[n][w] + Math.min(dp[n + 1][w], dp[n + 1][w + 1])
    }
  }

  return dp[0][0]
}

const triangle = [
  [2, 0, 0, 0],
  [3, 4, 0, 0],
  [6, 5, 7, 0],
  [4, 1, 8, 1]
]

console.log(sum(triangle))
