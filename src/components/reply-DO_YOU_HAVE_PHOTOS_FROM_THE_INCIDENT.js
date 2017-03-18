const Request = require('../utils/request');
const MESSAGES = require('../utils/messages');

module.exports = (request) => {
    return request.getUser()
        .then((userInfo) => {
            return Request.postRequest(Request.URLS.FB_MESSAGES, {
                recipient: {id: userInfo.id},
                message: {
                    text: request.getTranslation(MESSAGES.DO_YOU_HAVE_PHOTOS_FROM_THE_INCIDENT)
                }
            });
        });
};
