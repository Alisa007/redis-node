'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Messenger = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _redis = require('redis');

var redis = _interopRequireWildcard(_redis);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var client = redis.createClient();

var Messenger = exports.Messenger = function () {
    function Messenger() {
        _classCallCheck(this, Messenger);
    }

    _createClass(Messenger, [{
        key: 'getMessage',
        value: function getMessage() {
            this.cnt = this.cnt || 0;
            return this.cnt++;
        }
    }, {
        key: 'eventHandler',
        value: function eventHandler(msg, callback) {
            function onComplete() {
                var error = Math.random() > 0.1;
                callback(error, msg);
            }

            setTimeout(onComplete, 0);
        }
    }, {
        key: 'getErrors',
        value: function getErrors(cb) {
            client.lrange('errors', 0, -1, function (_, errors) {
                console.log(errors);
                client.del('errors');

                cb();
            });
        }
    }, {
        key: 'addMessage',
        value: function addMessage(msg) {
            console.log(msg);
            client.lpush('errors', msg);
        }
    }]);

    return Messenger;
}();
//# sourceMappingURL=messenger.js.map