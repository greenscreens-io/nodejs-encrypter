/**
 * Copyright (C) 2015 - 2018  Green Screens Ltd.
 */

const crypto = require('crypto');
const algorithm = 'aes-128-ctr';

/**
 * Normalize input param to buffer if applyable
 **/
function normalize(data) {

    let input = null;
    if (typeof data === 'string') {
        input = new Buffer(data);
    } else if (data instanceof Buffer) {
        input = data;
    } else {
      throw new Error('Invalid data.');
    }
    return input;
}

/**
 * Random text generator
 **/
function randomizer(len) {

  let text = "";
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let poslen = possible.length;
  let i = len;

  while (i--) {
    text += possible.charAt(Math.floor(Math.random() * poslen));
  }

  return text;
}

/**
 * Encrypt data
 **/
function encrypt(buffer, password, vector) {
  let input = normalize(buffer);
  let cipher = crypto.createCipheriv(algorithm, password, vector);
  let crypted = Buffer.concat([cipher.update(input),cipher.final()]);
  return crypted;
}

/**
 * Decrypt data
 **/
function decrypt(buffer, password, vector) {
  let input = normalize(buffer);
  let decipher = crypto.createDecipheriv(algorithm, password, vector);
  let dec = Buffer.concat([decipher.update(input), decipher.final()]);
  return dec;
}

module.exports = {
  randomizer : randomizer,
  encrypt : encrypt,
  decrypt : decrypt
};
