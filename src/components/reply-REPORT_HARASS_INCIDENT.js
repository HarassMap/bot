const Request = require('../utils/request');
const MESSAGES = require('../utils/messages');

module.exports = (request) => {
    const message = {
        attachment: {
            type: 'template',
            payload: {
                template_type: 'button',
                text: MESSAGES.WELCOME_TO_HARASS_MAP.message,
                buttons: [
                    {
                        type: 'postback',
                        title: request.getTranslation(MESSAGES.REPORT_HARASS_INCIDENT.id),
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

    return request.getUser()
        .then((userInfo) => {
            return Request.postRequest(Request.URLS.FB_MESSAGES, {
                recipient: {id: userInfo.id},
                message
            });
        });
};
