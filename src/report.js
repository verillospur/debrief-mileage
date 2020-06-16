//
// report.js
//
'use strict';

class report {
    constructor() {
        this._id = '';
        this._dateExecuted = new Date();
        this._exportFilename = '';
        this._filterDateFrom = null;
        this._filterDateTo = null;
        this._rows = [];
    }


    /**
     * Generate a report from data in the specified file.
     * Returns report object.
     * @param {Object} params Object specifying export data file and filter values
     */
    static create(params = { exportFilePath, exportFilename, filterDateFrom, filterDateTo }) {

        const rptr = require('./reporter');
        const report = rptr.run(params);

        return report;
    }

    /**
     * Loads the parameters stored against the specified id, 
     * and generates a report from them.
     * Returns report object.
     * @param {Number} id The id the report parameters are stored against
     */
    static load(id) {

        const idman = require('./reportId');
        const params = idman.load(id).params;
        return report.create(params);
    }


    get id() {
        return this._id;
    }
    set id(v) {
        this._id = v;
    }

    get dateExecuted() {
        return this._dateExecuted;
    }
    set dateExecuted(v) {
        this._dateExecuted = v;
    }

    get exportFilename() {
        return this._exportFilename;
    }
    set exportFilename(v) {
        this._exportFilename = v;
    }

    get filterDateFrom() {
        return this._filterDateFrom;
    }
    set filterDateFrom(v) {
        this._filterDateFrom = v;
    }

    get filterDateTo() {
        return this._filterDateTo;
    }
    set filterDateTo(v) {
        this._filterDateTo = v;
    }

    get rows() {
        return this._rows;
    }
    set rows(v) {
        this._rows = v;
    }
}

module.exports = report;