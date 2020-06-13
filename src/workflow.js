//
// workflow.js
//
'use strict';

const log = require('./log');
const lg = msg => { log.add(`[workflow]: ${msg}`, log.levels.verbose); };

const workflow = () => {

    return {

        run() {
            lg('started');

            // get drivers list
            lg('get drivers list');
        
            const dman = require('./drivers/driversmanager');
            dman.add_driver({ name: 'Ben' });
            lg('drivers: ' + dman.get_drivers()[0].name)

            // get exported data
            const export_path = 'c:\\dev\\verillospur\\server\\debrief-mileage\\src\\data\\sample_export.txt';
            const fs = require('fs');
            const export_data = fs.readFileSync(export_path, 'utf-8');
            const reader = require('./exportreader');
            const blocks = reader.read(export_data);
            lg(`got ${blocks.length} block(s)`);

            const names = [];
            const posteds = [];
            const datarows_counts = [];
            const datarows = [];
            blocks.forEach(b => {
                const name = b.driverName;
                if (!names.includes(name)) {
                    names.push(name);
                }

                const posted = b.datePosted;
                if (!posteds.includes(posted)) {
                    posteds.push(posted);
                }

                const rowcount = b.data.length;
                if (!datarows_counts.includes(rowcount)) {
                    datarows_counts.push(rowcount);
                    const db = [];
                    db.push(b);
                    datarows.push({rows: rowcount, count: 1, data: db});
                }
                else {
                    const o = datarows.find((v) => { return (v.rows == rowcount); });
                    if (o) {
                        o.count = o.count + 1;
                        o.data.push(b);
                    }
                }
            });

            lg(`got ${names.length} name(s):`);
            names.forEach(
                n => { 
                    lg(`[${n}]`); 
                }
            );

            datarows.forEach(dr => {
                lg(`datarows: ${dr.rows}: ${dr.count}`);
                if (dr.rows == 1 && false) {
                    dr.data.forEach(b => {
                        const d = b.data[0];
                        lg(d);
                    });
                }
                if (dr.rows == 13 && true) {
                    dr.data.forEach(b => {
                        const md = b.mileageData;
                        lg(`mileageData: ${md}`);
                    });
                }
            });


            // get date range

            // each driver: find workday-datas in date range

            // extract mileage from workday-datas

            // 


            lg('finished');
        }
    }
};

module.exports = workflow();