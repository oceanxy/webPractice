/**
 * @Author: Oceanxy
 * @Email: xieyang@hiynn.com
 * @Description: PerspectiveView
 * @Date: 2018-09-03 14:40:13
 * @Last Modified by: Oceanxy
 * @Last Modified time: 2018-09-03 14:40:13
 */

  // 顶点着色器程序
var VSHADER_SOURCE =
    `attribute vec4 a_Position;
     attribute vec4 a_Color;
     uniform mat4 u_ViewMatrix;
     uniform mat4 u_ProjMatrix;
     varying vec4 v_Color;
     void main() {
       gl_Position = u_ProjMatrix * u_ViewMatrix * a_Position;
       v_Color = a_Color;
     }`

// 片元着色器程序
var FSHADER_SOURCE =
  `#ifdef GL_ES
   precision mediump float;
   #endif
   varying vec4 v_Color;
   void main() {
     gl_FragColor = v_Color;
   }`

function main() {
  // Retrieve <canvas> element
  var canvas = document.getElementById('webgl')

  // Get the rendering context for WebGL
  var gl = getWebGLContext(canvas)
  if(!gl) {
    console.log('Failed to get the rendering context for WebGL')
    return
  }

  // Initialize shaders
  if(!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.')
    return
  }

  // 设置顶点坐标和颜色（蓝色三角形在最后面）
  var n = initVertexBuffers(gl)
  if(n < 0) {
    console.log('Failed to specify the vertex infromation')
    return
  }

  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0)

  // 获取 u_ViewMatrix 和 u_ProjMatrix 变量的存储地址
  var u_ViewMatrix = gl.getUniformLocation(gl.program, 'u_ViewMatrix')
  var u_ProjMatrix = gl.getUniformLocation(gl.program, 'u_ProjMatrix')
  if(!u_ViewMatrix || !u_ProjMatrix) {
    console.log('Failed to get u_ViewMatrix or u_ProjMatrix')
    return
  }

  // 视图矩阵
  var viewMatrix = new Matrix4()
  // 投影矩阵
  var projMatrix = new Matrix4()

  // 计算视图矩阵和投影矩阵
  viewMatrix.setLookAt(0, 0, 5, 0, 0, -100, 0, 1, 0)
  projMatrix.setPerspective(30, canvas.width / canvas.height, 1, 100)

  // 将视图矩阵和投影矩阵传递给 u_ViewMatrix 和 u_ProjMatrix 变量
  gl.uniformMatrix4fv(u_ViewMatrix, false, viewMatrix.elements)
  gl.uniformMatrix4fv(u_ProjMatrix, false, projMatrix.elements)

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT)

  // Draw the rectangle
  gl.drawArrays(gl.TRIANGLES, 0, n)
}

function initVertexBuffers(gl) {
  var verticesColors = new Float32Array([
    // 右侧的三个三角形
    0.75, 1.0, -4.0, 0.4, 1.0, 0.4, // 绿色三角形在最后面
    0.25, -1.0, -4.0, 0.4, 1.0, 0.4,
    1.25, -1.0, -4.0, 1.0, 0.4, 0.4,

    0.75, 1.0, -2.0, 1.0, 1.0, 0.4, // 黄色三角形在中间
    0.25, -1.0, -2.0, 1.0, 1.0, 0.4,
    1.25, -1.0, -2.0, 1.0, 0.4, 0.4,

    0.75, 1.0, 0.0, 0.4, 0.4, 1.0,  // 蓝色三角形在最前面
    0.25, -1.0, 0.0, 0.4, 0.4, 1.0,
    1.25, -1.0, 0.0, 1.0, 0.4, 0.4,

    // 左侧的三个三角形
    -0.75, 1.0, -4.0, 0.4, 1.0, 0.4, // 绿色三角形在最后面
    -1.25, -1.0, -4.0, 0.4, 1.0, 0.4,
    -0.25, -1.0, -4.0, 1.0, 0.4, 0.4,

    -0.75, 1.0, -2.0, 1.0, 1.0, 0.4, // 黄色三角形在中间
    -1.25, -1.0, -2.0, 1.0, 1.0, 0.4,
    -0.25, -1.0, -2.0, 1.0, 0.4, 0.4,

    -0.75, 1.0, 0.0, 0.4, 0.4, 1.0, // 蓝色三角形在最前面
    -1.25, -1.0, 0.0, 0.4, 0.4, 1.0,
    -0.25, -1.0, 0.0, 1.0, 0.4, 0.4
  ])
  var n = 18

  // Create a buffer object
  var vertexColorbuffer = gl.createBuffer()
  if(!vertexColorbuffer) {
    console.log('Failed to create the buffer object')
    return -1
  }

  // Write vertex information to buffer object
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorbuffer)
  gl.bufferData(gl.ARRAY_BUFFER, verticesColors, gl.STATIC_DRAW)

  var FSIZE = verticesColors.BYTES_PER_ELEMENT
  // Assign the buffer object to a_Position and enable the assignment
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position')
  if(a_Position < 0) {
    console.log('Failed to get the storage location of a_Position')
    return -1
  }
  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, FSIZE * 6, 0)
  gl.enableVertexAttribArray(a_Position)
  // Assign the buffer object to a_Color and enable the assignment
  var a_Color = gl.getAttribLocation(gl.program, 'a_Color')
  if(a_Color < 0) {
    console.log('Failed to get the storage location of a_Color')
    return -1
  }
  gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 6, FSIZE * 3)
  gl.enableVertexAttribArray(a_Color)

  return n
}
