/**
 * Copyright (C) 2015 - 2018  Green Screens Ltd.
 */
const crypto = require('crypto');

var publicKey =`-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCw5A1KvvXBtIrbR+MXPCW2yTar
Y77hEgHOKWXRaPLLPxEQX9jW3MLI8tv4fqhrC1HBY5hQHZy53ffkwmmVog+Wd9zu
1FAEpDWE18sM36WdVnPbI1Fo5bFXEql7qQydDZ4kpp6zftFiOZ/agku/e94bVej3
qQ4Rq4+Pg33T9uK/8QIDAQAB
-----END PUBLIC KEY-----
`;

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
 * Encrypt string with RSA
 */
function encrypt(publicKey, data) {
  let opt = {
      key : publicKey,
      padding : crypto.constants.RSA_PKCS1_PADDING
  };
  let input = normalize(data);
  let encrypted = crypto.publicEncrypt(opt, input);
  let encryptedStr = encrypted.toString("base64");
  return encryptedStr;
}

/*
var toEncrypt = "demonstration text to be encrypted";
var data = encrypt(toEncrypt);
console.log(data);
*/

module.exports = {
  encrypt : encrypt
};
