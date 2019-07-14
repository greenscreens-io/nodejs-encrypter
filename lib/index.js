/**
 * Copyright (C) 2015 - 2018  Green Screens Ltd.
 */

const Session = require('./session');

function initialize(service, apiKey, otpKey) {
  return Session.init({service:service, apiKey:apiKey, otpKey:otpKey});
}

module.exports = {
   initialize : initialize
}
