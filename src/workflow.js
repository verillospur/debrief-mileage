//
// workflow.js
//
'use strict';

const log = require('./log');
const lg = msg => { log.add(`[workflow]: ${msg}`, log.levels.verbose); };

const config = require('./config');
const moment = require('moment');

const   filter_dateFrom = null,
        filter_dateTo = null;

const show_report = false;

const workflow = () => {

    return {

        run() {
            lg('started');

            
            const params = {
                filterDateFrom: new Date(),
                filterDateTo: new Date(),
                exportFilePath: config.TEST_EXPORT_FILE_PATH,
                exportFilename: 'test-export-data.txt'
            };

            lg('storing params...');
            const manager = require('./reportId');
            const reportid = manager.newId(params);
            lg(`stored params against id: ${reportid}`);

            lg('running report');
            const reporter = require('./reporter');
            const report = reporter.run(params);
            report.id = reportid;

            lg(`generated ${report.rows.length} report row(s)`);
        }


        ,
        _run_depr_() {
            lg('started');

            // // get drivers list
            // lg('get drivers list');
        
            // const dman = require('./drivers/driversmanager');
            // dman.add_driver({ name: 'Ben' });
            // lg('drivers: ' + dman.get_drivers()[0].name)


            // get exported data
            const export_path = config.TEST_EXPORT_FILE_PATH;
            const fs = require('fs');
            const export_data = fs.readFileSync(export_path, 'utf-8');

            // read into objects
            const reader = require('./exportreader');
            const blocks = reader.read(export_data, { filter: { dateFrom: filter_dateFrom, dateTo: filter_dateTo } });
            lg(`got ${blocks.length} block(s)`);


            // process stats
            const dataorg = require('./dataorg');
            const drivers = dataorg.run(blocks);

            // report
            if (show_report) {
                drivers.sort((y, x) => x.mileageTotal - y.mileageTotal).forEach(
                    driver => {
                        
                        lg(`${driver.name}: ${driver.mileageTotal} miles`);

                        // show junk data
                        if (driver.junkDatarows.length > 0) {
                            // lg(`  (${driver.junkDatarows.length} junk data row(s))`);
                            driver.junkDatarows.forEach(
                                jd => {
                                    const md = driver.mileageDataToRows.find(
                                        dtr => dtr.data == jd
                                    );

                                    lg(`  junk: ${jd}`);
                                    // lg(`  drow: ${md && md.row}`);
                                }
                            );
                        }

                        if (driver.name == 'Bruno') {
                            driver.mileageDatarows.forEach(
                                dtr => lg(`   ${dtr}`)
                            );
                        }
                    }
                );
            }


            lg('finished');
        }
    }
};

module.exports = workflow();