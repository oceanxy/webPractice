// 题目 按要求输出

const timeout = (ms, number) => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(number)
  }, ms)
}).then(value => {
  console.log(value)
  return value
})

const ajax1 = () => timeout(3000, 1)
const ajax2 = () => timeout(1000, 2)
const ajax3 = () => timeout(2000, 3)

const mergePromise = ajaxArray => {
  // 在这里实现你的代码
  // 题目1：最终结果输出 [1, 2, 3, 4]

  // const data = new Array(ajaxArray.length)
  // return new Promise(resolve => {
  //   ajaxArray.map((ajax, index) => {
  //     Promise.resolve(
  //       Object.prototype.toString.call(ajax) === '[object Function]' ?
  //         ajax() :
  //         ajax
  //     ).then(value => {
  //       data[index] = value
  //
  //       if (!data.includes(undefined)) {
  //         resolve(data)
  //       }
  //     })
  //   })
  // })

  // 题目2 要求按顺序依次输出：
  // 1
  // 2
  // 3
  // done
  // [1, 2, 3, 4]

  // const data = new Array(ajaxArray.length)
  // let P = Promise.resolve()
  //
  // return new Promise(resolve => {
  //   ajaxArray.map((ajax, index) => {
  //     P = P.then(
  //       Object.prototype.toString.call(ajax) === '[object Function]' ?
  //         ajax :
  //         () => Promise.resolve(ajax)
  //     ).then(value => {
  //       data[index] = value
  //
  //       if (!data.includes(undefined)) {
  //         resolve(data)
  //       }
  //     })
  //   })
  // })

  // 题目2使用 async/await 解法

  return new Promise(async (resolve) => {
    const arr = []

    for (const ajax of ajaxArray) {
      arr.push(
        Object.prototype.toString.call(ajax) === '[object Function]' ?
          await ajax() :
          ajax
      )
    }

    resolve(arr)
  })
}

mergePromise([ajax1, ajax2, ajax3, 4]).then(data => {
  console.log('done')
  console.log(data)
})
