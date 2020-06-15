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

const workflow = require('./workflow');
workflow.run();

