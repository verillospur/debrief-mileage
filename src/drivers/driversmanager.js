//
// driversmanager.js
//
'use strict';

const log = require('../log');
const config = require('../config');

const manager = () => {
    const o = {
        get_drivers() {
            return [...this._drivers];
        }
        ,
        add_driver(driver) {
            const lg = msg => { log.add(`[driver-manager.add_driver]: ${msg}`, log.levels.verbose); };
            lg('started');

            this._drivers.push(driver);
        }
        ,
        save() {
            const lg = msg => { log.add(`[driver-manager.save]: ${msg}`, log.levels.verbose); };
            lg('started');

            const json = JSON.stringify(this._drivers);

            const filepath = config.DRIVERS.DATA_FILE_PATH;
            lg(`drivers file: ${filepath}`);
            
            lg('writing file...');
            const fs = require('fs');
            fs.writeFileSync(filepath, json, 'utf-8');
            

            lg('finished');
        }
        ,
        load() {
            const lg = msg => { log.add(`[driver-manager.load]: ${msg}`, log.levels.verbose); };
            lg('started');

            const filepath = config.DRIVERS.DATA_FILE_PATH;
            lg(`drivers file: ${filepath}`);

            const fs = require('fs');
            
            let drivers;
            if (fs.existsSync(filepath)) {
                lg('drivers file exists.');

                const buffer = fs.readFileSync(filepath, 'utf-8');
                const json = buffer.toString();
    
                // read it into object
                drivers = JSON.parse(json);

                lg(`loaded ${drivers.length} driver(s)`);
            }
            else {
                lg('drivers file does not exist.');
                lg('using emtpy array.');
                drivers = [];
            }
            
            this._drivers = drivers;

            lg('finished');
        }
    };
    o._drivers = [];
    return o;
};

module.exports = manager();