
const Parser = function() {
	const stringToObj = function(message){
    let DELIMETER = "\r\n";
    let strings = message.split(DELIMETER);
    let pass = false;

    let obj = {};
    let counter = 0;
    for (let i = 0; i < strings.length; i++) {
        if (strings[i] === 'END') {
            pass = false;
        }

        if (pass && strings[i] !== '') {
            let tmp = strings[i].split("=");
            obj[tmp[0]] = tmp[1];
            counter++;
        }

        if (strings[i] === 'BEGIN') {
            pass = true;
        }
    };

    return (counter > 0) ? obj : null;
  };

  return {
  	stringToObj
  }
}

module.exports = Parser;

