const Request = require('../utils/request');
const MESSAGES = require('../utils/messages');

module.exports = (request) => {
    const message = {
        text: MESSAGES.KIND_OF_HARASSMENT.message,
        quick_replies: [
            {
                content_type: 'text',
                title: MESSAGES.FACIAL_EXPRESSION.message,
                payload: MESSAGES.FACIAL_EXPRESSION.id
            },
            {
                content_type: 'text',
                title: MESSAGES.SEXUAL_INVITES.message,
                payload: MESSAGES.SEXUAL_INVITES.id
            },
            {
                content_type: 'text',
                title: MESSAGES.SEXUAL_PHOTOS.message,
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
