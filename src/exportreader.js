//
// exportreader.js
//
'use strict';

const datablock = require('./datablock');

const log = require('./log');
const config = require('./config');
const moment = require('moment');

//#region is_block_start()
const is_block_start = row => {
    let rv = false;
    if (row) {
        const r = row;
        const cb = (n, v) => { return (r[n] == v); };

        if (cb(2, '/') && cb(5, '/') && cb(10, ',') && cb(14, ':') && cb(18, '-')) {

            if (row.substring(20).includes(':')) {

                rv = true;
            }
        }
    }
    return rv;
};
//#endregion

//#region read()
/**
 * 
 * @param {string} data 
 * @param {*} options 
 */
const read = (data, options = { filter: { dateFrom: null, dateTo: null } }) => {

    const lg = msg => { log.add(`[exportreader]: ${msg}`, log.levels.verbose); };
    lg('started');

    const datarows = data.toString().split('\n');
    lg(`processing ${datarows.length} row(s)`);

    // filter
    let filter_date = false, filter_date_from = false, filter_date_to = false;
    let filter_date_from_value, filter_date_to_value;
    if ( (options && options.filter) && (options.filter.dateFrom || options.filter.dateTo)) {
        filter_date = true;
        if (options.filter.dateFrom) {
            filter_date_from = true;
            filter_date_from_value = moment(options.filter.dateFrom, config.FORMAT_DATE);
        }
        if (options.filter.dateTo) {
            filter_date_to = true;
            filter_date_to_value = moment(options.filter.dateTo, config.FORMAT_DATE);
        }
    }

    // get mileage data indicator strings
    const m_l_i__ = config.MILEAGE_DATA_INDICATORS;
    const m_l_i_ = m_l_i__.map(m => m.toString().toLowerCase());

    const blocks = [];
    let current_block;
    datarows.forEach(row => {

        // lg(`processing: ${row}`);

        if (is_block_start(row)) {

            const b = new datablock();
            current_block = b;
            blocks.push(b);

            const d = row.substring(20);
            const name = d.substring(0, d.indexOf(':'));
            b.driverName = name;

            const postedAt = row.substring(0, 17)
            b.datePosted = postedAt;

            b.filterAllow = true;
            if (filter_date) {
                const posted_date = moment(b.datePosted, config.FORMAT_DATE);

                let filter_allow = true;
                if (filter_date_to) {
                    filter_allow = filter_allow && posted_date.isBefore(filter_date_to_value);
                }
                
                if (filter_date_from) {
                    filter_allow = filter_allow && posted_date.isAfter(filter_date_from_value);
                }

                b.filterAllow = filter_allow;
            }
        } 

        if (current_block) {

            current_block.data.push(row);
            current_block._datePosted;
            
            // VERY IMPORTANT! (the lower-casing)
            let r = row.toString().toLowerCase();

            if (m_l_i_.find(s => { return (r.includes(s)); })) {

                if (row.toString().includes(current_block.driverName)) {
                        
                    // probably includes name/timestamp - strip it!
                    const cb = (n, v) => { return (row[n] == v); };
                    if (cb(2, '/') && cb(5, '/') && cb(10, ',') && cb(14, ':') && cb(18, '-')) {

                        r = r.substring(19 + current_block.driverName.length);
                    }
                }

                const m_d = r.substring(r.indexOf(':') +1).trim();
                current_block.mileageData.push(m_d);
                current_block.mileageData_datarow = r;

                current_block.mileageDatarows.push(row);

                current_block.mileageDataToRows.push({ data: m_d, row: r });
            }

        }

    });

    return blocks.filter(b => b.filterAllow);;

    lg('finished');
};
//#endregion

module.exports = {
    read: read
};
