const Request = require('../utils/request');
const MESSAGES = require('../utils/messages');

module.exports = (request) => {
    return request.getUser()
        .then((userInfo) => {
            return Request.postRequest(Request.URLS.FB_MESSAGES, {
                recipient: { id: userInfo.id },
                message: {
                    text: request.getTranslation(MESSAGES.AT_WHICH_TIME_THE_INCIDENT_HAPPENED)
                }
            });
        });
};
