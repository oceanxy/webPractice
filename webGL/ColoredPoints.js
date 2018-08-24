/**
 * @Author: Oceanxy
 * @Email: xieyang@hiynn.com
 * @Description: ColoredPoints
 * @Date: 2018-08-21 18:15:39
 * @Last Modified by: Oceanxy（xieyang@hiynn.com）
 * @Last Modified time: 2018-08-21 18:15:39
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
  `precision mediump float;
   uniform vec4 u_FragColor;
   void main() {
    gl_FragColor = u_FragColor;
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

  // 获取 a_Position 变量的存储位置
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position')
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return;
  }

  // 获取 u_FragColor 变量的存储位置
  var u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor')
  if (!u_FragColor) {
    console.log('Failed to get the storage location of u_FragColor');
    return;
  }

  // 注册鼠标点击时的事件响应函数
  canvas.onmousedown = function(ev) {
    click(ev, gl, canvas, a_Position, u_FragColor)
  }

  // 设置 canvas 的背景色
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // 清空 canvas
  gl.clear(gl.COLOR_BUFFER_BIT)
}

var g_points = [] // 鼠标点击位置数组
var g_colors = [] // 存储点颜色的数组
function click(ev, gl, canvas, a_Position, u_FragColor) {
  var x = ev.clientX
  var y = ev.clientY
  var rect = ev.target.getBoundingClientRect()

  // 转换坐标 从浏览器客户区坐标系统转换到 canvas 坐标系统，然后再转换到 WebGL 坐标系统
  x = ((x - rect.left) - canvas.height / 2) / (canvas.height / 2)
  y = (canvas.width / 2 - (y - rect.top)) / (canvas.width / 2)

  // 将坐标存储到 g_points 数组中
  g_points.push([x, y])
  // 将点的颜色存储到 g_color 数组中
  if(x >= 0.0 && y >= 0.0) { // 第一象限
    g_colors.push([1.0, 0.0, 0.0, 1.0]) // 红色
  } else if(x < 0.0 && y < 0.0) { // 第三象限
    g_colors.push([0.0, 1.0, 0.0, 1.0]) // 绿色
  } else {
    g_colors.push([1.0, 1.0, 1.0, 1.0]) // 白色
  }

  // 清空 canvas
  gl.clear(gl.COLOR_BUFFER_BIT)

  var len = g_points.length
  for(var i = 0; i < len; i++) {
    var xy = g_points[i]
    var rgba = g_colors[i]

    // 将点的位置传递到 a_Position 变量中
    gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0.0)
    // 将点的颜色值输到 u_FragColor 变量中
    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3])

    // 绘制点
    gl.drawArrays(gl.POINTS, 0, 1)
  }
}
