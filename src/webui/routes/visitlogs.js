//
// webui/routes/visitlogs.js
//
'use strict';

const log = require('../../log');
const lg = msg => { log.add(`[visitlogs_router()]: ${msg}`, 'verbose'); };

const config = require('../../config');

const get_router = context => {

    lg('started');
    const express = require('express');
    const router = express.Router();

    lg('router.get()');
    router.get('/', 
        function (req, res, next) {
            lg('started');
            
            lg('rendering');
            res.render(
                config.WEBAPP.VIEW_VISITLOGS,
                {
                    page_title: 'Driver Mileage Helper: Visits Log',
                }
            );
        }
    );

    lg('returning router');
    return router;
};

module.exports = {
    get_router: get_router
};