//
// app.js
//
'use strict';

const log = require('./log');
const config = require('./config');


log.add(`-- ${config.APP_NAME} --`);

const workflow = require('./workflow');
workflow.run();