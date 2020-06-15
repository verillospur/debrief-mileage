//
// dataorg.js
//
'use strict';

const log = require('./log');
const config = require('./config');

const moment = require('moment');

const SAFEGUARD_MILEAGEDATA_MAXLENGTH = config.SAFEGUARD_MILEAGEDATA_MAXLENGTH || 50;
const SAFEGUARD_MILEAGE_MAX = config.SAFEGUARD_MILEAGE_MAX || 500;

const driver = require('./drivers/driver');

const org = blocks => {
    const lg = msg => { log.add(`[dataorg]: ${msg}`, log.levels.verbose); };
    lg('started');

    const names = [];
    const posteds = [];
    const datarows_counts = [];
    const datarows = [];
    let total_rows = 0;

    blocks.forEach(b => {
        total_rows += b.data.length;

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

    // org into drivers->blocks|mileage|etc
    const drivers = [];
    names.forEach(name => {
        const dr = new driver(name);
        drivers.push(dr);

        // assign blocks per driver, plus direct driver->mileage rows/data (driver->mileage + driver->block->mileage)
        blocks.filter(b => b.driverName == name).forEach(b => dr.datablocks.push(b));
        dr.datablocks.forEach(b => b.mileageDatarows.forEach(r => dr.mileageDatarows.push(r)));
        dr.datablocks.forEach(b => b.mileageData.forEach(d => dr.mileageData.push(d)));
        dr.datablocks.forEach(b => b.mileageDataToRows.forEach(r => dr.mileageDataToRows.push(r)));
    });

    // add up mileage
    let total_miles = 0;
    drivers.forEach(
        dr => {

            dr.mileageData.forEach(
                mileageData => {
                    
                    let data = mileageData;

                    // safeguards
                    let processThis = true;
                    if (data.length > SAFEGUARD_MILEAGEDATA_MAXLENGTH) {
                        dr.junkDatarows.push(data);
                        processThis = false;
                    }
                    if (processThis) {

                        const numbers = data.toString().replace(/[^0-9.]/g, '');
                        const num = Number(numbers);
                        if (num && !isNaN(num)) {

                            // more safeguarding
                            if (num > SAFEGUARD_MILEAGE_MAX) {
                                dr.junkDatarows.push(data);
                                processThis = false;
                            }
                            if (processThis) {

                                dr.mileageTotal += num;
                                dr.mileageTotalSums.push(num);
                                dr.mileageTotalData.push(numbers);

                                total_miles += num;
                            }
                        }
                    }
                }
            );
        }
    );

    // get dates
    const first_listed_date = moment(drivers[0].datablocks[0].datePosted, config.FORMAT_DATE);
    let date_first = first_listed_date, date_last = first_listed_date;
    drivers.forEach(
        driver => {
            driver.datablocks.forEach(
                block => {
                    const block_date = moment(block.datePosted, config.FORMAT_DATE);
                    if (block_date.isBefore(date_first)) date_first = block_date;
                    if (block_date.isAfter(date_last)) date_last = block_date;
                }
            );
        }
    );

    lg('finished');

    lg('found:');
    lg(`  - ${total_miles} total mile(s)`);
    lg(`  - between ${date_first.toDate().toDateString()} and ${date_last.toDate().toDateString()}`);
    lg(`  - for ${drivers.length} driver(s)`);
    lg(`  - from ${blocks.length} datablocks (posts)`);

    return drivers;
};

module.exports = {
    run: org
};