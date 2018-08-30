/**
 * @Author: Oceanxy
 * @Email: xieyang@hiynn.com
 * @Description: MultiAttributeSize
 * @Date: 2018-08-28 11:51:08
 * @Last Modified by: Oceanxy（xieyang@hiynn.com）
 * @Last Modified time: 2018-08-28 11:51:08
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
  var vertices = new Float32Array([
    0.0, 0.5, -0.5, -0.5, 0.5, -0.5
  ])
  var n = 3 // 点的个数

  var sizes = new Float32Array([10.0, 20.0, 30.0]) // 点的尺寸

  // 创建缓冲区对象
  var vertexBuffer = gl.createBuffer()
  var sizeBuffer = gl.createBuffer()
  if(!vertexBuffer) {
    console.log('Failed to create the buffer object')
    return -1
  }

  // 将缓冲区对象绑定到目标
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)

  // 向缓冲区对象中写入数据
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

  var a_Position = gl.getAttribLocation(gl.program, 'a_Position')
  if(a_Position < 0) {
    console.log('Failed to get the storage location of a_Position')
    return -1
  }

  // 将缓冲区对象分配给 a_Position 变量
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0)

  // 连接 a_Position 变量与分配给它的缓冲区对象
  gl.enableVertexAttribArray(a_Position)

  // 将顶点尺寸写入缓冲区并开启
  gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, sizes, gl.STATIC_DRAW)
  var a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize')
  if(a_Position < 0) {
    console.log('Failed to get the storage location of a_Position')
    return -1
  }

  gl.vertexAttribPointer(a_PointSize, 1, gl.FLOAT, false, 0, 0)
  gl.enableVertexAttribArray(a_PointSize)

  return n
}
