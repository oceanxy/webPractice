## `__proto__` 和 `prototype` 之间有什么关系？

- 所有对象都有 __proto__ 属性，函数这个特殊对象除了具有 __proto__ 属性，
  还有特有的原型属性 prototype 
- prototype 对象默认有两个属性 `constructor` 属性和 __proto__ 属性
- prototype 属性可以给函数和对象添加可共享（继承）的方法、属性，
  而 __proto__ 是查找某函数或对象的原型链方式
- constructor 属性包含了一个指针，指回原构造函数
