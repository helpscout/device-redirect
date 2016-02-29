'use strict'

const MobileDetect = require('mobile-detect')
const MOBILE_TIMEOUT = 500

class DeviceRedirect {
  constructor(userAgent, options = {}) {
    this.root = (typeof window !== 'undefined') ? window : {}
    this.detect = new MobileDetect(userAgent)
    this.rules = options.rules || {}
    if (typeof options.shouldRedirect === 'function') {
      this.shouldRedirect = options.shouldRedirect
    }
  }

  openApp() {
    let rule = this._getRule();
    if (!rule) { return }

    if (this.root.document) {
      this.redirect(rule.appUrl)
    }
    if (this.shouldRedirect()) {
      this.timeout = setTimeout(() => {
        this.redirect(rule.redirectUrl)
      }, MOBILE_TIMEOUT)
    }
    if (this.root.removeEventListener) {
      window.addEventListener('pagehide', this._preventPopup)
    }
  }

  redirect(url) {
    if (this.root.document) {
      this.root.document.location = url
    }
  }

  shouldRedirect() {
    return true
  }

  _getRule() {
    for(let rule in this.rules) {
      if(this.detect.is(rule)) {
        return this.rules[rule];
      }
    }
    return false;
  }

  _preventPopup() {
    clearTimeout(this.timeout)
    this.timeout = null
    if (this.root.removeEventListener) {
      window.removeEventListener('pagehide', this._preventPopup)
    }
  }
}

module.exports = DeviceRedirect
