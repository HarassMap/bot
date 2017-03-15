const Request = require('../utils/request');
const MESSAGES = require('../utils/messages');

module.exports = (request) => {
    return request.getUser()
        .then((userInfo) => {
            Request.postRequest(Request.URLS.FB_MESSAGES, {
                recipient: {id: userInfo.id},
                message: {
                    text: MESSAGES.WHERE_DID_THE_INCIDENT_HAPPEN.message,
                    quick_replies: [{'content_type': 'location'}]
                }
            });
        });
};
