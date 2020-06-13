// config.js 
//  ~/log/config.js 
// ----------------------------- 
//  App log config 
// 
// --------------------------------------------- 
// 	2020-04-14  BS      Created.  
// 
// --------------------------------------------- 
// 
'use strict';

const process = require('process');
const moment = require('moment');

const config = (() => {

    return {

        LEVEL: process.env.LOG_LEVEL,
        FORMAT_TIMESTAMP: moment.HTML5_FMT.DATETIME_LOCAL_MS
    };
})();

module.exports = config;