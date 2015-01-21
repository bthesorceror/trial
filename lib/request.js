var hyperquest   = require('hyperquest');
var querystring  = require('querystring');

module.exports = function(url, data, cb) {
  var payload = querystring.stringify(data);
  var headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };

  var request = hyperquest.post(url, { headers: headers }, function(err, response) {
    var d = '';
    if (err || response.statusCode != 200) {
      return cb('Request failed.');
    }

    response.on('data', function(data) {
      d += data.toString();
    });

    response.on('end', function() {
      cb(null, JSON.parse(d));
    });
  });

  request.write(payload);
  request.end();
}
