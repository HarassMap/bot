const Request = require('../utils/request');
const MESSAGES = require('../utils/messages');

module.exports = (request) => {
    const message = {
        text: MESSAGES.DID_YOU_GET_SOME_HELP_FROM_OTHERS.message,
        quick_replies: [
            {
                content_type: 'text',
                title: MESSAGES.YES.message,
                payload: MESSAGES.YES.id
            },
            {
                content_type: 'text',
                title: MESSAGES.NO.message,
                payload: MESSAGES.NO.id
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
