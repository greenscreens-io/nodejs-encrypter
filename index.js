
const GSLIB = require('./lib');

const SERVICE = 'http://localhost:9080';

let instance = GSLIB.initialize(SERVICE);

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

