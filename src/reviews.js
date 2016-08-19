'use strict';

var callbackGetData = function(data) {
  window.reviews = data;
};

function load(url, callback) {
  var scriptEl = document.createElement('script');
  var options = url.indexOf('?') ? '&' : '?';
  var cbJSONP = 'cb' + String(Math.random()).slice(-6);
  scriptEl.src = url + options + 'callback' + cbJSONP;
  document.body.appendChild(scriptEl);

  window[cbJSONP] = function(data) {
    callback(data);
    document.body.removeChild(scriptEl);
    window.delete(cbJSONP);
  };
}

var HTTP_REQUEST_URL = 'http://localhost:1506/api/reviews';

load(HTTP_REQUEST_URL, callbackGetData);
