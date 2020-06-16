//
// webui/server.js 
//
'use strict';

const config = require('../config');
const log = require('../log');

const path = require('path');

const server = function() {
    
    const context = { expressApp: 'not-initialised' };
    const indexRouter = require('./routes/index');
    // const dataRouter = require('./routes/data');

    const start_server = () => {
        const lg = msg => { log.add(`[webui]: ${msg}`, log.getLevels().verbose); };
        lg('started');

        lg('setting up express app');
        const express = require('express');
        const app = express();
        context.expressApp = app;

        // setup views
        app.set('views', path.join(__dirname, config.WEBAPP.VIEWS_ROOT));
        app.set('view engine', 'ejs');
        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));

        // set static root
        app.use(express.static(path.join(__dirname, config.WEBAPP.STATIC_ROOT)));

        // setup routes
        app.use('/', indexRouter.get_router(context));
        // app.use('/data', dataRouter.get_router(context));
           
        

        lg('finished');
    };

    const get_expressapp = () => {
        return context.expressApp;
    };

    if (config.WEBAPP.AUTO_START) {
        start_server();
    }
    
    return {
        
        start: () => {
            start_server();
        },
        getExpressApp: () => { return get_expressapp(); },
    };
    
};

module.exports = server();