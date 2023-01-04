import {functions} from 'nerio-js-utils'

const {useAsFunction} = functions
export function isProduction () {
  return process.env.NODE_ENV === 'production'
}

const saveComps = {

}

export function rememberCom(id, comFn) {
  if (Object.prototype.hasOwnProperty.call(saveComps, id)) {
    return saveComps[id]
  }
  saveComps[id] = comFn()
  return saveComps[id]
}

export function forgetCom(id) {
  if (Object.prototype.hasOwnProperty.call(saveComps, id)) {
     delete saveComps[id]
  }
}


export function waitingFor(fn, timeout = 5) {
  fn = useAsFunction(fn)
  let interval
  let i = 100;
  let j = 0

  return new Promise((resolve, reject) => {
      let result = fn();
      if (result) {
          resolve(result)
      } else {
          interval = setInterval(() => {
              let result = fn();
              if (result) {
                  resolve(result)
                  clearInterval(interval)
              } else if ((timeout * 1000 / i) < j){
                  clearInterval(interval)
                  reject('waiting timeout')
              }
              j++;
          }, i)
      }
  })
}
