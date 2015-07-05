var request = require('superagent');
var md5 = require('md5');


function client(apiKey, apiSecret) {

  var apiEndpoint = 'http://mixpanel.com/api/2.0/';
  var apiDataEndpoint = 'http://data.mixpanel.com/api/2.0/';

  var expiry = 60;


  var out = {
    apiKey: function(_apiKey) {
      apiKey = _apiKey;
      return out;
    },
    apiSecret: function(_apiSecret) {
      apiSecret = _apiSecret;
      return out;
    },

    /**
     * TTL
     */
    expires: function(_expiry) {
      expiry = _expiry;
      return out;
    },


    get: function(path, query, callback) {
      query = query || {};

      query.api_key = apiKey;
      query.expire = getExpiryTime(expiry);
      query.sig = getSig(query, apiSecret);

      Object.keys(query).forEach(function(key) { query[key] = stringifyArgForSig(query[key]) });
      request.get(apiEndpoint + path).query(query).end(function(err, resp) {
        callback(err, resp && resp.body, resp);
      });

      return out;
    },

    export: function(query, callback) {
      query = query || {};

      query.api_key = apiKey;
      query.expire = getExpiryTime(expiry);
      query.sig = getSig(query, apiSecret);

      Object.keys(query).forEach(function(key) { query[key] = stringifyArgForSig(query[key]) });
      request.get(apiDataEndpoint + "/export").query(query).end(function(err, resp) {
        callback(err, resp && resp.text && resp.text.split("\n").filter(function(x) { return x }).map(function(x) { return JSON.parse(x) }) );
      });

      return out; 
    }
  };

  return out;
}


function getExpiryTime(expiresIn) {
  return Date.now() + expiresIn * 1000;
}

function getSig(query, apiSecret) {
  return md5.digest_s(concatArgsForSig(query) + apiSecret);
}

function concatArgsForSig(query) {
  return Object.keys(query).sort().map(function(key) { return key + '=' + stringifyArgForSig(query[key]); }).join('');
}

function stringifyArgForSig(arg) {
  return typeof(arg)=="string" ? arg : JSON.stringify(arg);
}

module.exports = {
  client: client,
  getSig: getSig
};
