import DeviceRedirect from './device-redirect'

((define) => {
  return define(() => DeviceRedirect)
})(((undefined) => {
  if (module && module.exports) {
    return (factory) => { module.exports = factory() }
  } else if (define && define.amd) {
    return define
  } else if (window !== undefined) {
    return (factory) => { window.DeviceRedirect = factory() }
  } else {
    throw new Error('Unknown Environment. Please file a bug if you get this error.')
  }
})())
