/**
 * 能保存水量的先决条件是左边柱子和右边柱子的高度
 * 根据此条件得出：柱子i最多能保存的水量取决于左侧最高柱子和右侧最高柱子
 * 处于边界的柱子不能保存水量；
 * 柱子数量必须大于2才有可能保存水量
 * 最高柱子不能保存水量；最低柱子如果在边界上必定不能保留水量，如果不在边界上必定能保留水量
 *
 * @param {number[]} height
 * @return {number}
 */
const trap = function(height) {
  if (!Array.isArray(height)) new Error('必须传入数组')
  // 最少需要三根柱子
  if (height.length < 2) return 0

  // 排除第一根柱子和最后一根柱子
  const midHeight = height.slice(1, height.length - 1)
  // 当前左侧最大值
  let leftMaxHeight = height[0]
  // 当前右侧最大值
  let rightMaxHeight = Math.max(...height.slice(1, height.length))
  // 当前总水量
  let total = 0

  midHeight.forEach((h, i) => {
    // 左侧柱子和右侧柱子均高于当前柱子，可以保存水量
    if (leftMaxHeight > h && rightMaxHeight > h) {
      // 水量取决于自身高度以及左右两侧最大值的较小者
      total += Math.min(leftMaxHeight, rightMaxHeight) - h
    }

    // midHeight的最后一根柱子不用再重置边界值了
    if (i < height.length - 3) {
      // 重置左侧最高柱子
      leftMaxHeight = h >= leftMaxHeight ? h : leftMaxHeight
      // 重置右侧最高柱子
      rightMaxHeight = h >= rightMaxHeight ? Math.max(...height.slice(i + 2, height.length)) : rightMaxHeight
    }
  })

  return total
}

console.log(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]))
