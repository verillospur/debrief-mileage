//
// welcome.js
//
'use strict'

const log = require('./log');
const config = require('./config');

const show = () => {
    
    log.add(`$$ -- ${config.APP_NAME} --`);
    log.add('$$ ---' + '-'.repeat(config.APP_NAME.length) + '---');

    if (config.APP_WMSG && config.APP_WMSG.length > 0) {
        config.APP_WMSG.forEach(
            msg => {
                log.add('$$  ' + msg);
            }
        );
    }

    log.add('$$ ' + '-'.repeat(50));

};

module.exports = {
    run: show
};