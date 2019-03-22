const cryptoLib = require('crypto');

const Signature = function(crypto = {}) {

  const getSignature = function (payload) {
  	return cryptoLib.createSign('RSA-SHA256').update(payload).sign({
      key: crypto.secKey,
      passphrase: crypto.pwd
    }, 'base64');
  }

  return {
  	getSignature
  }
}

module.exports = Signature;


