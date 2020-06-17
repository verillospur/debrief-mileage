//
// datablock.js
//
'use strict';

class datablock {

    constructor() {
        this._filterAllow = true;
        this._data = [];
        this._driverName = '(driver)';
        this._datePosted = new Date();
        this._dateWorked = new Date();
        this._mileageData = [];
        this._mileageDatarows = [];
        this._mileageDataToRows = [];
    }

    getAllData() {
        let rv = '';
        this._data.forEach(d => {
            if (rv.length > 0) rv += '\n';
            rv += d.toString();
        });
        return rv;
    }

    //#region properties

    get filterAllow() {
        return this._filterAllow;
    }
    set filterAllow(v) {
        this._filterAllow = v;
    }

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

    get mileageDatarows() {
        return this._mileageDatarows;
    }
    set mileageDatarows(v) {
        this._mileageDatarows = v;
    }

    get mileageDataToRows() {
        return this._mileageDataToRows;
    }
    set mileageDataToRows(v) {
        this._mileageDataToRows = v;
    }

    //#endregion
}

module.exports = datablock;
