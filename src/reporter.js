//
// reporter.js
//
'use strict';

const log = require('./log');

const report = require("./report");
const reportRow = require('./reportRow');
const reportDetail = require('./reportDetail');

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
    drivers.forEach(driver => {
        lg(`processing driver: ${driver.name}`);

        rowcount++;
        lg(`adding row: ${rowcount}`);
        const row = new reportRow();
        row.rowNumber = rowcount;
        r.rows.push(row);

        row.driver = driver.name;
        row.mileageTotal = driver.mileageTotal;
        
        // do details
        lg('creating posts details');
        const postsDetails = new reportDetail();
        postsDetails.name = 'Driver\'s Posts';
        postsDetails.data = driver.datablocks;
        row.details.push(postsDetails);

        lg('creating total details');
        const totalDetails = new reportDetail();
        totalDetails.name = 'Mileage per day';
        totalDetails.data = driver.mileageDatarows;
        row.details.push(totalDetails);
    });
    lg(`generated ${r.rows.length} row(s)`);

    lg('returning report');
    return r;
};

module.exports = {
    run: run
};