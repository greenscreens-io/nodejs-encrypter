
const GSLIB = require('./lib');

const SERVICE = 'http://localhost';

// NOTE: if apiKey is used, 
//       - OTP is not needed,
//       - URL password will not expire,
//       - IP address is matched to ApiKey IP

const apiKey = '1a4e39c8-07d9-4a2b-b021-d1f4103d1a22';
const otpKey = 'WWLWGFYJIF7RMXAY';

let instance = GSLIB.initialize(SERVICE, apiKey, otpKey);

instance.on('error', function(e) {
  console.log(e);
});

instance.on('ready', function() {
    // uuid, host, user, password, displayName, printerName, program, menu, lib, otp, finger
   //let obj = instance.createParams('0', 'DEMO', null, null, 'DSP0001', 'PRTDEMO')
   let obj = instance.createParams('0', 'DEMO')
   let url = instance.createURL(obj);
   console.log(url);
});

