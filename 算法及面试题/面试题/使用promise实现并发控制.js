// 如果有巨量的图片需要展示在页面, 除了懒加载这种方式, 还有什么好的方法限制其同一时间加载的数量?

function limitLoad(urls, handler, limit) {
  const sequence = [...urls]
  let promise = []

  promise = sequence.splice(0, limit).map((url, index) => {
    return handler(url).then(() => index)
  })

  let concurrentChain = Promise.race(promise)
  for (let i = 0; i < sequence.length; i++) {
    concurrentChain = concurrentChain.then((res) => {
      promise[res] = handler(sequence[i]).then(() => res)
      return Promise.race(promise)
    })
  }
}

const urls = [
  {
    info: 'link1',
    time: 3000
  },
  {
    info: 'link2',
    time: 3500
  },
  {
    info: 'link3',
    time: 2000
  },
  {
    info: 'link4',
    time: 4000
  },
  {
    info: 'link5',
    time: 3200
  },
  {
    info: 'link6',
    time: 3600
  },
  {
    info: 'link7',
    time: 3900
  },
  {
    info: 'link8',
    time: 4500
  },
  {
    info: 'link9',
    time: 2800
  },
  {
    info: 'link10',
    time: 5000
  },
  {
    info: 'link11',
    time: 3100
  }
]

function loadImg(url) {
  return new Promise((resolve, reject) => {
    console.log('----' + url.info + ' start!')
    setTimeout(() => {
      console.log(url.info + ' OK!')
      resolve()
    }, url.time)
  })
}

limitLoad(urls, loadImg, 3)
