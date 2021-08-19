/**
 * @Author: Oceanxy
 * @Email: xieyang@hiynn.com
 * @Description: 网易云课堂javascript的new运算符剖析
 * @Date: 2019-03-28 23:32:31
 * @LastModified: Oceanxy
 * @LastModifiedTime: 2019-03-28 23:32:31
 */

function person(name, age) {
  this.name = name
  this.age = age
}

function newOperation(person, name, age) {
  // const obj = {}
  // const obj = new Object()
  // const obj = Object.create(null)
  Constructor = [].shift.call(arguments)
  const obj = Object.create(Constructor.prototype) // 防止原型链上的方法访问不到
  // obj.__proto__ = Constructor.prototype

  // Constructor.apply(obj, arguments)
  // return obj

  const result = Constructor.apply(obj, arguments)
  // return result instanceof Object ? result : obj
  return result instanceof Object ? result || obj : obj // 在构造函数里面返回对象（引用类型）和数字、字符串等基本类型以及null的差异  返回对象时，构造的属性将失效；返回基本类型时，构造函数无影响；返回null时，视同基本类型
}

const child = newOperation(person, '张三', 20)

console.log(child.name, child.age)
