//
// reportDetail.js
//
'use strict';

class reportDetail {
    constructor() {
        this._name = '';
        this._helpInfo = '';
        this._data = null;
        this._renderer = null;
    }

    get name() {
        return this._name;
    }
    set name(v) {
        this._name = v;
    }

    get helpInfo() {
        return this._helpInfo;
    }
    set helpInfo(v) {
        this._helpInfo = v;
    }

    get data() {
        return this._data;
    }
    set data(v) {
        this._data = v;
    }

    get renderer() {
        return this._renderer;
    }
    set renderer(v) {
        this._renderer = v;
    }
}

module.exports = reportDetail;