//
// webui/server.js 
//
'use strict';

const config = require('../config');
const log = require('../log');

const path = require('path');
const { BADFAMILY, BADHINTS } = require('dns');

const get_file_path = filename => {
    const path = require('path');
    const fs = require('fs');

    const dirpath = path.join(config.REPORTS_DIR_PATH, 'exports');
    if (!fs.existsSync(dirpath)) {
        fs.mkdirSync(dirpath, { recursive: true });
    }

    return path.join(dirpath, filename);
};

const server = function() {

    require('../setpaths').run();
    
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
        
        const formidable = require('formidable');
        app.post('/', (req, res) => {
            try {

                const _bag = {};
                const attempt_completion = bag => {
                    if (bag.file 
                        && bag.dateFrom 
                        && bag.dateTo
                        && (!bag.reportId) {

                        }

                    if (bag.reportId) {
                        res.redirect(`/reportid=${bag.reportId}`)
                    }}
                };

                new formidable.IncomingForm().parse(req)
                    .on('field', (name, field) => {
                        lg(`Field: ${name};${field}`);
                        if (name === 'startdate') {
                            _bag.dateFrom = field;
                        }
                        if (name === 'enddate') {
                            _bag.dateTo = field;
                        }
                    })
                    .on('fileBegin', (name, file) => {
                        try {
                            if (file.name) {
                                file.path = get_file_path(file.name);
                            } 
                            else {
                                res.end('<h1>Please select a file!</h1>');
                            }
                        } catch (err) {
                            lg(`Error: ${err}`);
                            res.end(`ERROR: ${err}`);
                        }
                    })
                    .on('file', (name, file) => {
                        lg(`File: ${name}:${file.name}`);
                        lg(file.path);
                    })
                    .on('aborted', () => {
                        lg('Aborted!');
                    })
                    .on('error', (err) => {
                        lg(`Error: ${err}`);
                        // throw err;
                        res.end(`ERROR: ${err}`);
                    })
                    .on('end', () => {
                        res.end();
                    });

            } catch (err) {
                lg(`Error: ${err}`);
                res.end(`ERROR: ${err}`);
            }
        });
        

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