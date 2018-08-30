/**
 * @Author: Oceanxy
 * @Email: xieyang@hiynn.com
 * @Description: RotatingTriangle
 * @Date: 2018-08-28 10:19:15
 * @Last Modified by: Oceanxy（xieyang@hiynn.com）
 * @Last Modified time: 2018-08-28 10:19:15
 */

  // 顶点着色器程序
const VSHADER_SOURCE =
    `attribute vec4 a_Position;
     uniform mat4 u_ModelMatrix;
     void main() {
       gl_Position = u_ModelMatrix * a_Position;
     }`

// 片元着色器程序
const FSHADER_SOURCE =
  `void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  }`

// 旋转速度（度/秒）
var ANGLE_STEP = 45.0

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

  // 设置 canvas 背景色
  gl.clearColor(0.0, 0.0, 0.0, 1.0)

  // 获取 u_ModelMatrix 变量的存储位置
  var u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix')
  if (!u_ModelMatrix) {
    console.log('Failed to get the storage location of u_ModelMatrix');
    return;
  }

  // 三角形的当前旋转角度
  var currentAngle = 0.0
  // 模型矩阵，Matrix4 对象
  var modelMatrix = new Matrix4()

  // 开始绘制三角形
  var tick = function() {
    currentAngle = animate(currentAngle) // 更新旋转角
    draw(gl, n, currentAngle, modelMatrix, u_ModelMatrix)
    requestAnimationFrame(tick) // 请求浏览器调用 tick
  }

  tick()
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

  // 创建缓冲区对象
  var vertexBuffer = gl.createBuffer()
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

  return n
}

function draw(gl, n, currentAngle, modelMatrix, u_ModelMatrix) {
  // 设置旋转矩阵
  modelMatrix.setRotate(currentAngle, 0, 0, 1)

  // 将旋转矩阵传输给顶点着色器
  gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements)

  // 清除 canvas
  gl.clear(gl.COLOR_BUFFER_BIT)

  // 绘制三角形
  gl.drawArrays(gl.TRIANGLES, 0, n)
}

// 记录上一次调用函数的时刻
var g_last = Date.now()

function animate(angle) {
  // 计算距离上次调用经过多长的时间
  var now = Date.now()
  var elapsed = now - g_last // 毫秒
  g_last = now
  // 根据距离上次调用的时间，更新当前旋转角度
  var newAngle = angle + (ANGLE_STEP * elapsed) / 1000.0
  return newAngle %= 360
}
