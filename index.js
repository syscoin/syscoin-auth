'use strict';

const bitcore = require('bitcore-lib');
const Message = require('bitcore-message');

bitcore.Networks.add({
  name: 'sys_livenet',
  alias: 'sys_mainnet',
  pubkeyhash: 0x3F,
  privatekey: 0x80,
  scripthash: 0x05,
  xpubkey: 0x0488b21e,
  xprivkey: 0x0488ade4,
  networkMagic: 0xf9beb4d9,
  port: 8369
});

bitcore.Networks.add({
  name: 'sys_testnet',
  alias: 'sys_testnet',
  pubkeyhash: 0x41,
  privatekey: 0xef,
  scripthash: 0xc4,
  xpubkey: 0x043587cf,
  xprivkey: 0x04358394
});

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
  return new Message(hash).verify(address, signedHash);
};