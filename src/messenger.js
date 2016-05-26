'use strict';

import * as redis from 'redis';
const client = redis.createClient();

export class Messenger {
    getMessage() {
        this.cnt = this.cnt || 0;
        return this.cnt++;
    }

    eventHandler(msg, callback) {
        function onComplete() {
            const error = Math.random() > 0.1;
            callback(error, msg);
        }

        setTimeout(onComplete, 0);
    }

    getErrors(cb) {
        client.lrange('errors', 0, -1, function (_, errors) {
            console.log(errors);
            client.del('errors');

            cb();
        });
    }
    
    addMessage(msg) {
        console.log(msg);
        client.lpush('errors', msg);
    }
}