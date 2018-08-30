/**
 * @Author: Oceanxy
 * @Email: xieyang@hiynn.com
 * @Description: TexturedQuad
 * @Date: 2018-08-29 11:21:06
 * @Last Modified by: Oceanxy（xieyang@hiynn.com）
 * @Last Modified time: 2018-08-29 11:21:06
 */

const VSHADER_SOURCE =
  `attribute vec4 a_Position;
   attribute vec2 a_TexCoord;
   varying vec2 v_TexCoord;
   void main() {
    gl_Position = a_Position;
    v_TexCoord = a_TexCoord;
  }`

const FSHADER_SOURCE =
  `#ifdef GL_ES
   precision mediump float;
   #endif
   uniform sampler2D u_Sampler;
   varying vec2 v_TexCoord;
   void main() {
     gl_FragColor = texture2D(u_Sampler, v_TexCoord);
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

  // 设置背景色
  gl.clearColor(0.0, 0.0, 0.0, 1.0)

  // 配置纹理
  if(!initTextures(gl, n)) {
    console.log('Failed to initialize the texture.')
    return
  }
}

/**
 * 创建顶点缓冲区对象
 * @param gl
 * @returns {number} 待绘制顶点的数量
 */
function initVertexBuffers(gl) {
  var verticesTexCoords = new Float32Array([
    // 顶点坐标和纹理坐标
    -0.5, 0.5, 0.0, 1.0,
    -0.5, -0.5, 0.0, 0.0,
    0.5, 0.5, 1.0, 1.0,
    0.5, -0.5, 1.0, 0.0
  ])
  // var verticesTexCoords = new Float32Array([
  //   // 顶点坐标和纹理坐标
  //   -0.5, 0.5, -0.3, 1.7,
  //   -0.5, -0.5, -0.3, -0.2,
  //   0.5, 0.5, 1.7, 1.7,
  //   0.5, -0.5, 1.7, -0.2
  // ])
  var n = 4 // 顶点数量

  // 创建缓冲区对象
  var vertexTexCoordBuffer = gl.createBuffer()
  if(!vertexTexCoordBuffer) {
    console.log('Failed to create the buffer object')
    return -1
  }

  // 将顶点坐标和颜色写入缓冲区对象
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexTexCoordBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, verticesTexCoords, gl.STATIC_DRAW)

  var FSIZE = verticesTexCoords.BYTES_PER_ELEMENT
  // 获取 a_Position 的存储位置，分配缓冲区并开启
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position')
  if(a_Position < 0) {
    console.log('Failed to get the storage location of a_Position')
    return -1
  }

  // 将缓冲区对象分配给 a_Position 变量
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 4, 0)

  // 连接 a_Position 变量与分配给它的缓冲区对象
  gl.enableVertexAttribArray(a_Position)

  var a_TexCoord = gl.getAttribLocation(gl.program, 'a_TexCoord')
  if(a_TexCoord < 0) {
    console.log('Failed to get the storage location of a_TexCoord')
    return -1
  }

  gl.vertexAttribPointer(a_TexCoord, 2, gl.FLOAT, false, FSIZE * 4, FSIZE * 2)
  gl.enableVertexAttribArray(a_TexCoord)

  return n
}

function initTextures(gl, n) {
  var texture = gl.createTexture() // 创建纹理对象
  if(!texture) {
    console.log('Failed to create the texture object')
    return false
  }

  // 获取 u_Sampler 的存储位置
  var u_Sampler = gl.getUniformLocation(gl.program, 'u_Sampler')
  if(!u_Sampler) {
    console.log('Failed to get the storage location of u_Sampler')
    return false
  }
  var image = new Image() // 创建一个 image 对象
  if(!image) {
    console.log('Failed to create the image object')
    return false
  }
  // 注册图像加载事件的响应函数
  image.onload = function() {
    loadTexture(gl, n, texture, u_Sampler, image)
  }

  // 浏览器开始加载图像
  image.src = './examples/resources/sky.jpg'

  return true
}

function loadTexture(gl, n, texture, u_Sampler, image) {
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1) // 对纹理图像进行 y 轴反转
  //开启0号纹理单元
  gl.activeTexture(gl.TEXTURE0)
  // 向 target 绑定纹理对象
  gl.bindTexture(gl.TEXTURE_2D, texture)

  // 配置纹理参数
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
  // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT)
  // 配置纹理图像
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image)

  // 将0号纹理传递给着色器
  gl.uniform1i(u_Sampler, 0)

  // 清空 canvas
  gl.clear(gl.COLOR_BUFFER_BIT)

  // 绘制三个点
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, n)
}
