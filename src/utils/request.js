const requestPromise = require('request-promise');
const token = process.env.FB_PAGE_ACCESS_TOKEN;

module.exports = {
    URLS: {
        FB_MESSAGES: 'https://graph.facebook.com/v2.6/me/messages',
        FB_USER_PROFILE: 'https://graph.facebook.com/v2.6'
    },

    request(url, options) {
        const requestOptions = Object.assign(
            {},
            {
                url,
                json: true
            },
            options
        );

        requestOptions.qs = requestOptions.qs || {};
        requestOptions.qs.access_token = token;

        return requestPromise(requestOptions)
            .catch((error) => {
                console.log('Error sending messages: ', error);
            });
    },

    postRequest(url, body) {
        return this.request(url, {
            method: 'POST',
            json: body
        });
    },

    getRequest(url, options) {
        return this.request(url, options);
    },

    deleteRequest(url) {
        return this.request(url, {
            method: 'DELETE'
        });
    }
};
