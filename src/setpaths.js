//
// setpaths.js
//
'use strict';

const config = require('./config');
const path = require('path');

const set_paths = () => {

    config.REPORTS_FILE_PATH = path.join(__dirname, 'data', 'reports.json');
    config.TEST_EXPORT_FILE_PATH = path.join(__dirname, 'data', 'sample_export.txt');
    config.DRIVERS.DATA_FILE_PATH = path.join(__dirname, 'data', 'drivers.json');
};

module.exports = {
    run: set_paths
};