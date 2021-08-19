function Fn() {
  this.name = '构造器'
}

function Fn2(numberOfLayers, object) {
  this.numberOfLayers = numberOfLayers
  this.object = object
  console.log(`${this.action}${this.numberOfLayers}${this.object}`)
}

Fn.prototype.address = '地址'
Fn2.prototype.address = '地址'

const a = new Fn()
a.name = '实例'
a.address = '复制A'

const b = new Fn()
// console.log(b.address)

a.__proto__.address = '地址B'

Function.prototype.sBind = function(otherThis) {
  if(typeof this !== 'function') {
    new Error(`调用者（${this}）不是Function`)
  }

  // 闭包：保存调用者函数以及 otherThis。这一特性也使得 bind 方法的调用者函数只能被绑定一次
  const binder = this
  // 柯理化：获取除了第一个参数以外的其他的参数，后续将和 rBind 函数的参数合并后一起传递给调用者函数。
  const args = Array.prototype.slice.call(arguments, 1)
  // 解决原型污染问题
  const prototypePollution = function() {
  }

  // 定义返回的函数，bind函数的核心
  const rBind = function() {
    // 柯理化：获取后续传递的参数
    const bindArgs = Array.prototype.slice.call(arguments)
    // 使用 apply 或 call，改变调用者函数的 this 指向问题。普通调用时，指向我们传入的对象，即 otherThis。
    binder.apply(
      /**
       * 对于javascript，在ES5之前的版本并没有类的概念，要实现构造器是通过函数模拟的。
       * 而函数的调用方式分为普通调用和使用 new 关键字调用。因为 bind 函数的特殊性，它
       * 的返回值为函数，所以符合以上两种调用方式。又因为这两种调用方式的 this 指向不同，
       * 所以要根据调用情况分别指定 this 指向。根据规范，普通调用的函数 this 指向调用
       * 者，通过 new 关键字调用的函数 this 指向实例对象。根据已知实例对象的原型指向构
       * 造器的原型对象，即 Instance.__proto__ === Fn.prototype，而函数的原型对象
       * 的 constructor 指向函数本身，即 Fn.prototype.constructor === Fn，得出
       * 以下三种判断 this 指向的方式。（注意：ES规范中，原型链是只读的，但我们仍能通过
       * Object.__proto__ 的方式对其进行修改。）
       *
       * 判断原型链继承的方式
       *  1、instanceof 操作符。
       *    Instance instanceof Fn，判断实例对象与Fn函数的关系，实际上执行的是
       *    Instance.__proto__ 与 Fn.prototype 的关系，即实例对象的原型是否在 Fn 函数的原型链上
       *  2、Function.prototype.isPrototypeOf()
       *    Fn.prototype.isPrototypeOf(Instance)，判断实例对象与 Fn 函数的原型对象的关系，
       *    即 Instance.__proto__ 与 Fn.prototype 的关系，即实例对象的原型是否在 Fn 函数的原型链上
       *  3、判断实例对象的原型链上的构造器归属
       *    因为 Fn.prototype.constructor === Fn，而 Instance.__proto__ === Fn.prototype，
       *    所以 Instance.__proto__.constructor === Fn
       */
      // this instanceof binder ? binder : otherThis
      // this.__proto__.constructor === binder ? binder : otherThis
      binder.prototype.isPrototypeOf(this) ? binder : otherThis,
      // 柯理化：合并两次获取的参数
      args.concat(bindArgs)
    )
  }

  if (this.prototype) {
    // 继承：将返回函数的原型指向调用者的原型对象
    // bind方法返回的函数（rBind）只是一个中间函数，它的实例属性和原型属性在整个过程中无意义，
    // 实际上 bind 方法要使用的是调用者函数的实例属性和原型属性
    // rBind.prototype = binder.prototype
    prototypePollution.prototype = this.prototype
  }
  rBind.prototype = new prototypePollution()

  return rBind
}

const down = {
  action: '下'
}

const up = {
  action: '上'
}

const left = {
  action: '左'
}

const downBind = Fn2.sBind(down, '5层')
const upBind = Fn2.sBind(up, '3层')
upBind('楼房')

const leftBind = upBind.sBind(left, '5步')
leftBind('人行道')

const xBind = upBind.sBind(left)
xBind('xx')

downBind('楼梯房')
upBind('电梯房')

// 检测使用 new 调用时的 this指向问题
let downBindIns = new downBind('新建楼梯房')

// 检测修改实例对象原型链，是否影响原函数
downBindIns.__proto__.address = '修改后的地址'
console.log(downBindIns.address);
console.log(downBindIns);
console.log(downBind.address);
const fn2 = new Fn2()
console.log(fn2.address);
