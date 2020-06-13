// log.js 
//  ~/log.js 
// ----------------------------- 
//  App message logging.
// 
// --------------------------------------------- 
// 	2020-04-13  BS      Created. 
// 
// --------------------------------------------- 
// 
'use strict';

const moment = require('moment');
const config = require('../config');

const LOG_LEVELS = require('./levels');

const DEFAULT_LOG_LEVEL = LOG_LEVELS.verbose;

const LINE_CHAR = '-';
const LINE_LEN = '50';

//#region stamp

// const FORMAT_TIMESTAMP = moment.HTML5_FMT.DATETIME_LOCAL_MS;
const FORMAT_TIMESTAMP = config.LOG.FORMAT_TIMESTAMP;

const getStamp = () => {
    const stamp = moment().format(FORMAT_TIMESTAMP);
    return stamp;
}
//#endregion

//#region levels
const getLevel = () => {
    return config.LOG.LEVEL;
};

const getLevelNum = () => {
    return parseInt(LOG_LEVELS[config.LOG.LEVEL]) || 0;
};

const getLevels = () => {
    return {...LOG_LEVELS};
};  
//#endregion

//#region level checking

/**
 * * Checks specified log level against log level specified in environment variable LOG_LEVEL.
 * * Returns boolean.
 * @param {*} level The log level to test.
 */
const checkLevel = level => {
    level = level || DEFAULT_LOG_LEVEL;

    let rv = false;
    try {

        let levelNum;
        if (!isNaN(level)) {
            levelNum = parseInt(level.toString());
        }
        else {
            levelNum = parseInt(LOG_LEVELS[level]);
        }

        const configLevelNum = getLevelNum();
        if (levelNum >= configLevelNum) {

            rv = true;
        }
    }
    catch (e) {

        let ex = new Error('Error checking levels: ' + e.toString());
        ex.innerError = e;
        throw e;
    }

    return rv;
};

//#endregion

//#region add to log

/**
 * * Adds a message to the application log. Returns true if successful.
 * @param {string} data Content (message) to add to the log.
 * @param {LOG_LEVELS} level Log level to apply.
 * The message is added to the log if the log level is equal or greater
 * than the level specified in LOG_LEVEL environment variable.
 */
const add = (data, level) => {
    level = level || DEFAULT_LOG_LEVEL;

    let rv = false;
    try {

        rv = checkLevel(level);
        if (rv) {
    
            const stamp = getStamp();
            const entry = `${stamp}: ${data}`;
            
            let consoleFn;
            switch (level) {
                case LOG_LEVELS.warn:
                    consoleFn = console.warn;
                    break;
                case LOG_LEVELS.error:
                    consoleFn = console.error;
                    break;
                case LOG_LEVELS.verbose:
                case LOG_LEVELS.info:
                default:
                    consoleFn = console.info;
                    break;
            }
            consoleFn(entry);
    
            rv = true;
        }
        
    } catch (e) {

        const dt = new Date().toUTCString();

        // ! Wonk it out to the console. If writing to the log is throwing exceptions, 
        // ! we can't record that fact in the log... ;-))
        console.error(`${dt}: ** ERROR ADDING ENTRY TO LOG **`);
        console.error(`${dt}: Exception: ${e}`);
        console.error(`${dt}: Stack: ${e.stack}`);
    }
    
    return rv;
};

/**
 * * Alias of add() passing LOG_LEVELS.error as log level
 * @param {Error} err 
 */
const error = (err) => {
    return add(err, LOG_LEVELS.error);
}

/**
 * * Output a horizontal line to the log. Returns true if successful.
 * @param {*} level Log level
 */
const line = (level) => {
    level = level || DEFAULT_LOG_LEVEL;

    if (checkLevel(level)) {
        let m = LINE_CHAR;
        for (let i = 0; i <= LINE_LEN; i++) {
            m = m + LINE_CHAR;
        }
        return add(m, level);
    }
}

//#region --{ experimental }--

/**
 * * Outputs tabular information to the log. 
 * ! WARNING: NOT YET IMPLEMENTED
 * todo: implement 
 *  
 * @param {*} data The data to visually tabulate
 * @param {*} level Log level
 */
const table = (data, level) => {
    level = level || DEFAULT_LOG_LEVEL;

    if (checkLevel(level)) {
        const w = '(log.table(): not yet implemented)'
        // console.table([[w, data]]);
        add(w, level);

        let m = data;
        // if (!Array.isArray(data)) m = [[data]];
        console.table(m);
    }

    // todo TODO: this function
};

//#endregion

//#endregion

//#region exports
module.exports = {
    add: add,
    error: error,
    line: line,
    table: table,

    getLevel: getLevel,
    getLevels: getLevels,
    getStamp: getStamp,
    levels: getLevels()
}
//#endregion