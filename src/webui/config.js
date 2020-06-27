//
// webui/config.js
//
'use strict';

const config = () => {

    return {
      
        // * Auto-start server on first request for app
        //
        AUTO_START: true,

        // * Port to listen on
        PORT: process.env.WEBAPP_PORT || 3000,
        
        // * Directory names for various server dwubs
        // * Relative to ~/server/
        //
        STATIC_ROOT: 'static',
        VIEWS_ROOT: 'views',
        
        // * View names
        VIEW_INDEX: 'index',
        VIEW_VISITLOGS: 'visitlogs',
        // VIEW_DATA: 'data',

    };
};

module.exports = config();