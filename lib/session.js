/**
 * Copyright (C) 2015 - 2018  Green Screens Ltd.
 */

// base class to create http session for web terminal

const EventEmitter = require('events');

const url = require('url');
const rsa  = require('./rsa');
const aes  = require('./aes');
const ajax = require('./ajax');
const otplib=require('otplib');

/**
 * Create HTTP session for handling
 * WebSocket Terminal API
 */
class Session extends EventEmitter {

  static init(cfg) {
    let session = new Session(cfg);
    session.initRSA();
    return session;
  }

  constructor(cfg) {
    super();

    let me = this;

    me.location = url.parse(cfg.service || 'http://localhost');
    me.apiKey = cfg.apiKey || null;
    me.otpKey = cfg.otpKey || null;
    me.isReady = false;
    me.fingerprint = Date.now();
    me.aesKey = aes.randomizer(16);
    me.rsaKey = null;
    me.sessionid = '';
    me.codepage = '';

    me.on('error', function(e){
      console.log(e);
    });

  }

  /**
   * Convert login data to encrypted parameters for url
   */
  createParams(uuid, host, user, password, displayName, printerName, program, menu, lib, otp, finger) {

    let me = this;

    let token = me.otpKey ? otplib.authenticator.generate(me.otpKey) : null;
    let iv = aes.randomizer(16);
    let ts = Date.now() + me.tc;
    let jsonstr = JSON.stringify({
      api: me.apiKey,
      otp:token,
      exp:0,
      ts: ts,
      ip: me.ip,
      uuid: uuid,
      host: host,
      otp: otp || null,
      appID: finger || me.fingerprint,
      user : user || null,
      password : password || null,
      displayName: displayName || null,
      printerName: printerName ||null,
      program: program ||null,
      menu: menu || null,
      lib: lib ||null
    });

    let k = rsa.encrypt(me.rsaKey, iv + me.aesKey);
    let d = aes.encrypt(jsonstr, me.aesKey, iv).toString("hex");
    let enc = {
      k: k,
      d: d
    };
    return enc;
  }

  createURL(enc) {
    let me = this;
    return me.buildURL(me.location.protocol, me.location.hostname, me.location.port, enc.d, enc.k);
  }

  buildURL(protocol, service, port, d, k) {
    if (port) {
      return `${protocol}//${service}:${port}/lite?d=${d}&k=${k}`;
    } else {
      return `${protocol}//${service}/lite?d=${d}&k=${k}`;
    }

  }

  /*
   * Connect to service and ask for RSA public key for encryption
   */
  initRSA() {
    let me = this;
    ajax.getRSAKey(me.location.protocol, me.location.hostname, me.location.port, function(e, o) {
      if (o && o.success === true) {
        me.rsaKey = o.key;
        me.tc = o.ts;
        me.emit('ready');
      } else {
        me.emit('error', e);
      }
    });
  }
}

module.exports = Session;
