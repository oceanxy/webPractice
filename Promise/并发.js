// 题目 请实现如下的函数，可以批量请求数据，所有的URL地址在urls参数中，
// 同时可以通过max参数控制请求的并发度，当所有请求结束之后，
// 需要执行callback回调函数。发请求的函数可以直接使用fetch即可

var urls = [
  'https://www.kkkk1000.com/images/getImgData/getImgDatadata.jpg',
  'https://www.kkkk1000.com/images/getImgData/gray.gif',
  'https://www.kkkk1000.com/images/getImgData/Particle.gif',
  'https://www.kkkk1000.com/images/getImgData/arithmetic.png',
  'https://www.kkkk1000.com/images/getImgData/arithmetic2.gif',
  'https://www.kkkk1000.com/images/getImgData/getImgDataError.jpg',
  'https://www.kkkk1000.com/images/getImgData/arithmetic.gif',
  'https://www.kkkk1000.com/images/wxQrCode2.png'
]

function loadImg(url) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = function() {
      console.log('一张图片加载完成')
      resolve()
    }
    img.onerror = reject
    img.src = url
  })
}

function limitLoad(urls, handler, limit) {
  // 请在这里实现代码

  // 对数组做一个拷贝
  const sequence = [...urls]
  // 初始化Promise.race并发数组
  let promises = [];

  // 初次并发请求到最大数
  promises = sequence.splice(0, limit).map((url, index) => {
    return handler(url).then(() => {
      // 注意此处的index，用以确定Promise.race执行完毕后返回的promise对象在并发数组（promises）中的下标
      return index
    });
  });

  let p = Promise.race(promises);
  for (let i = 0; i < sequence.length; i++) {
    p = p.then((res) => {
      promises[res] = handler(sequence[i]).then(() => {
        return res
      });
      return Promise.race(promises)
    })
  }
}

limitLoad(urls, loadImg, 3)
