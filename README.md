# Simple Cyberplat

========================================

Simple and light weight module to integrate cyberplat

========================================


# Install simple-cyberplat

```
  npm i simple-cyberplat 
```

# Install Dependencies

```
  npm i crypto qs qs-iconv
```

# Just follow below code and integrate with you project

```
const fs = require('fs');
const randomstring = require("randomstring");
const cp = require('simple-cyberplat');


const check_url = "https://in.cyberplat.com/xxxxxxxxxx";    
const pay_url = "https://in.cyberplat.com/xxxxxxxxxx";
const verify_url = "https://in.cyberplat.com/xxxxxxxxxx";

const CERT = 'XXXXXXXXXXXXXXXXXXXXXXXXXXX';

const SD = 123456;                   // Dealer unique code
const AP = 123466;                      // Acceptance outlet code
const OP = 123354;                      // POS Operator / Cashier code
const sess = randomstring.generate(20);  // Dealer Unique Transaction ID – Alphanumeric (Maximum 20 in length)
const number = "99999999";            // Mobile / DTH Subscriber Number / Consumer Number
const amount = "10";                    // Denomination for recharge
const account = ""                      //For Special Recharges - ‘ACCOUNT=2’


const secKey = fs.readFileSync('./private.key').toString();
const passwd = 'XXXXXXXXXXX';


initObj = {
	crypto: {
		secKey: secKey,
		pwd: passwd
	},
	settings: {
		SD: SD,
		AP: AP,
		OP: OP
	},
	provider: {
		payCheck :check_url,
		pay: pay_url, 
		verify: verify_url
	}
}

const cyberplat = cp(initObj);

payload = {
	CERT: CERT,
	SESSION: sess,
	NUMBER: number,
	ACCOUNT: account,
	AMOUNT: amount,
	AMOUNT_ALL: amount,
	COMMENT: 'cool'
}

cyberplat.payCheck(payload, (statusData)=> {
	console.log(statusData);
	if (statusData.RESULT === '0') {
		cyberplat.pay(payload, (payData)=> {
			console.log(payData);
		})
	}
});
```


# Methods

```
  payCheck: To check recharge/bill before doing actual
  pay: To recharge/bill
  payStatus: To check status of recharge/bill
```





