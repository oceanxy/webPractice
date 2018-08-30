/**
 * @Author: Oceanxy
 * @Email: xieyang@hiynn.com
 * @Description: MultiAttributeColor
 * @Date: 2018-08-28 16:18:14
 * @Last Modified by: Oceanxy（xieyang@hiynn.com）
 * @Last Modified time: 2018-08-28 16:18:14
 */

const VSHADER_SOURCE =
  `attribute vec4 a_Position;
   attribute vec4 a_Color;
   varying vec4 v_Color;
   void main() {
    gl_Position = a_Position;
    gl_PointSize = 10.0;
    v_Color = a_Color; // 将数据传输给片元着色器
  }`

const FSHADER_SOURCE =
  `precision mediump float;
   varying vec4 v_Color;
   void main() {
     gl_FragColor = v_Color; // 从顶点着色器接收数据
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
    console.log('set the vertex information')
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
  var verticesColors = new Float32Array([
    // 顶点坐标和点的尺寸
    0.0, 0.5, 1.0, 0.0, 0.0,
    -0.5, -0.5, 0.0, 1.0, 0.0,
    0.5, -0.5, 0.0, 0.0, 1.0
  ])
  var n = 3 // 顶点数量

  // 创建缓冲区对象
  var vertexColorBuffer = gl.createBuffer()
  if(!vertexColorBuffer) {
    console.log('Failed to create the buffer object')
    return -1
  }

  // 将顶点坐标和颜色写入缓冲区对象
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, verticesColors, gl.STATIC_DRAW)

  var FSIZE = verticesColors.BYTES_PER_ELEMENT
  // 获取 a_Position 的存储位置，分配缓冲区并开启
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position')
  if(a_Position < 0) {
    console.log('Failed to get the storage location of a_Position')
    return -1
  }

  // 将缓冲区对象分配给 a_Position 变量
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 5, 0)

  // 连接 a_Position 变量与分配给它的缓冲区对象
  gl.enableVertexAttribArray(a_Position)

  // 获取 a_Color 的存储位置，分配缓冲区并开启
  var a_Color = gl.getAttribLocation(gl.program, 'a_Color')
  if(a_Color < 0) {
    console.log('Failed to get the storage location of a_Color')
    return -1
  }

  gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 5, FSIZE * 2)
  gl.enableVertexAttribArray(a_Color)

  return n
}
