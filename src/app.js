//
// app.js
//
'use strict';

const log = require('./log');
const config = require('./config');

const setupMoment = require('./setup-moment');
setupMoment.run();

const welcome = require('./welcome');
welcome.run();

// const workflow = require('./workflow');
// workflow.run();


const reportid = 1;
const report = require('./report');
const r = report.load(reportid);


r.drivers[0].datablocks[0].data.forEach(d => {
    log.add(': ' + d);
});
