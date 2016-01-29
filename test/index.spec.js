import expect from 'expect'
import DeviceRedirect from '../src/index'

const USER_AGENT = 'Mozilla/5.0 (iPhone; CPU iPhone OS 6_1_3 like Mac OS X)' +
  'AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10B329 Safari/8536.25'

describe('DeviceRedirect', () => {
  it('accept conditions', () => {
    const conditions = [
      {
        device: 'iOS',
        urls: {
          appUrl: 'my-iphone-app://article/1234',
          redirectUrl: 'https://itunes.apple.com'
        }
      },
      {
        device: 'AndroidOS',
        urls: {
          appUrl: 'my-android-app://article/1234',
          redirectUrl: 'https://play.google.com'
        }
      }
    ]

    let dr = new DeviceRedirect(conditions, USER_AGENT)
    dr.openApp()

    expect(dr.detect.os()).toBe('iOS')
  })
})
