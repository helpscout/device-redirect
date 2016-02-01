# device-redirect

Redirect your users to device-specific apps and interstitial pages.

`device-redirect` is a JavaScript module that provides a simple API to redirect your users to device-specific app URLs, with fallbacks to interstitial or mobile friendly web pages.

## Demo

We use device-redirect at [Help Scout](http://helpscout.com) to let our iOS users know they can get the full mobile experience with our new [iPhone App](https://itunes.apple.com/us/app/help-scout/id966327660).

![DeviceRedirectDemo](http://c.hlp.sc/2f2z3d1p3i3F/Screen%20Recording%202016-01-29%20at%2004.57%20PM.gif)

## Installation

### NPM

```javascript
npm install device-redirect --save-dev
```

### Bower

```javascript
bower install https://npmcdn.com/device-redirect/bower.zip --save-dev
```

### CDN (npmcdn.com)

```javascript
https://npmcdn.com/device-redirect/dist/device-redirect.js
https://npmcdn.com/device-redirect/dist/device-redirect.min.js
```

## Usage

### Browser

```javascript
<script src="device-redirect.min.js"></script>
<script>
    var dr = new DeviceRedirect(window.navigator.userAgent, { ...options });
</script>
```

### AMD

```javascript
define(['./path/to/device-redirect'], function(DeviceRedirect) {
  var dr = new DeviceRedirect(window.navigator.userAgent, { ...options });
});
```

### CommonJS

```javascript
// ES6
import DeviceRedirect from 'device-redirect'

// ES5
var DeviceRedirect = require('device-redirect');

var dr = new DeviceRedirect(window.navigator.userAgent, { ...options });
```

## Methods

### `constructor(userAgent : string, <options : object>)`

Creates a new DeviceRedirect instance for the specified user agent string. Example:

```
var dr = new DeviceRedirect(window.navigator.userAgent, {
	rules: { ... }
});
```

### `openApp()`

Will try to redirect to the given `appUrl` for the matching device. If if fails to do that (this usually means the user doesn't have the native app installed in his device), it will redirect to the given `redirectUrl` for the matching device. Example:

```javascript
var dr = new DeviceRedirect(window.navigator.userAgent, {
	rules: {
		'iOS': {
		    appUrl: 'my-iphone-app://article/1234',
		    redirectUrl: 'https://itunes.apple.com'
		}
	}
});

dr.openApp();

// On an iOS device, will try to open 'my-iphone-app://article/1234' on a native app.
// If it fails, it'll redirect to 'https://itunes.apple.com'.
```

## Options

### `rules : object`

A map object describing supported devices and URLs to redirect. Example:

```javascript
var dr = new DeviceRedirect(window.navigator.userAgent, {
	rules: {
		'iOS': {
		    appUrl: 'my-iphone-app://article/1234',
		    redirectUrl: 'https://itunes.apple.com'
		},
		'AndroidOS': {
		    appUrl: 'my-android-app://article/1234',
		    redirectUrl: 'https://play.google.com'
		}
	}
});
```
Keys are used to match a user agent, OS, phone or tablet. This is the list of possible keys:

```
// General Keys:
Bot, MobileBot, DesktopMode, TV, WebKit, Console, Watch

// User Agent Keys:
Chrome, Dolfin, Opera, Skyfire, IE, Firefox, Bolt, TeaShark, Blazer, Safari, Tizen, UCBrowser, baiduboxapp, baidubrowser, DiigoBrowser, Puffin, Mercury, ObigoBrowser, NetFront, GenericBrowser

// OS Keys:
AndroidOS, BlackBerryOS, PalmOS, SymbianOS, WindowsMobileOS, WindowsPhoneOS, iOS, MeeGoOS, MaemoOS, JavaOS, webOS, badaOS, BREWOS

// Phone Keys:
iPhone, BlackBerry, HTC, Nexus, Dell, Motorola, Samsung, LG, Sony, Asus, Micromax, Palm, Vertu, Pantech, Fly, Wiko, iMobile, SimValley, Wolfgang, Alcatel, Nintendo, Amoi, INQ, GenericPhone

// Tablet Keys:
iPad, NexusTablet, SamsungTablet, Kindle, SurfaceTablet, HPTablet, AsusTablet, BlackBerryTablet, HTCtablet, MotorolaTablet, NookTablet, AcerTablet, ToshibaTablet, LGTablet, FujitsuTablet, PrestigioTablet, LenovoTablet, DellTablet, YarvikTablet, MedionTablet, ArnovaTablet, IntensoTablet, IRUTablet, MegafonTablet, EbodaTablet, AllViewTablet, ArchosTablet, AinolTablet, SonyTablet, PhilipsTablet, CubeTablet, CobyTablet, MIDTablet, MSITablet, SMiTTablet, RockChipTablet, FlyTablet, bqTablet, HuaweiTablet, NecTablet, PantechTablet, BronchoTablet, VersusTablet, ZyncTablet, PositivoTablet, NabiTablet, KoboTablet, DanewTablet, TexetTablet, PlaystationTablet, TrekstorTablet, PyleAudioTablet, AdvanTablet, DanyTechTablet, GalapadTablet, MicromaxTablet, KarbonnTablet, AllFineTablet, PROSCANTablet, YONESTablet, ChangJiaTablet, GUTablet, PointOfViewTablet, OvermaxTablet, HCLTablet, DPSTablet, VistureTablet, CrestaTablet, MediatekTablet, ConcordeTablet, GoCleverTablet, ModecomTablet, VoninoTablet, ECSTablet, StorexTablet, VodafoneTablet, EssentielBTablet, RossMoorTablet, iMobileTablet, TolinoTablet, AudioSonicTablet, AMPETablet, SkkTablet, TecnoTablet, JXDTablet, iJoyTablet, FX2Tablet, XoroTablet, ViewsonicTablet, OdysTablet, CaptivaTablet, IconbitTablet, TeclastTablet, OndaTablet, JaytechTablet, BlaupunktTablet, DigmaTablet, EvolioTablet, LavaTablet, AocTablet, CelkonTablet, WolderTablet, MiTablet, NibiruTablet, NexoTablet, LeaderTablet, UbislateTablet, PocketBookTablet, Hudl, TelstraTablet, GenericTablet
```


### `shouldRedirect : function`

The default implementation of `shouldRedirect` always returns `true`. Overwrite this method to control if it should redirect to the URL specified in `redirectUrl` for the matching device. Example:

```javascript
var dr = new DeviceRedirect(window.navigator.userAgent, {
	rules: { ... },
	shouldRedirect: function() {
		if(localStorage.getItem('userAlreadyOptedOutOfThisFeature')) {
			return false;
		}

		return true;
	}
});
```

## Local Build

- Clone this repo.
- Install dependencies with `npm install`
- Build project with `npm run build`
- Run Unit Tests with `npm test`

## Todo

- Config ESLint
- Config Travis-CI

## License

MIT
