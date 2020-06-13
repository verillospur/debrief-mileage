//
// driver.js
//
'use strict';

class driver {
    constructor(name) {
        this._name = name;
    }

    //#region properties

    get name() {
        return this._name;
    }
    set name(v) {
        this._name = v;
    }

    //#endregion

}

module.exports = driver;