'use strict';

define(function() {
  return function(url, callback) {
    var scriptEl = document.createElement('script');
    var options = url.indexOf('?') !== -1 ? '&' : '?';
    var cbJSONP = 'cb' + String(Math.random()).slice(-6);
    scriptEl.src = url + options + 'callback=' + cbJSONP;
    document.body.appendChild(scriptEl);

    window[cbJSONP] = function(data) {
      callback(data);
      document.body.removeChild(scriptEl);
      delete window[cbJSONP];
    };
  };
});
