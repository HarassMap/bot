const Request = require('../utils/request');
const MESSAGES = require('../utils/messages');

module.exports = (sender) => {
    return Request.postRequest(Request.URLS.FB_MESSAGES, {
        recipient: { id: sender },
        message: {
            text: MESSAGES.AT_WHICH_TIME_THE_INCIDENT_HAPPENED.message
        }
    });
};
