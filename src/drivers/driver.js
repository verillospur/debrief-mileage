//
// driver.js
//
'use strict';

class driver {
    constructor(name) {
        this._name = name;
        this._datablocks = [];
        this._mileageDatarows = [];
        this._mileageData = [];
        this._mileageTotal = 0;
        this._mileageTotalData = [];
        this._mileageTotalSums = [];
        this._junkDatarows = [];
        this._mileageDataToRows = [];
    }

    //#region properties

    get name() {
        return this._name;
    }
    set name(v) {
        this._name = v;
    }

    get datablocks() {
        return this._datablocks;
    }
    set datablocks(v) {
        this._datablocks = v;
    }

    get mileageDatarows() {
        return this._mileageDatarows;
    }
    set mileageDatarows(v) {
        this._mileageDatarows = v;
    }

    get mileageData() {
        return this._mileageData;
    }
    set mileageData(v) {
        this._mileageData = v;
    }

    get mileageTotal() {
        return this._mileageTotal;
    }
    set mileageTotal(v) {
        this._mileageTotal = v;
    }

    get mileageTotalData() {
        return this._mileageTotalData;
    }
    set mileageTotalData(v) {
        this._mileageTotalData = v;
    }

    get mileageTotalSums() {
        return this._mileageTotalSums;
    }
    set mileageTotalSums(v) {
        this._mileageTotalSums = v;
    }

    get junkDatarows() {
        return this._junkDatarows;
    }
    set junkDatarows(v) {
        this._junkDatarows = v;
    }

    get mileageDataToRows() {
        return this._mileageDataToRows;
    }
    set mileageDataToRows(v) {
        this._mileageDataToRows = v;
    }

    //#endregion

}

module.exports = driver;