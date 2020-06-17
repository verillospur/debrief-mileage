//
// reportRow.js
//
'use strict';

const config = require('./config');

class reportRow {
    constructor() {
        this._rowNumber = 0;
        this._driver = '';
        this._mileageTotal = '';
        this._details = [];
    }

    hasDetails() {
        return (this._details && (this._details.length > 0))
    }

    getDetails_mileagedata() {
        return this.getDetails(config.REPORT_DETAIL_NAME_MILEAGEDATA);
    }
    
    getDetails_posts() {
        return this.getDetails(config.REPORT_DETAIL_NAME_POSTS);
    }

    getDetails(name) {
        let rv = null;
        if (this._details) {
            rv = this._details.find(d => d.name == name);
        }
        return rv;
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