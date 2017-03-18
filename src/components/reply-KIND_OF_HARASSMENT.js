const Request = require('../utils/request');
const MESSAGES = require('../utils/messages');

module.exports = (request) => {
    const message = {
        text: request.getTranslation(MESSAGES.KIND_OF_HARASSMENT),
        quick_replies: [
            {
                content_type: 'text',
                title: request.getTranslation(MESSAGES.FACIAL_EXPRESSION),
                payload: MESSAGES.FACIAL_EXPRESSION.id
            },
            {
                content_type: 'text',
                title: request.getTranslation(MESSAGES.SEXUAL_INVITES),
                payload: MESSAGES.SEXUAL_INVITES.id
            },
            {
                content_type: 'text',
                title: request.getTranslation(MESSAGES.SEXUAL_PHOTOS),
                payload: MESSAGES.SEXUAL_PHOTOS.id
            }
        ]
    };

    return request.getUser()
        .then((userInfo) => {
            return Request.postRequest(Request.URLS.FB_MESSAGES, {
                recipient: {id: userInfo.id},
                message
            });
        });
};
