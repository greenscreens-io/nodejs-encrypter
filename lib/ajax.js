/**
 * Copyright (C) 2015 - 2018  Green Screens Ltd.
 */

const http = require('http');
const https = require('https');
const querystring = require('querystring');
const cookie = require('cookie');

/**
 * Get cookie value by name
 */
function getCookie(name) {
  let me = this;
  let val = null;
  me.cookies.every(function(item) {
    if (item[name]) {
      val = item[name];
      return false;
    }
    return true;
  });
  return val;
}

/**
 * Generic HTTP request
 **/
function ajax(protocol, host, port, method, path, params, headers, cb) {

    function callback(res) {

      res.setEncoding('utf8');
      let str = '';

      res.on('data', function (chunk) {
        str += chunk;
      });

      res.on('end', function () {
        try {
           res.cookies = [];
           res.getCookie = getCookie.bind(res);
           var cookies = res.headers['set-cookie'];
           if (Array.isArray(cookies)) {
             cookies.every(function(item) {
                res.cookies.push(cookie.parse(item || ''));
                return true;
             });
           }
           cb(null, JSON.parse(str), res);
        } catch (e) {
           cb(e);
        }
      });

      res.on('error', function(err) {
         cb(err);
      });
    }

    let urlParams = params ? '?' + params : '';

    let options = {
      hostname: host,
      port: port,
      path: path + urlParams,
      method: method,
      headers : headers || {}
    };

    let req = null;
    let op = null;

    if (protocol === 'http:') {
      op = http;
    } else {
      op = https;
    }

    req = op.request(options, callback);

    req.on('error', function(e) {
      console.log(e);
    });
    req.end();

}

/**
 * Get RSA key for AES encryption
 **/
function getRSAKey(protocol, host, port, cb) {
  ajax(protocol, host, port, 'GET', '/services/auth', null, null, cb);
}


module.exports = {
  getRSAKey : getRSAKey
};
