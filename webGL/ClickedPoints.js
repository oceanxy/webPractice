/**
 * @Author: Oceanxy
 * @Email: xieyang@hiynn.com
 * @Description: ClickedPoints
 * @Date: 2018-08-21 16:07:03
 * @Last Modified by: Oceanxy（xieyang@hiynn.com）
 * @Last Modified time: 2018-08-21 16:07:03
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

  // 注册鼠标点击事件响应函数
  canvas.onmousedown = function(ev) {
    click(ev, gl, canvas, a_Position)
  }

  // 设置 canvas 的背景色
  gl.clearColor(0.0, 0.0, 0.0, 1.0)

  // 清空 canvas
  gl.clear(gl.COLOR_BUFFER_BIT)
}

var g_points = [] // 鼠标点击位置数组
function click(ev, gl, canvas, a_Position) {
  var x = ev.clientX
  var y = ev.clientY
  var rect = ev.target.getBoundingClientRect()

  // 转换坐标 从浏览器客户区坐标系统转换到 canvas 坐标系统，然后再转换到 WebGL 坐标系统
  x = ((x - rect.left) - canvas.height / 2) / (canvas.height / 2)
  y = (canvas.width / 2 - (y - rect.top)) / (canvas.width / 2)

  // 将坐标存储到 g_points 数组中
  g_points.push([x, y])

  // 清空 canvas
  gl.clear(gl.COLOR_BUFFER_BIT)

  var len = g_points.length
  for(var i = 0; i < len; i++) {
    var xy = g_points[i]
    // 将点的位置传递到变量中 a_Position
    gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0.0)

    // 绘制一个点
    gl.drawArrays(gl.POINTS, 0, 1)
  }
}
