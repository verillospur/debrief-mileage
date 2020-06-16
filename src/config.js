//
// config.js
//
'use strict';

const process = require('process');

const config = () => {

    return {
        
        APP_NAME: 'debrief-mileage',
        APP_WMSG: [
            'verillospur: [o] n [t] h e [w] e b',
            'member of The Urchin McSchlong Group',
            '[...the Hidden Dips initiative]'
            ]
        ,
        LOG: require('./log/config')
        ,
        DRIVERS: require('./drivers/config')
        ,
        WEBAPP: require('./webui/config')
        ,
        TEST_EXPORT_FILE_PATH: 
            process.env.TEST_EXPORT_FILE_PATH
            ||
            'c:\\dev\\verillospur\\server\\debrief-mileage\\src\\data\\sample_export.txt'
        ,
        MILEAGE_DATA_INDICATORS:
            process.env.MILEAGE_DATA_INDICATORS.split('|')
            ||
            ['mileage', 'milege', 'milage', 'miles', 'mls']
        ,
        SAFEGUARD_MILEAGEDATA_MAXLENGTH:
            Number(process.env.SAFEGUARD_MILEAGEDATA_MAXLENGTH)
            || 50
        ,
        SAFEGUARD_MILEAGE_MAX:
            Number(process.env.SAFEGUARD_MILEAGE_MAX)
            || 500
        ,
        FORMAT_DATE:
            process.env.FORMAT_DATE
            || "DD/MM/YYYY"
        ,
        EXPORT_FORMAT_DATE:
            process.env.EXPORT_FORMAT_DATE
            || "DD/MM/YYYY, hh:mm"
        ,
        EXPORT_FORMAT_DATEPOSTED:
            process.env.EXPORT_FORMAT_DATEPOSTED
            || "DD/MM/YYYY, hh:mm"
        ,
        REPORTS_FILE_PATH: 
            process.env.REPORTS_FILE_PATH
            ||
            'c:\\dev\\verillospur\\server\\debrief-mileage\\src\\data\\reports.json'
        ,
    };
};

module.exports = config();