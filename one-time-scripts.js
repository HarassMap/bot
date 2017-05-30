const request = require('request')
const token = process.env.FB_PAGE_ACCESS_TOKEN;
const SERVER_URL = process.env.SERVER_URL;

function dispatchRequest(url, data) {
    return request({
        url,
        qs: {access_token:token},
        method: 'POST',
        json: data
    }, function(error, response, body) {
        console.log('Body:', body);
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    });
}

function setGetStarted() {
    const data = {
        "get_started":{
            "payload":"GET_STARTED"
        }
    };

    return dispatchRequest('https://graph.facebook.com/v2.6/me/messenger_profile', data);
}

function setGreetingText() {
    const data = {
        'greeting':[
            {
                'locale':'default',
                'text':'Welcome to Harass Map!'
            }, {
                'locale':'en_US',
                'text':'Welcome to Harass Map, {{user_first_name}}!'
            }, {
                'locale':'ar_ar',
                'text':'اهلاً بك في خريطة التحرش يا {{user_first_name}}'
            }
        ]
    };

    return dispatchRequest('https://graph.facebook.com/v2.6/me/messenger_profile', data);
}

function setDomainWhitelist() {
    const data = {
        'whitelisted_domains':[
            'https://petersfancyapparel.com'
        ]
    };

    return dispatchRequest('https://graph.facebook.com/v2.6/me/messenger_profile', data);
}

function setPersistentMenu() {
    const englishCTA = [
        {
            "type": "postback",
            "title": "Help",
            "payload": "GET_STARTED"
        },
        {
            "type": "postback",
            "title": "Report Incident",
            "payload": "REPORT_INCIDENT"
        },
        {
            type: 'web_url',
            title: 'Show Details',
            url: `${SERVER_URL}/details`,
            webview_height_ratio: 'tall',
            messenger_extensions: true
        }
    ];

    const data = {
        "persistent_menu":[

            {
                "locale": "default",
                "composer_input_disabled": false,
                "call_to_actions": englishCTA
            },
            {
                "locale": "en_US",
                "composer_input_disabled": false,
                "call_to_actions": englishCTA
            },
            {
                "locale": "ar_AR",
                "composer_input_disabled": false,
                "call_to_actions": [
                    {
                        "type": "postback",
                        "title": "المساعدة",
                        "payload": "GET_STARTED"
                    },
                    {
                        "type": "postback",
                        "title": "الإبلاغ عن حالة تحرش",
                        "payload": "REPORT_INCIDENT"
                    }
                ]
            }
        ]
    };

    return dispatchRequest('https://graph.facebook.com/v2.6/me/messenger_profile', data);
}

module.exports = {
    setGreetingText,
    setDomainWhitelist,
    setGetStarted,
    setPersistentMenu
};
