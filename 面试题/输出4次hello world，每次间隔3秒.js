/*
有如下函数：
function repeat(func, times, wait) {}
使下面调用代码能正常工作：
const repeatFunc = repeat(console.log, 4, 3000)
repeatFunc("hello world") // 会输出4次hello world，每次间隔3秒
*/

function repeat(func, times, wait) {
  // 解法1：定时器法
  // return str => {
  //   const interval = setInterval(() => {
  //     func(str)
  //
  //     if (--times <= 0) {
  //       clearInterval(interval)
  //     }
  //   }, wait)
  // }

  // 解法2：循环输出
  // return str => {
  //   for (let i = 0; i < times; i++) {
  //     setTimeout(func, i * wait, str)
  //   }
  // }

  // 解法3：Promise.then方法
  return str => {
    let p = Promise.resolve()
    for (let i = 0; i < times; i++) {
      p = p.then(() => {
        return new Promise((resolve) => {
          setTimeout(() => {
            func(str)
            resolve()
          }, wait)
        })
      })
    }
  }
}

const repeatFunc = repeat(console.log, 4, 3000)
repeatFunc('hello world')
