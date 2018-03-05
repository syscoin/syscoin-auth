const expect  = require("chai").expect;

const bitcore = require('bitcore-lib');
const syscoinAuth = require('../index');

describe("Hash payload", function() {
  let privateKeyWIF,
    privateKey,
    address,
    addressSys;

  beforeEach(function () {
    privateKeyWIF = 'L23PpjkBQqpAF4vbMHNfTZAb3KFPBSawQ7KinFTzz7dxq6TZX8UA';
    privateKey = new bitcore.PrivateKey(privateKeyWIF);
    address = privateKey.toAddress();
    addressSys = privateKey.toAddress('sys_livenet');
  });

  describe("hashPayload", function () {
    it("Returns correct payload for a given message and privkey", function (done) {
      let payload = 'This is a test payload';
      let authData = syscoinAuth.hashPayload(payload, privateKeyWIF);
      expect(authData.payload).to.equal(payload);
      expect(authData.hash).to.equal('69c176ad3180fa59035956350e328c0394afd6a9a36ec026efa69fc7c9256b19');
      expect(authData.signedHash).to.be.a('string');
      done();
    });
  });

  describe("verifyHash", function () {
    it("Returns true when derived hash for payload matches supplied hash", function (done) {
      let payload = 'This is a test payload';
      let authData = syscoinAuth.hashPayload(payload, privateKeyWIF);
      let hashVerified = syscoinAuth.verifyHash(payload, authData.hash);
      expect(hashVerified).to.equal(true);
      done();
    });

    it("Returns false when derived hash for payload does not match supplied hash", function (done) {
      let payload = 'This is a test payload';
      let hashVerified = syscoinAuth.verifyHash(payload, '12345');
      expect(hashVerified).to.equal(false);
      done();
    });
  });

  describe("verifySignature", function () {
    it("Returns true when hash passes verification against address and signedHash ", function (done) {
      let payload = 'This is a test payload';
      let authData = syscoinAuth.hashPayload(payload, privateKeyWIF);
      let sigVerified = syscoinAuth.verifySignature(authData.hash, authData.signedHash, address);
      expect(sigVerified).to.equal(true);
      sigVerified = syscoinAuth.verifySignature(authData.hash, authData.signedHash, addressSys); //why twice?
      expect(sigVerified).to.equal(true);
      done();
    });

    it("Returns false when hash fails verification against address and signedHash ", function (done) {
      let payload = 'This is a test payload';
      let authData = syscoinAuth.hashPayload(payload, privateKeyWIF);
      let sigVerified = syscoinAuth.verifySignature('12345', authData.signedHash, address);
      expect(sigVerified).to.equal(false);
      sigVerified = syscoinAuth.verifySignature('12345', authData.signedHash, addressSys); //why twice?
      expect(sigVerified).to.equal(false);
      done();
    });
  });

});