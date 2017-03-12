const path = require('path');
const fs = require('fs');

const listFilesSync = (dir, regex) => fs.readdirSync(dir)
    .map(file => {
        if (fs.statSync(path.join(dir, file)).isFile() && file.match(regex)) {
            return file;
        }
    })
    .filter(file => file);

module.exports = {
    listFilesSync
};
