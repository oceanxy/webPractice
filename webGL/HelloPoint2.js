/**
 * @Author: Oceanxy
 * @Email: xieyang@hiynn.com
 * @Description: HelloPoint2
 * @Date: 2018-08-21 14:18:35
 * @Last Modified by: Oceanxy（xieyang@hiynn.com）
 * @Last Modified time: 2018-08-21 14:18:35
 */

  // 顶点着色器程序
  // const VSHADER_SOURCE =
  //   'void main() {\n' +
  //   ' gl_Position = vec4(0.0, 0.0, 0.0, 1.0);\n' + // 设置坐标
  //   ' gl_PointSize = 10.0;\n' + // 设置尺寸
  //   '}\n'
const VSHADER_SOURCE =
    `attribute vec4 a_Position;
     void main() {
      gl_Position = a_Position;
      gl_PointSize = 10.0;
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
  const canvas = document.getElementById('webgl1')

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

  // 获取 attribute 变量的存储位置
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position')
  if(a_Position < 0) {
    console.log('Failed to get the storage location of a_Position')
    return
  }

  // 将顶点位置传输给 attribute 变量
  gl.vertexAttrib3f(a_Position, 0.0, 0.0, 0.0)

  // 设置 canvas 的背景色
  gl.clearColor(0.0, 0.0, 0.0, 1.0)

  // 清空 canvas
  gl.clear(gl.COLOR_BUFFER_BIT)

  // 绘制一个点
  gl.drawArrays(gl.POINTS, 0, 1)
}
