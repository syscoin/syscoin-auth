const bitcore = require('bitcore-lib');
const syscoinAuth = require('./index');

var privateKeyWIF = 'L23PpjkBQqpAF4vbMHNfTZAb3KFPBSawQ7KinFTzz7dxq6TZX8UA';
var privateKey = new bitcore.PrivateKey(privateKeyWIF);
var address = privateKey.toAddress();
var addressSys = privateKey.toAddress('sys_livenet');

var payload = 'This is a test payload';

console.log(address);

var authData = syscoinAuth.hashPayload(payload, privateKeyWIF);

console.log(authData);

var hashVerified = syscoinAuth.verifyHash(payload, authData.hash);

console.log(hashVerified);

var sigVerified = syscoinAuth.verifySignature(authData.hash,authData.signedHash, address);

console.log(sigVerified);

sigVerified = syscoinAuth.verifySignature(authData.hash,authData.signedHash, addressSys);

console.log(sigVerified);
