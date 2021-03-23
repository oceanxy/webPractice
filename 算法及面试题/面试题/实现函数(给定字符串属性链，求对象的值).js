const obj = { a: { b: { c: { d: { e: 1 } } } } }

function get(obj, properties, defaultValue) {
  return properties.split('.').reduce((obj, property) => obj?.[property] ?? defaultValue, obj)
}

console.log(get(obj, 'a.b.c.d.e', 0))
