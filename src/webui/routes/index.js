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

            let visitlog_data = `ip:{${req.ip.toString()}|${req.connection.remoteAddress.toString()}|${req.headers['x-forwarded-for']}}};url:{${req.originalUrl}};`;
            let r = null;
            let showNotice = true;
            let hideForm = false;
            if (reportid) {
                const report = require('../../report');
                r = report.load(reportid);
                showNotice = false;
                hideForm = true;
                visitlog_data = `reportid:{${reportid}};`
                    + visitlog_data;
            }
            require('../../igor').log_visit(visitlog_data);

            lg('rendering');
            res.render(
                config.WEBAPP.VIEW_INDEX,
                {
                    page_title: 'Driver Mileage Helper',
                    report_id: reportid,
                    report: r,
                    showNotice: showNotice,
                    hideForm: hideForm,
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