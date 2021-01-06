import Observer from './core/observer'
import Watcher from './core/watcher'

const data = {
  age: 12,
  a: {
    b: 22,
  },
}

new Observer(data)

new Watcher(data, 'age', (newVal, oldVal) => {
  // console.log(newVal, oldVal)
})

data.age = 22
data.age
