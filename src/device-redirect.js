'use strict'

const MobileDetect = require('mobile-detect')
const MOBILE_TIMEOUT = 500

class DeviceRedirect {
  constructor(conditions, userAgent) {
    this.conditions = conditions
    this.detect = new MobileDetect(userAgent)
  }

  openApp() {
    let condition = this.conditions[this.detect.os()]
    if (!condition) {
      return;
    }

    let iframe = document.createElement('iframe')
    iframe.setAttribute('src', condition.urls.appUrl)
    iframe.style.display = 'none'
    document.body.appendChild(iframe)
    this.timeout = setTimeout(() => {
      document.location = condition.urls.redirectUrl
    }, MOBILE_TIMEOUT)
    if(window && window.removeEventListener) {
      window.addEventListener('pagehide', this._preventPopup)
    }
  }

  _preventPopup() {
    clearTimeout(this.timeout)
    this.timeout = null
    if(window && window.removeEventListener) {
      window.removeEventListener('pagehide', this._preventPopup)
    }
  }
}

export default DeviceRedirect
