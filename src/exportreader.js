//
// exportreader.js
//
'use strict';

//#region datablock class

class datablock {

    constructor() {
        this._data = [];
        this._driverName = '(driver)';
        this._datePosted = new Date();
        this._dateWorked = new Date();
        this._mileageData = '<none>';
    }

    //#region properties

    get data() {
        return this._data;
    }
    set data(v) {
        this._data = v;
    }

    get driverName() {
        return this._driverName;
    }
    set driverName(v) {
        this._driverName = v;
    }

    get datePosted() {
        return this._datePosted;
    }
    set datePosted(v) {
        this._datePosted = v;
    }

    get dateWorked() {
        return this._dateWorked;
    }
    set dateWorked(v) {
        this._dateWorked = v;
    }

    get mileageData() {
        return this._mileageData;
    }
    set mileageData(v) {
        this._mileageData = v;
    }

    //#endregion
}

//#endregion

const log = require('./log');

//#region is_block_start()
const is_block_start = row => {
    let rv = false;
    if (row) {
        const r = row;
        const cb = (n, v) => { return (r[n] == v); };

        if (cb(2, '/') && cb(5, '/') && cb(10, ',') && cb(14, ':') && cb(18, '-')) {

            if (row.substring(20).includes(':')) {

                rv = true;
            }
        }
    }
    return rv;
};
//#endregion

//#region read()
const read = data => {
    const lg = msg => { log.add(`[exportreader]: ${msg}`, log.levels.verbose); };
    lg('started');

    const datarows = data.toString().split('\n');
    lg(`processing ${datarows.length} row(s)`)

    const blocks = [];
    let current_block;
    datarows.forEach(row => {

        // lg(`processing: ${row}`);

        if (is_block_start(row)) {

            const b = new datablock();
            current_block = b;
            blocks.push(b);

            const d = row.substring(20);
            const name = d.substring(0, d.indexOf(':'));
            b.driverName = name;

            const postedAt = row.substring(0, 17)
            b.datePosted = postedAt;
        } 

        if (current_block) {

            current_block.data.push(row);
            current_block._datePosted

            const m_l_i_ = ['mileage', 'milege', 'milage', 'miles'];
            const r = row;
            if (m_l_i_.find(s => { return (r.includes(s)); })) {

                const m_d = r.substring(r.indexOf(':') +1).trim();
                current_block.mileageData = m_d;    // + ` (${r})`;    //r;
                current_block.mileageData_datarow = r;
            }


        }

    });

    return blocks;

    lg('finished');
};
//#endregion

module.exports = {
    read: read
};
