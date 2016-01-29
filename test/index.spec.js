import expect from 'expect'
import sinon from 'sinon'
import DeviceRedirect from '../src/index'

const USER_AGENT_IOS = 'Mozilla/5.0 (iPhone; CPU iPhone OS 6_1_3 like Mac OS X) ' +
  'AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10B329 Safari/8536.25'
const USER_AGENT_ANDROID = 'Mozilla/5.0 (Linux; U; Android 4.0.3; ko-kr; LG-L160L Build/IML74K) ' +
  'AppleWebkit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30'
const USER_AGENT_WINDOWS = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; ' +
  'Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA; Lumia 920)'

const RULES = {
  'iOS': {
    appUrl: 'my-iphone-app://article/1234',
    redirectUrl: 'https://itunes.apple.com'
  },
  'AndroidOS': {
    appUrl: 'my-android-app://article/1234',
    redirectUrl: 'https://play.google.com'
  }
}

describe('DeviceRedirect', () => {
  let clock;

  before(() => {
    clock = sinon.useFakeTimers()
  })

  after(() => {
    clock.restore()
  })

  it('should call the redirect method with the iOS redirect Url', () => {
    let dr = new DeviceRedirect(USER_AGENT_IOS, {
      rules: RULES
    })
    expect.spyOn(dr, 'redirect')
    dr.openApp()
    clock.tick(550)
    expect(dr.redirect).toHaveBeenCalledWith(RULES.iOS.redirectUrl)
    expect.restoreSpies()
  })

  it('should call the redirect method with the AndroidOS redirect Url', () => {
    let dr = new DeviceRedirect(USER_AGENT_ANDROID, {
      rules: RULES
    })
    expect.spyOn(dr, 'redirect')
    dr.openApp()
    clock.tick(550)
    expect(dr.redirect).toHaveBeenCalledWith(RULES.AndroidOS.redirectUrl)
    expect.restoreSpies()
  })

  it('should not call the redirect method with an unsupported user agent', () => {
    let dr = new DeviceRedirect(USER_AGENT_WINDOWS, {
      rules: RULES
    })
    expect.spyOn(dr, 'redirect')
    dr.openApp()
    clock.tick(550)
    expect(dr.redirect).toNotHaveBeenCalled()
    expect.restoreSpies()
  })

  it('should not call the redirect method when shouldRedirect is false', () => {
    let dr = new DeviceRedirect(USER_AGENT_IOS, {
      rules: RULES,
      shouldRedirect: () => false
    })
    expect.spyOn(dr, 'redirect')
    dr.openApp()
    clock.tick(550)
    expect(dr.redirect).toNotHaveBeenCalled()
    expect.restoreSpies()
  })

  it('should redirect by default', () => {
    let dr = new DeviceRedirect()
    expect(dr.shouldRedirect()).toBe(true)
  })

  it('can overwrite shouldRedirect method', () => {
    let dr = new DeviceRedirect(USER_AGENT_IOS, {
      shouldRedirect: () => false
    })
    expect(dr.shouldRedirect()).toBe(false)
  })
})
