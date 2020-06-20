//
// webui/routes/index.js
//
'use strict';

const log = require('../../log');
const lg = msg => { log.add(`[index_router()]: ${msg}`, 'verbose'); };

const config = require('../../config');

const get_router = context => {

    lg('started');
    const express = require('express');
    const router = express.Router();

    lg('router.get()');
    router.get('/', 
        function (req, res, next) {
            lg('started');
            
            // get report id
            const reportid = req.query.reportid;
            lg(`got report id: ${reportid}`);

            let r = null;
            if (reportid) {
                const report = require('../../report');
                r = report.load(reportid);
            }

            lg('rendering');
            res.render(
                config.WEBAPP.VIEW_INDEX,
                {
                    page_title: 'Driver Mileage Helper',
                    report_id: reportid,
                    report: r,
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