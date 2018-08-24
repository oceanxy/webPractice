/**
 * @Author: Oceanxy
 * @Email: xieyang@hiynn.com
 * @Description: RotatedTriangle
 * @Date: 2018-08-23 16:59:09
 * @Last Modified by: Oceanxy（xieyang@hiynn.com）
 * @Last Modified time: 2018-08-23 16:59:09
 */

  // 顶点着色器程序
  // const VSHADER_SOURCE =
  //   'void main() {\n' +
  //   ' gl_Position = vec4(0.0, 0.0, 0.0, 1.0);\n' + // 设置坐标
  //   ' gl_PointSize = 10.0;\n' + // 设置尺寸
  //   '}\n'
const VSHADER_SOURCE =
    `attribute vec4 a_Position;
     uniform float u_CosB, u_SinB;
     void main() {
      gl_Position.x = a_Position.x * u_CosB - a_Position.y * u_SinB;
      gl_Position.y = a_Position.x * u_SinB + a_Position.y * u_CosB;
      gl_Position.z = a_Position.z;
      gl_Position.w = 1.0;
    }`

// 片元着色器程序
// const FSHADER_SOURCE =
//   'void main() {\n' +
//   ' gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' + // 设置颜色
//   '}\n'
const FSHADER_SOURCE =
  `void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
   }`

// 旋转角度
var ANGLE = 90.0

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

  // 将旋转图形所需的数据传输给顶点着色器
  var radian = Math.PI * ANGLE / 180.0 // 转为弧度制
  var CosB = Math.cos(radian)
  var sinB = Math.sin(radian)

  var u_CosB = gl.getUniformLocation(gl.program, 'u_CosB')
  var u_SinB = gl.getUniformLocation(gl.program, 'u_SinB')

  gl.uniform1f(u_CosB, CosB)
  gl.uniform1f(u_SinB, sinB)

  // 设置背景色
  gl.clearColor(0.0, 0.0, 0.0, 1.0)

  // 清空 canvas
  gl.clear(gl.COLOR_BUFFER_BIT)

  // 绘制三角形
  gl.drawArrays(gl.TRIANGLES, 0, n)
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
