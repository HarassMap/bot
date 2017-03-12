const Request = require('../utils/request');
const MESSAGES = require('../utils/messages');

module.exports = (sender) => {
    const message = {
        attachment: {
            type: 'template',
            payload: {
                template_type: 'button',
                text: MESSAGES.TYPE_OF_LOCATION.message,
                buttons: [
                    {
                        type: 'postback',
                        title: MESSAGES.STREET.message,
                        payload: MESSAGES.STREET.id
                    },
                    {
                        type: 'postback',
                        title: MESSAGES.WORKPLACE.message,
                        payload: MESSAGES.WORKPLACE.id
                    },
                    {
                        type: 'postback',
                        title: MESSAGES.SCHOOL_OR_UNIVERSITY.message,
                        payload: MESSAGES.SCHOOL_OR_UNIVERSITY.id
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
