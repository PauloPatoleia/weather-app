const request = require('request');

var geocodeAddress = (address, callback) => {
  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}`,
    json: true
  }, (error, response, body) => {
    if(error) {
      callback('unable to connect to Google servers.')
    } else if (body.status === 'ZERO_RESULTS') {
      callback('Address not found.')
    } else if (body.status === 'OK') {
      callback(undefined, {
        Adress: body.results[0].formatted_address,
        Lat: body.results[0].geometry.location.lat,
        Lng: body.results[0].geometry.location.lng
      })
    }

  })
}

module.exports = {
  geocodeAddress
}
