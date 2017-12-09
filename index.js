'use strict';

module.exports.hashPayload = function(payload, privkey) {
  return {
    hash: '',
    signedHash: '',
    payload
  }
};

module.exports.verifyHash = function(payload, hash) {
  return true;
};

module.exports.verifySignature = function(signedHash, address) {
  return true;
}