const request = require('request')
const yargs = require('yargs');
const geocode = require('./geocode/geocode')


const argv = yargs
.options({
  a: {
    demand: true,
    alias: 'address',
    describe: 'Address to fetch weather for',
    string: true
  }
})
.help()
.alias('help', 'h')
.argv;



geocode.geocodeAddress(argv.address, (erroMessage, results) => {
  if(erroMessage) {
    console.log(erroMessage);
  } else {
    console.log(JSON.stringify(results, undefined, 2 ));
  }
})

// 551e6f192413f7d237d0ce9b824a0491

request({
  url: 'https://api.darksky.net/forecast/551e6f192413f7d237d0ce9b824a0491/38.7222524,-9.1393366',
  json: true
}, (error, response, body) => {
  if(!error && response.statusCode === 200) {
    console.log(body.currently.temperature);
  } else {
    console.log('Unable to fetch Weather.');
  }

})
