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