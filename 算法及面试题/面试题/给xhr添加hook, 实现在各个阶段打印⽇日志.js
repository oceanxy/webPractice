// 给xhr添加hook, 实现在各个阶段打印日志

// new XMLHTTPRequest()
// open
// onreadystatechange
// onload
// onerror

// 考擦的点：
// 1. class的使用，new对象
// 2.this指向
// 3.apply,call的运用
// 4.Object.defineProperty的应用
// 5.代码的设计能力
// 6.hook的理解

class XhrHook {
  // TODO 代码实现

  constructor(beforeHooks = {}, afterHooks = {}) {
    // 保存原有的XMLHttpRequest对象
    this.XHR = window.XMLHttpRequest
    // 构造属性
    this.beforeHooks = beforeHooks
    this.afterHooks = afterHooks
    // 调用初始化方法
    this.init()
  }

  init() {
    let _this = this
    window.XMLHttpRequest = function() {
      this._xhr = new _this.XHR()
      _this.overwrite(this)
    }
  }

  overwrite(proxyXHR) {
    for (let key in proxyXHR._xhr) {
      if (typeof proxyXHR._xhr[key] === 'function') {
        this.overwriteMethod(key, proxyXHR)
        continue
      }

      this.overwriteAttributes(key, proxyXHR)
    }
  }

  /**
   * 重写方法
   * @param key
   * @param proxyXHR
   */
  overwriteMethod(key, proxyXHR) {
    // 拦截原有行为
    let beforeHooks = this.beforeHooks
    let afterHooks = this.afterHooks

    proxyXHR[key] = (...args) => {
      // 拦截
      if (beforeHooks[key]) {
        const res = beforeHooks[key].call(proxyXHR, args)
        if (!res) {
          return
        }
      }

      const res = proxyXHR._xhr[key].apply(proxyXHR._xhr, args)

      afterHooks[key] && afterHooks[key].call(proxyXHR._xhr, res)

      return res
    }
  }

  /**
   * 重写属性
   * @param key
   * @param proxyXHR
   */
  overwriteAttributes(key, proxyXHR) {
    Object.defineProperties(proxyXHR, key, this.setPropertyDescriptor(key, proxyXHR))
  }

  setPropertyDescriptor(key, proxyXHR) {
    let obj = Object.create(null)
    let _this = this

    obj.set = function(val) {
      if (!key.startsWith('on')) {
        proxyXHR['__' + key] = val
        return
      }

      if (_this.beforeHooks[key]) {
        this._xhr[key] = function(...args) {
          _this.beforeHooks[key].call(proxyXHR)
          val.apply(proxyXHR, args)
        }
        return
      }

      this._xhr[key] = val
    }

    obj.get = function() {
      return proxyXHR['__' + key] || this._xhr[key]
    }

    return obj
  }
}

new XhrHook({
  open: function() {
    console.log('open')
  },
  onload: function() {
    console.log('onload')
  },
  onreadystatechange: function() {
    console.log('onreadystatechange')
  },
  onerror: function() {
    console.log('hook error')
  }
})

var xhr = new XMLHttpRequest()

xhr.open('GET', 'http://www.baidu.com', true)

xhr.send()

xhr.onreadystatechange = function(res) {
  console.log('statechange')
}

xhr.onerror = function() {
  console.log('error')
}
