import { def, hasOwn, isObject } from './utils'
import Dep from './dep'
import { arrayMethods } from './array'

const hasProto = '__proto__' in {}
const arrayKeys = Object.getOwnPropertyNames(arrayMethods)

export default class Observer {
  constructor(value) {
    this.value = value
    this.dep = new Dep()
    def(value, '__ob__', this)

    if (Array.isArray(value)) {
      const augment = hasProto ? protoAugment : copyAugment
      augment(value, arrayMethods, arrayKeys)
    } else {
      this.walk(value)
    }
  }

  walk(obj) {
    const keys = Object.keys(obj)
    keys.forEach((key) => {
      defineReactive(obj, key, obj[key])
    })
  }

  observeArray(arr) {
    for (let i = 0, l = arr.length; i < l; i++) {
      observe(arr[i])
    }
  }
}

function defineReactive(data, key, val) {
  let childOb = observe(val)
  let dep = new Dep()

  Object.defineProperty(data, key, {
    configurable: true,
    enumerable: true,
    get() {
      console.log('get', key, val)
      dep.depend()
      if (childOb) {
        childOb.dep.depend()
      }
      return val
    },
    set(newVal) {
      if (val === newVal) {
        return
      }
      console.log('set', key, newVal, val)
      val = newVal
      dep.notify()
    },
  })
}

function observe(value) {
  if (!isObject(value)) {
    return
  }
  let ob
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__
  } else {
    ob = new Observer(value)
  }
  return ob
}

function protoAugment(target, src, keys) {
  target.__proto__ = src
}
function copyAugment(target, src, keys) {
  for (let i = 0, l = keys.length; i < l; i++) {
    const key = keys[i]
    def(target, key, src[key])
  }
}
