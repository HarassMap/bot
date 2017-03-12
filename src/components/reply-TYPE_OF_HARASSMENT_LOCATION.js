const Request = require('../utils/request');
const MESSAGES = require('../utils/messages');

module.exports = (sender) => {
    const message = {
        text: MESSAGES.TYPE_OF_HARASSMENT_LOCATION.message,
        quick_replies: [
            {
                content_type: 'text',
                title: MESSAGES.STREET.message,
                payload: MESSAGES.STREET.id
            },
            {
                content_type: 'text',
                title: MESSAGES.WORKPLACE.message,
                payload: MESSAGES.WORKPLACE.id
            },
            {
                content_type: 'text',
                title: MESSAGES.SCHOOL_OR_UNIVERSITY.message,
                payload: MESSAGES.SCHOOL_OR_UNIVERSITY.id
            }
        ]
    };

    return Request.postRequest(Request.URLS.FB_MESSAGES, {
        recipient: { id: sender },
        message
    });
};
