//
// config.js
//
'use strict';

const config = () => {

    return {
        
        APP_NAME: 'debrief-mileage',
        APP_WMSG: [
            'verillospur: [o] n [t] h e [w] e b',
            'a proud member of The Urchin McSchlong Group',
            'part of the Hidden Dips initiative'
            ],

        LOG: require('./log/config'),

        DRIVERS: require('./drivers/config')
    };
};

module.exports = config();