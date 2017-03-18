const Request = require('../utils/request');
const MESSAGES = require('../utils/messages');

module.exports = (request) => {
    const message = {
        text: request.getTranslation(MESSAGES.TYPE_OF_HARASSMENT_LOCATION),
        quick_replies: [
            {
                content_type: 'text',
                title: request.getTranslation(MESSAGES.STREET),
                payload: MESSAGES.STREET.id
            },
            {
                content_type: 'text',
                title: request.getTranslation(MESSAGES.WORKPLACE),
                payload: MESSAGES.WORKPLACE.id
            },
            {
                content_type: 'text',
                title: request.getTranslation(MESSAGES.SCHOOL_OR_UNIVERSITY),
                payload: MESSAGES.SCHOOL_OR_UNIVERSITY.id
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
