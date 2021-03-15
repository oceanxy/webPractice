// 实现sizeOf函数, 计算传⼊入的对象所占的Bytes数值. （可参考 object-sizeof 库：https://github.com/miktam/sizeof）
// 考擦点：
//    计算机基础，js内存基础
//    递归
//    -

const testObject = {}

let testData = {
  a: 1,
  b: '2',
  c: false,
  d: testObject,
  e: testObject
}

const seen = new WeakSet() // 用于存储已计算的key的值（不重复，避免不同key引用相同对象的情况，例如对象 testData[d] 和 testData[e]）

function sizeOfObject(object) {
  if (object === null) {
    return 0
  }

  let bytes = 0
  const properties = Object.keys(object)
  for (let i = 0; i < properties.length; i++) {
    const key = properties[i]
    bytes += calculator(key) // 对象的key占用了空间，所以肯定要计算key的字节数

    if (typeof object[key] === 'object' && object[key] !== null) {
      if (seen.has(object[key])) {
        continue
      }
      seen.add(object[key])
    }

    bytes += calculator(object[key]) // 计算key的值占用的字节数
  }

  return bytes
}

function calculator(object) {
  const objectType = typeof object

  switch (objectType) {
    case 'string':
      return object.length * 2 // 字符串每个字符占2字节
    case 'boolean':
      return 4 // 布尔类型占用4字节
    case 'number':
      return 8 // 数字占用8字节（64位存储）
    case 'object':
      if (Array.isArray(object)) {
        return object.map(calculator).reduce((res, current) => res + current, 0)
      } else {
        return sizeOfObject(object)
      }
    default:
      return 0
  }
}

console.log(calculator(testData))
