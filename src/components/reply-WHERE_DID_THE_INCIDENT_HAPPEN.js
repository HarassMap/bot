const Request = require('../utils/request');
const MESSAGES = require('../utils/messages');

module.exports = (sender) => {
    Request.postRequest(Request.URLS.FB_MESSAGES, {
        recipient: { id: sender },
        message: {
            text: MESSAGES.WHERE_DID_THE_INCIDENT_HAPPEN.message,
            quick_replies: [{ 'content_type': 'location' }]
        }
    });
};
