/**
 * @Author: Oceanxy
 * @Email: xieyang@hiynn.com
 * @Description: RotatedTranslatedTriangle
 * @Date: 2018-08-27 18:04:07
 * @Last Modified by: Oceanxy（xieyang@hiynn.com）
 * @Last Modified time: 2018-08-27 18:04:07
 */

  // 顶点着色器程序
  // const VSHADER_SOURCE =
  //   'void main() {\n' +
  //   ' gl_Position = vec4(0.0, 0.0, 0.0, 1.0);\n' + // 设置坐标
  //   ' gl_PointSize = 10.0;\n' + // 设置尺寸
  //   '}\n'
const VSHADER_SOURCE =
    `attribute vec4 a_Position;
     uniform mat4 u_ModelMatrix;
     void main() {
      gl_Position = u_ModelMatrix * a_Position;
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

  // 创建 Matrix4 对象以进行模型变换
  var modelMatrix = new Matrix4()

  // 计算模型矩阵
  var ANGLE = 60.0 // 旋转角
  var Tx = 0.5 // 平移距离
  // modelMatrix.setRotate(ANGLE, 0, 0, 1) // 设置模型矩阵为旋转矩阵
  // modelMatrix.translate(Tx, 0, 0) // 将模型矩阵乘以平移矩阵

  modelMatrix.setTranslate(Tx, 0, 0) // 设置模型矩阵为旋转矩阵
  modelMatrix.rotate(ANGLE, 0, 0, 1) // 将模型矩阵乘以平移矩阵

  // 将模型矩阵传输给顶点着色器
  var u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix')

  gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements)

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
    0.0, 0.3, -0.3, -0.3, 0.3, -0.3
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
