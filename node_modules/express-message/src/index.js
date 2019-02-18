/*!
 * accepts
 * Copyright(c) 2019 Manvel Khnkoyan
 * MIT Licensed
 */

'use strict';

/*
 * Json pattern Validator
 */
const jpv = require('jpv');


/*
*
* */

module.exports = class expressMessage {

    /*
    *
    * */
    constructor() {
        /*
         * List of handlers
         */
        this.handlers = [];
    }

    /*
    *
    * */
    async handle( pattern, func ) {
        this.handlers.push({pattern,func});
    }

    /*
    *
    * */
    async emit(message) {
        for (var i = 0; i < this.handlers.length; i++) {
            let {pattern, func} = this.handlers[i];
            if (jpv.validate(message, pattern)) {
                let error = await func(message);
                if (error) {
                    break;
                }
            }
        }
    }

};



