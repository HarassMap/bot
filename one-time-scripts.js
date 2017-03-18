const request = require('request')
const token = process.env.FB_PAGE_ACCESS_TOKEN;

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

setGetStarted();
