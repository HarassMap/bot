const _request = require('request');
const token = process.env.FB_PAGE_ACCESS_TOKEN;

module.exports = {
    URLS: {
        FB_MESSAGES: 'https://graph.facebook.com/v2.6/me/messages'
    },

    request(url, options) {
        const requestOptions = Object.assign(
            {},
            {
                url,
                qs: {access_token: token}
            },
            options
        );

        return _request(requestOptions, function (error, response, body) {
            console.log('Body:', body);
            if (error) {
                console.log('Error sending messages: ', error);
            } else if (response.body.error) {
                console.log('Error: ', response.body.error);
            }
        })
    },

    postRequest(url, body) {
        return this.request(url, {
            method: 'POST',
            json: body
        });
    },

    getRequest(url) {
        return this.request(url);
    },

    deleteRequest(url) {
        return this.request(url, {
            method: 'DELETE'
        });
    }
};
