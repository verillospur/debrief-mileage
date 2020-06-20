//
// reporter.js
//
'use strict';

const log = require('./log');
const config = require('./config');
const moment = require('moment');

const report = require("./report");
const reportRow = require('./reportRow');
const reportDetail = require('./reportDetail');
const renderer = require('./renderer');

const run = (
    params = { 
        exportFilePath
        , exportFilename
        , filterDateFrom
        , filterDateTo
     }) => {
    //
    const lg = msg => { log.add(`[reporter.run()]: ${msg}`, log.levels.verbose); };
    lg('started');
    
    lg('creating new report');
    const r = new report();
    r.exportFilePath = params.exportFilePath;
    r.exportFilename = params.exportFilename;
    r.filterDateFrom = params.filterDateFrom;
    r.filterDateTo = params.filterDateTo;
    r.dateExecuted = new Date();

    lg(`exportFilePath: ${r.exportFilePath}`);
    lg(`exportFilename: ${r.exportFilename}`);
    lg(`filterDateFrom: ${r.filterDateFrom}`);
    lg(`filterDateTo: ${r.filterDateTo}`);
    
    if (
        moment(r.filterDateFrom).isSame(moment(r.filterDateTo), 'day') 
        ) {
            // no date filter
            lg('applying max/min date filter');
            r.filterDateFrom = moment().subtract(100, 'year');
            r.filterDateTo = moment().add(100, 'year');
        }

    // load export data
    lg(`loading export data from: ${r.exportFilePath}`);
    const fileman = require('./fileman');
    const exportdata = fileman.readFile(r.exportFilePath);

    // generate
    lg('running exportreader');
    const reader = require('./exportreader');
    const blocks = reader.read(exportdata, { dataFrom: r.filterDateFrom, dateTo: r.filterDateTo });

    // org
    lg('running dataorg');
    const dataorg = require('./dataorg');
    const drivers = dataorg.run(blocks);
    
    // create rows
    lg('generating report rows');
    let rowcount = 0;
    let total_miles = 0;
    let total_blocks = 0;
    drivers.forEach(driver => {
        lg(`processing driver: ${driver.name}`);

        rowcount++;
        lg(`adding row: ${rowcount}`);
        const row = new reportRow();
        row.rowNumber = rowcount;
        r.rows.push(row);

        row.driver = driver.name;
        row.mileageTotal = driver.mileageTotal;
        total_miles += row.mileageTotal;
        total_blocks += driver.datablocks.length;
        lg(`- driver: ${row.driver}`);
        lg(`- miles: ${row.mileageTotal}`);
        lg(`- blocks: ${driver.datablocks.length}`);

        // do details
        lg('creating posts details');
        const postsDetails = new reportDetail();
        postsDetails.name = config.REPORT_DETAIL_NAME_POSTS;
        postsDetails.data = driver.datablocks;
        postsDetails.renderer = new renderer('posts');
        row.details.push(postsDetails);

        lg('creating total details');
        const totalDetails = new reportDetail();
        totalDetails.name = config.REPORT_DETAIL_NAME_MILEAGEDATA;
        totalDetails.data = driver.mileageDatarows;
        totalDetails.renderer = new renderer('mileagedata');
        row.details.push(totalDetails);

        lg('creating junk details');
        if (driver.junkDatarows.length > 0) {
            const junkDetails = new reportDetail();
            junkDetails.name = config.REPORT_DETAIL_NAME_JUNK;
            junkDetails.data = driver.junkDatarows;
            junkDetails.renderer = new renderer('junk');
            row.details.push(junkDetails);
        }
    });
    lg(`generated ${r.rows.length} row(s)`);

    lg(`got ${total_miles} total mile(s)`);
    r.totalMiles = total_miles;

    lg(`got ${total_blocks} total block(s)`);
    r.totalBlocks = total_blocks;

    r.filterDateFrom = moment(r.filterDateFrom).format(config.FORMAT_DATE);
    r.filterDateTo = moment(r.filterDateTo).format(config.FORMAT_DATE);

    lg('returning report');
    return r;
};

module.exports = {
    run: run
};