/**
 * Copyright (C) 2015 - 2018  Green Screens Ltd.
 */

const Session = require('./session');

function initialize(service) {
  return Session.init(service);
}

module.exports = {
   initialize : initialize
}
