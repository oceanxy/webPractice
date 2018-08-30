/**
 * @Author: Oceanxy
 * @Email: xieyang@hiynn.com
 * @Description: MultiAttributeSize_Interleaved
 * @Date: 2018-08-28 14:46:09
 * @Last Modified by: Oceanxy（xieyang@hiynn.com）
 * @Last Modified time: 2018-08-28 14:46:09
 */

const VSHADER_SOURCE =
  `attribute vec4 a_Position;
     attribute float a_PointSize;
     void main() {
      gl_Position = a_Position;
      gl_PointSize = a_PointSize;
    }`

const FSHADER_SOURCE =
  `void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
   }`

function main() {
  // 获取 canvas 元素
  const canvas = document.getElementById('webgl')

  // 获取webGL绘图上下文
  const gl = getWebGLContext(canvas)
  if(!gl) {
    console.log('Failed to get the rendering context for WebGL')
    return
  }

  // 初始化着色器
  if(!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to initialize shaders.')
    return
  }

  // 设置顶点位置
  var n = initVertexBuffers(gl)
  if(n < 0) {
    console.log('Failed to set the position of the vertices')
    return
  }

  // 设置 canvas 的背景色
  gl.clearColor(0.0, 0.0, 0.0, 1.0)

  // 清空 canvas
  gl.clear(gl.COLOR_BUFFER_BIT)

  // 绘制三个点
  gl.drawArrays(gl.POINTS, 0, n)
}

/**
 * 创建顶点缓冲区对象
 * @param gl
 * @returns {number} 待绘制顶点的数量
 */
function initVertexBuffers(gl) {
  var verticesSizes = new Float32Array([
    // 顶点坐标和点的尺寸
    0.0, 0.5, 10.0, // 第一个点
    -0.5, -0.5, 20.0, // 第二个点
    0.5, -0.5, 30.0 // 第三个点
  ])
  var n = 3 // 点的个数

  // 创建缓冲区对象
  var vertexSizeBuffer = gl.createBuffer()
  if(!vertexSizeBuffer) {
    console.log('Failed to create the buffer object')
    return -1
  }

  // 将缓冲区对象绑定到目标
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexSizeBuffer)
  // 向缓冲区对象中写入数据
  gl.bufferData(gl.ARRAY_BUFFER, verticesSizes, gl.STATIC_DRAW)

  var FSIZE = verticesSizes.BYTES_PER_ELEMENT
  // 获取 a_Position 的存储位置，分配缓冲区并开启
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position')
  if(a_Position < 0) {
    console.log('Failed to get the storage location of a_Position')
    return -1
  }

  // 将缓冲区对象分配给 a_Position 变量
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 3, 0)

  // 连接 a_Position 变量与分配给它的缓冲区对象
  gl.enableVertexAttribArray(a_Position)

  // 获取 a_Position 的存储位置，分配缓冲区并开启
  var a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize')
  if(a_Position < 0) {
    console.log('Failed to get the storage location of a_Position')
    return -1
  }

  gl.vertexAttribPointer(a_PointSize, 1, gl.FLOAT, false, FSIZE * 3, FSIZE * 2)
  gl.enableVertexAttribArray(a_PointSize)

  return n
}
