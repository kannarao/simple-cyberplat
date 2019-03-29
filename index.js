const request = require("request");
const qs = require('qs');
const qsIconv = require('qs-iconv');

const Builder = require('./lib/builder');
const Signature = require('./lib/signature');
const Errors = require('./lib/errors');
const Parser = require('./lib/parser');

const Cyberplat = function (ops) {

  const crypto = ops.crypto;
  const settings = ops.settings;
  const provider = ops.provider;

  const builder = new Builder(settings);
  const signature = new Signature(crypto);
  const parser = new Parser();

  const go = function(type, obj, callback) {
    let url = null;
    if (provider[type]) {
      url = provider[type];
    } else {
      callback(true);
    }

    const payload = builder.buildMessage(type, obj);
    const signature_b64 = signature.getSignature(payload).match(/.{1,76}/g).join("\r\n");

    const payloadWithSign = `BEGIN\r\n${payload}\r\nEND\r\nBEGIN SIGNATURE\r\n${signature_b64}END SIGNATURE\r\n`;
    
    const payloadEncoded = qs
            .stringify({inputmessage: payloadWithSign}, {encoder: qsIconv.encoder('win1253')})
            .replace(/\%02/g,"")
            .replace(/\%20/g,"+");

    let headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-CyberPlat-Proto': 'SHA1RSA'
    }
    let options = {
      url,
      method: 'POST',
      headers,
      form: payloadEncoded
    }

    request(options, function (e, r, body) {
      callback(parser.stringToObj(body));
    })
  }

  // checking payment before pay
  const payCheck = function (obj, callback) {        
    go('payCheck', obj, callback);
  };

  // paying
  const pay = function (obj, callback) {        
    go('pay', obj, callback);
  };

  // checking payment after pay
  const payStatus = function (obj, callback) {        
    go('payStatus', obj, callback);
  };

  // balance
  const balance = function (obj, callback) {
    go('balance', obj, callback);
  };

  return {
    payCheck,
    pay,
    payStatus,
    balance,
    Errors
  };
}

module.exports = Cyberplat;
