// levels.js 
//  ~/levels.js 
// ----------------------------- 
//  Log levels
// 
// --------------------------------------------- 
// 	2020-04-14  BS      Created. 
// 
// --------------------------------------------- 
// 
'use strict';

const LOG_LEVELS = {
    verbose: 0,
    debug: 1,
    info: 2,
    warn: 3,
    error: 4,
    __names: ['verbose', 'debug', 'info', 'warn', 'error']
};

module.exports = (() => {
    return LOG_LEVELS;
})();
