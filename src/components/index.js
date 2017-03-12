const path = require('path');
const { listFilesSync } = require('../utils/fs');

const REPLY_FILE_REGEX = /reply-([\w-]+)\.js/;

const allReplyFiles = listFilesSync(path.resolve(__dirname, './'), REPLY_FILE_REGEX)
    .reduce((all, file) => {
        const replyType = file.substr(file.indexOf('reply-')+6);

        all[replyType] = require(path.resolve(__dirname, file));
        return all;
    }, {});

module.exports = allReplyFiles;
