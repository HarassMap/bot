const Request = require('../utils/request');
const MESSAGES = require('../utils/messages');

module.exports = (sender) => {
    const message = {
        attachment: {
            type: 'template',
            payload: {
                template_type: 'button',
                text: MESSAGES.KIND_OF_HARASSMENT.message,
                buttons: [
                    {
                        type: 'postback',
                        title: MESSAGES.FACIAL_EXPRESSION.message,
                        payload: MESSAGES.FACIAL_EXPRESSION.id
                    },
                    {
                        type: 'postback',
                        title: MESSAGES.SEXUAL_INVITES.message,
                        payload: MESSAGES.SEXUAL_INVITES.id
                    },
                    {
                        type: 'postback',
                        title: MESSAGES.SEXUAL_PHOTOS.message,
                        payload: MESSAGES.SEXUAL_PHOTOS.id
                    }
                ]
            }
        }
    };

    return Request.postRequest(Request.URLS.FB_MESSAGES, {
        recipient: { id: sender },
        message
    });
};
