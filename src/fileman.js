//
// fileman.js
//
'use strict';

const readFile = filepath => {
    
    const fs = require('fs');
    let data = null;
    if (fs.existsSync(filepath)) {
        data = fs.readFileSync(filepath, 'utf-8');
    }
    return data;
};

const writeFile = (filepath, data) => {

    const fs = require('fs');
    fs.writeFileSync(filepath, data, 'utf-8');
    return true;
};

module.exports = {
    readFile: readFile,
    writeFile: writeFile
};