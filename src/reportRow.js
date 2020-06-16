//
// reportRow.js
//
'use strict';

class reportRow {
    constructor() {
        this._rowNumber = 0;
        this._driver = '';
        this._mileageTotal = '';
        this._details = [];
    }

    get rowNumber() {
        return this._rowNumber;
    }
    set rowNumber(v) {
        this._rowNumber = v;
    }

    get driver() {
        return this._driver;
    }
    set driver(v) {
        this._driver = v;
    }

    get mileageTotal() {
        return this._mileageTotal;
    }
    set mileageTotal(v) {
        this._mileageTotal = v;
    }

    get details() {
        return this._details;
    }
    set details(v) {
        this._details = v;
    }
}


module.exports = reportRow;