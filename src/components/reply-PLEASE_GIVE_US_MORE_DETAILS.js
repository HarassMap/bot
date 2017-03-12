const Request = require('../utils/request');
const MESSAGES = require('../utils/messages');

module.exports = (sender) => {
    return Request.postRequest(Request.URLS.FB_MESSAGES, {
        recipient: { id: sender },
        message: {
            text: MESSAGES.PLEASE_GIVE_US_MORE_DETAILS.message
        }
    });
};
