const Request = require('../utils/request');
const MESSAGES = require('../utils/messages');

module.exports = (sender) => {
    const message = {
        attachment: {
            type: 'template',
            payload: {
                template_type: 'button',
                text: MESSAGES.WELCOME_TO_HARASS_MAP.message,
                buttons: [
                    {
                        type: 'postback',
                        title: MESSAGES.REPORT_HARASS_INCIDENT.message,
                        payload: MESSAGES.REPORT_HARASS_INCIDENT.id
                    },
                    {
                        type: 'postback',
                        title: MESSAGES.SHOW_HARASS_INCIDENTS.message,
                        payload: MESSAGES.SHOW_HARASS_INCIDENTS.id
                    }
                ]
            }
        }
    };

    return Request.postRequest(Request.URLS.FB_MESSAGES, {
        recipient: { id: sender },
        message
    });
}
