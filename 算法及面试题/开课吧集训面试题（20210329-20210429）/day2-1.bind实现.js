Function.prototype.bind = function(thisArg, ...args) {
  return () => this.call(thisArg, ...args)
}

const as = {
  prop: 'a'
}

const bs = {
  prop: 'b'
}

function test() {
  console.log(this.prop);
}

test.bind(as)()
test.bind(bs)()
