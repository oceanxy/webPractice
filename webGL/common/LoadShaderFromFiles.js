// LoadShaderFromFiles.js based on ColoredTriangle.js
// 顶点着色器程序
var VSHADER_SOURCE = null
// 片元着色器
var FSHADER_SOURCE = null

function main() {
  // 获取 canvas 元素
  var canvas = document.getElementById('webgl')

  // 获取 webGL 绘图上下文
  var gl = getWebGLContext(canvas)
  if(!gl) {
    console.log('Failed to get the rendering context for WebGL')
    return
  }

  // 从文件中加载着色器
  loadShaderFile(gl, 'ColoredTriangle.vert', gl.VERTEX_SHADER)
  loadShaderFile(gl, 'ColoredTriangle.frag', gl.FRAGMENT_SHADER)
}

function start(gl) {
  // 初始化着色器
  if(!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    // ...
    gl.drawArrays(gl.TRIANGLES, 0, n)
  }
}

// ...

function loadShaderFile(gl, fileName, shader) {
  var request = new XMLHttpRequest()

  request.onreadystatechange = function() {
    if(request.readyState === 4 && request.status !== 404) {
      onLoadShader(gl, request.responseText, shader)
    }
  }
  request.open('GET', fileName, true)
  request.send() // 发送请求
}

function onLoadShader(gl, fileString, type) {
  if(type === gl.VERTEX_SHADER) { // 加载了顶点着色器
    VSHADER_SOURCE = fileString
  } else if(type === gl.FRAGMENT_SHADER) { // 加载了片元着色器
    FSHADER_SOURCE = fileString
  }
  //加载着色器之后，开始进行渲染
  if(VSHADER_SOURCE && FSHADER_SOURCE) {
    start(gl)
  }
}
