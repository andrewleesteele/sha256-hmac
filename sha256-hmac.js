//Name of the file : sha256-hmac.js

//Loading the crypto module in node.js
let crypto = require('crypto');

// API Credentials
let client_id = '';
let api_key = '';
let api_secret = '';

// STEP 1: construct the following string: {method}\n{path}\n{headers}\n{bodyDigest}
let method = 'GET';
let path = '/network/v1/payments?limit=50';
let headers = 'accept:application/json' + '\nauthorization:Client ' + client_id + ' ' + api_key + '\ncontent-type:application/json' + '\nhost:sandbox.api.cash.app'
let body_digest = crypto.createHash('sha256').update('').digest('hex');
let raw_signature = method + '\n' + path + '\n' + headers + '\n' + body_digest

// STEP 2: create an HMAC-SHA256 crypto hash with API secret.
let hashed_signature = crypto.createHmac('sha256', api_secret).update(raw_signature).digest('hex');

// STEP 3: X-Signature header should be set to the following schema "V1 {signature}
let final_signature = 'V1 ' + hashed_signature;

//Printing the output on the console
console.log("X-Signature: " + final_signature);

// curl --request GET \
//      --url 'https://sandbox.api.cash.app/network/v1/payments?limit=50' \
//      --header 'accept:application/json' \
//      --header 'Authorization:Client {CLIENT_ID} {CLIENT_KEY}' \
//      --header 'content-type:application/json' \
//      --header 'host:sandbox.api.cash.app' \
//      --header 'X-Region: PDX' \
//      --header 'X-Signature: {X-Signature}' 
