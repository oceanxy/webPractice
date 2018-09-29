/**
 * @Author: Oceanxy
 * @Email: xieyang@hiynn.com
 * @Description: LookAtTrianglesWithKeys
 * @Date: 2018-09-03 11:09:38
 * @Last Modified by: Oceanxy（xieyang@hiynn.com）
 * @Last Modified time: 2018-09-03 11:09:38
 */

  // 顶点着色器程序
const VSHADER_SOURCE =
    `attribute vec4 a_Position;
     attribute vec4 a_Color;
     uniform mat4 u_ViewMatrix;
     varying vec4 v_Color;
     void main() {
      gl_Position = u_ViewMatrix * a_Position;
      v_Color = a_Color;
    }`

// 片元着色器程序
const FSHADER_SOURCE =
  `#ifdef GL_ES
   precision mediump float;
   #endif
   varying vec4 v_Color;
   void main() {
    gl_FragColor = v_Color;
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

  // 设置背景色
  gl.clearColor(0.0, 0.0, 0.0, 1.0)

  // 获取 u_ViewMatrix 变量的存储位置
  var u_ViewMatrix = gl.getUniformLocation(gl.program, 'u_ViewMatrix')
  if(!u_ViewMatrix) {
    console.log('Failed to get the storage locations of u_ViewMatrix')
    return
  }

  // 设置视点、视线和上方向
  var viewMatrix = new Matrix4()

  // 注册键盘事件响应函数
  document.onkeydown = function(ev) {
    keydown(ev, gl, n, u_ViewMatrix, viewMatrix)
  }

  draw(gl, n, u_ViewMatrix, viewMatrix)
}

/**
 * 创建顶点缓冲区对象
 * @param gl
 * @returns {number} 待绘制顶点的数量
 */
function initVertexBuffers(gl) {
  var verticesColors = new Float32Array([
    0.0, 0.5, -0.4, 0.4, 1.0, 0.4, // 绿色三角形在最后面
    -0.5, -0.5, -0.4, 0.4, 1.0, 0.4,
    0.5, -0.5, -0.4, 1.0, 0.4, 0.4,

    0.5, 0.4, -0.2, 1.0, 0.4, 0.4, // 黄色三角形在中间
    -0.5, 0.4, -0.2, 1.0, 1.0, 0.4,
    0.0, -0.6, -0.2, 1.0, 1.0, 0.4,

    0.0, 0.5, 0.0, 0.4, 0.4, 1.0, // 蓝色三角形在最前面
    -0.5, -0.5, 0.0, 0.4, 0.4, 1.0,
    0.5, -0.5, 0.0, 1.0, 0.4, 0.4
  ])
  var n = 9 // 点的个数

  // 创建缓冲区对象
  var vertexColorBuffer = gl.createBuffer()
  if(!vertexColorBuffer) {
    console.log('Failed to create the buffer object')
    return -1
  }

  // 将缓冲区对象绑定到目标
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer)

  // 向缓冲区对象中写入数据
  gl.bufferData(gl.ARRAY_BUFFER, verticesColors, gl.STATIC_DRAW)

  var FSIZE = verticesColors.BYTES_PER_ELEMENT

  var a_Position = gl.getAttribLocation(gl.program, 'a_Position')
  if(a_Position < 0) {
    console.log('Failed to get the storage location of a_Position')
    return -1
  }

  // 将缓冲区对象分配给 a_Position 变量
  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, FSIZE * 6, 0)

  // 连接 a_Position 变量与分配给它的缓冲区对象
  gl.enableVertexAttribArray(a_Position)

  var a_Color = gl.getAttribLocation(gl.program, 'a_Color')
  if(a_Color < 0) {
    console.log('Failed to get the storage location of a_Color')
    return -1
  }
  gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 6, FSIZE * 3)
  gl.enableVertexAttribArray(a_Color)

  return n
}

var g_eyeX = 0.20, g_eyeY = 0.25, g_eyeZ = 0.25 // 视点坐标
function keydown(ev, gl, n, u_ViewMatrix, viewMatrix) {
  if(ev.keyCode === 39) { // 按下右键
    g_eyeX += 0.01
  } else if(ev.keyCode === 37) { // 按下左键
    g_eyeY -= 0.01
  } else {
    return // 按下的其他键
  }

  draw(gl, n, u_ViewMatrix, viewMatrix)
}

function draw(gl, n, u_ViewMatrix, viewMatrix) {
  // 设置视点和视线
  viewMatrix.setLookAt(g_eyeX, g_eyeY, g_eyeZ, 0, 0, 0, 0, 1, 0)

  // 将视图矩阵传递给 u_ViewMatrix 变量
  gl.uniformMatrix4fv(u_ViewMatrix, false, viewMatrix.elements)

  // 清除 canvas
  gl.clear(gl.COLOR_BUFFER_BIT)

  // 绘制三角形
  gl.drawArrays(gl.TRIANGLES, 0, n)
}
