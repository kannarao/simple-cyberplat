
const Builder = function(settings = {}) {

  const DELIMETER = "\r\n";

  const SETTINGS = {
    CERT: settings.CERT,
    SD: settings.SD,
    AP: settings.AP,
    OP: settings.OP
  }

  const convertToString = function (obj) {
    let newObj = Object.assign({}, settings, obj);
    let arr = Object.keys(newObj).map(function(key){
            return key + "=" + obj[key];
    });
    return arr.join(DELIMETER);
  }

  const buildMessage = function (type, obj) {
    let message = {}
    if (type !== 'payCheck') {
      message = Object.assign({}, SETTINGS, obj);
    } else {
      message = obj;
    }
    return convertToString(message);
  }

  return {
    buildMessage
  }
}

module.exports = Builder;
