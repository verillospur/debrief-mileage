//
// igor.js
//
'use strict';

const log_visit = visit_data => {
    try {

        const fs = require('fs');
        const path = require('path');

        const load_visits = () => {
            const _filepath = path.join(__dirname, 'data', 'visits.json');
            let _visits_obj = [];
            if (fs.existsSync(_filepath)) {
                const _visits_data_buffer = fs.readFileSync(_filepath, 'utf-8');
                const _visits_data = _visits_data_buffer.toString();
                _visits_obj = JSON.parse(_visits_data);
            }
            return _visits_obj;
        };

        const save_visits = visits => {
            const _filepath = path.join(__dirname, 'data', 'visits.json');
            const _visits_data = JSON.stringify(visits);
            fs.writeFileSync(_filepath, _visits_data, 'utf-8');
        }

        let vt = visit_data;
        if (visit_data) {
            vt = visit_data.toString();
        }


        //
        const moment = require('moment');
        const today = moment();
        const visit = {
            timestamp: today,
            data: vt
        };
        const visits = load_visits();
        visits.push(visit);
        save_visits(visits);



    } catch (err) {
        try {
            console.error('Error logging visit.');
            console.error(err);
        } catch (err_err) {
            // don't do naaaahhhh-ffing
        }
    }
};

module.exports = {
    log_visit: log_visit
};