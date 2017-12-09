'use strict';

const bitcore = require('bitcore-lib');
const Message = require('bitcore-message');

module.exports.hashPayload = function(payload, privkey) {
  const value = new Buffer(payload);
  const hash = bitcore.crypto.Hash.sha256(value).toString('hex');

  const privateKey = new bitcore.PrivateKey(privkey);
  const message = new Message(hash);

  const signedHash = message.sign(privateKey);

  return {
    hash: hash,
    signedHash: signedHash,
    payload: payload
  }
};

module.exports.verifyHash = function(payload, hash) {
  const value = new Buffer(payload);
  const derivedHash = bitcore.crypto.Hash.sha256(value).toString('hex');
  return derivedHash === hash;
};

module.exports.verifySignature = function(hash, signedHash, address) {
  const verified = new Message(hash).verify(address, signedHash);
  return verified;
};