const Request = require('../utils/request');
const MESSAGES = require('../utils/messages');

module.exports = (request) => {
    const message = {
        attachment: {
            type: 'template',
            payload: {
                template_type: 'button',
                text: request.getTranslation(MESSAGES.WELCOME_TO_HARASS_MAP),
                buttons: [
                    {
                        type: 'postback',
                        title: request.getTranslation(MESSAGES.REPORT_HARASS_INCIDENT),
                        payload: MESSAGES.REPORT_HARASS_INCIDENT.id
                    },
                    {
                        type: 'postback',
                        title: request.getTranslation(MESSAGES.SHOW_HARASS_INCIDENTS),
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
