'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MOBILE_TIMEOUT = 500;

var DeviceRedirect = function () {
  function DeviceRedirect(conditions) {
    _classCallCheck(this, DeviceRedirect);

    this.conditions = conditions;
  }

  _createClass(DeviceRedirect, [{
    key: 'openApp',
    value: function openApp() {
      var _this = this;

      var iframe = document.createElement('iframe');
      iframe.setAttribute('src', this.appUrl);
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
      this.timeout = setTimeout(function () {
        document.location = _this.redirectUrl;
      }, MOBILE_TIMEOUT);
      if (window && window.removeEventListener) {
        window.addEventListener('pagehide', this._preventPopup);
      }
    }
  }, {
    key: '_preventPopup',
    value: function _preventPopup() {
      clearTimeout(this.timeout);
      this.timeout = null;
      if (window && window.removeEventListener) {
        window.removeEventListener('pagehide', this._preventPopup);
      }
    }
  }]);

  return DeviceRedirect;
}();

exports.DeviceRedirect = DeviceRedirect;