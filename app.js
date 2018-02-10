const request = require('request');
const yargs = require('yargs');


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


request({
  url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(argv.address)}`,
  json: true
}, (error, response, body) => {
  if(error) {
    console.log('unable to connect to Google servers.');
  } else if (body.status === 'ZERO_RESULTS') {
    console.log('Address not found.');
  } else if (body.status === 'OK') {
    console.log(`Adress: ${body.results[0].formatted_address}`);
    console.log(`Lat: ${body.results[0].geometry.location.lat}`);
    console.log(`Lng: ${body.results[0].geometry.location.lng}`);
  }

})
