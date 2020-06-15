//
// drivers/config.js
//
'use strict';

const process = require('process');

const config = (() => {

    return {

        DATA_FILE_PATH: process.env.DRIVERS_DATA_FILE_PATH, 
        
    };
})();

module.exports = config;