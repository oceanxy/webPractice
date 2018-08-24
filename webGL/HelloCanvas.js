/**
 * @Author: Oceanxy
 * @Email: xieyang@hiynn.com
 * @Description: HelloCanvas
 * @Date: 2018-08-17 15:49:59
 * @LastModifiedBy: Oceanxy（xieyang@hiynn.com）
 * @LastModifiedTime: 2018-08-17 15:49:59
 */

const main = () => {
  // 获取 canvas 元素
  const canvas = document.getElementById('webgl')

  // 获取WebGL绘图上下文
  const gl = getWebGLContext(canvas)

  if(!gl) {
    console.log('加载失败')
    return
  }

  // 指定清空 canvas 的颜色
  gl.clearColor(0.0, 0.0, 1.0, 1.0)

  // 清空 canvas
  gl.clear(gl.COLOR_BUFFER_BIT)
}
