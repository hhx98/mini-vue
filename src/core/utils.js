export function remove(arr, item) {
  if (arr.length) {
    const index = arr.indexOf(item)
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

const hasOwnProperty = Object.prototype.hasOwnProperty
export function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key)
}

export function isObject(value) {
  return typeof value === 'object' && value !== null
}

export function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: !!enumerable,
    writable: true,
    value: val,
  })
}
