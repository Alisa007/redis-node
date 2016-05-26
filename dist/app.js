'use strict';

var _http = require('http');

var http = _interopRequireWildcard(_http);

var _messenger = require('./messenger');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var generator = new _messenger.Messenger();

var server = http.createServer(function (req, res) {
  var message = generator.getMessage();

  generator.eventHandler(message, function (err, msg) {
    if (err) {
      generator.addMessage(msg);
    }

    res.statusCode = 200;
    res.end(err.toString(), msg.toString());
  });
});

server.listen(3000, '127.0.0.1', function () {
  var args = process.argv.slice(2);

  if (args.indexOf('-errors') > -1) {
    generator.getErrors(function () {
      process.exit(1);
    });
  }

  return console.log('Server running at http://' + server.address().address + ':' + server.address().port + '/');
});

server.on('error', function (err) {
  console.log(err);
  process.exit(0);
});
//# sourceMappingURL=app.js.map