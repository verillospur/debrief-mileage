//
// reportId.js
//
'use strict';

const config = require('./config');
const { parseZone } = require('moment');

const testNewId = () => {
    const reports = load_reports();
    let highId = 0;
    if (reports.length > 0) {
        highId = reports.sort((x, y) => y.id - x.id)[0].id;
    }
    const newId = highId + 1;
    return newId;
};

const newId = (params = { exportFilePath, exportFilename, filterDateFrom, filterDateTo }) => {
    
    const reports = load_reports();
    
    let highId = 0;
    if (reports.length > 0) {
        highId = reports.sort((x, y) => y.id - x.id)[0].id;
    }

    const newId = highId + 1;
    
    save(newId, params);

    return newId;

};

const load_reports = () => {
    
    // load reports from file
    const filepath = config.REPORTS_FILE_PATH;
    const fileman = require('./fileman');
    const reportsJson = fileman.readFile(filepath);
    let reports = [];
    if (reportsJson) {
        reports = JSON.parse(reportsJson);
    }
    return reports;
};

const save = (
    id
    , params = { exportFilePath, exportFilename, filterDateFrom, filterDateTo }
    ) => {
    //

    // load reports from file
    const reports = load_reports();

    // create object
    const report = {
        id: id, 
        params: params
    };

    // save it again
    reports.push(report);
    const reportsJson = JSON.stringify(reports);
    const filepath = config.REPORTS_FILE_PATH;
    const fileman = require('./fileman');
    fileman.writeFile(filepath, reportsJson);

};

const load = id => {
    
    const reports = load_reports();
    return reports.find(r => r.id == id);
};

module.exports = {
    newId: newId,
    testNewId: testNewId,
    save: save,
    load: load,
};