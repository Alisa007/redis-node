'use strict';

import * as http from 'http';
import {Messenger} from './messenger';
let generator = new Messenger();

var server = http.createServer(function(req, res) {
  const message = generator.getMessage();

  generator.eventHandler(message, function (err, msg) {
    if (err) {
      generator.addMessage(msg);
    }

    res.statusCode = 200;
    res.end(err.toString(), msg.toString());
  });
});

server.listen(3000, '127.0.0.1', function() {
  const args = process.argv.slice(2);

  if (args.indexOf('-errors') > -1) {
    generator.getErrors(function () {
      process.exit(1);
    });
  }

  return console.log(`Server running at http://${server.address().address}:${server.address().port}/`);
});

server.on('error', function (err) {
  console.log(err);
  process.exit(0);
});