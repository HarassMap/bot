'use strict'

const VERIFY_TOKEN = 'catch-me-if-you-can';
const token = process.env.FB_PAGE_ACCESS_TOKEN;
const PAGE_ID = '1365749950157719';

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

const MESSAGES = require('./src/utils/messages');
const components = require('./src/components/');
const { ScenarioFactory } = require('./src/components/scenario');

app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send('Hello world, I am a chat bot')
});

// for Facebook verification
app.get('/webhook/', function (req, res) {
    if (req.query['hub.verify_token'] === VERIFY_TOKEN) {
        res.send(req.query['hub.challenge']);
    }
    res.send('Error, wrong token');
});

const echo = (sender) => sendTextMessage(sender, 'Echo');

const userScenario = {};

function getCurrentUserReply(senderId) {
    const currentStep = userScenario[senderId].current().id;

    if (components[currentStep]) {
        return components[currentStep];
    }

    console.log(userScenario[senderId].toString());

    return echo;
}

function handlePostBack(event) {
    const sender = event.sender.id;
    const payload = event.postback.payload;

    switch (payload) {
        case MESSAGES.GET_STARTED.id: {

            userScenario[sender] = ScenarioFactory.get();
            userScenario[sender].next();

            const reply = getCurrentUserReply(sender);

            reply(sender);
            break;
        }
        case MESSAGES.REPORT_HARASS_INCIDENT.id: {
            userScenario[sender].next();

            const reply = getCurrentUserReply(sender);

            reply(sender);

            break;
        }
        case MESSAGES.SHOW_HARASS_INCIDENTS.id: {
            break;
        }
    }
}
app.post('/webhook/', function (req, res) {
    let messaging_events = req.body.entry[0].messaging;

    for (let i = 0; i < messaging_events.length; i++) {
        let event = messaging_events[i];
        let sender = event.sender.id;

        if (sender === PAGE_ID) {
            continue;
        }

        console.log('Sender ID: %s', sender);

        if (event.message && event.message.text) {
            let text = event.message.text;

            console.log('Received text message: %s', text);

            userScenario[sender].current().setPayload(text);
            userScenario[sender].next();

            const reply = getCurrentUserReply(sender);

            reply(sender);

        } else if (event.message && event.message.attachments) {
            const location = event.message.attachments[0];

            console.log('Received attachment');

            userScenario[sender].current().setPayload(location);
            userScenario[sender].next();

            const reply = getCurrentUserReply(sender);

            reply(sender);

        } else if (event.message && event.message.quick_reply) {
            const payload = event.message.quick_reply.payload;

            console.log('Received quick reply: %s', payload);

            userScenario[sender].current().setPayload(payload);
            userScenario[sender].next();

            const reply = getCurrentUserReply(sender);

            reply(sender);
        } else if (event.postback && event.postback.payload) {
            console.log('Received postback: %s', event.postback.payload);
            handlePostBack(event);
        }
    }
    res.sendStatus(200);
});

function askForLocation(sender) {
    let locationReply = {
        "text":"Please share your location:",
        "quick_replies":[
            {
                "content_type":"location",
            }
        ]
    };

    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: locationReply,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

function sendGenericMessage(sender) {
    let messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "First card",
                    "subtitle": "Element #1 of an hscroll",
                    "image_url": "http://maxpixel.freegreatpicture.com/static/photo/1x/Nature-Apes-Monkeys-Animals-Cute-Small-Babies-768641.jpg",
                    "buttons": [{
                        "type": "web_url",
                        "url": "https://www.zalando.de",
                        "title": "Zalando"
                    }, {
                        "type": "postback",
                        "title": "Postback",
                        "payload": "Payload for first element in a generic bubble",
                    }],
                }, {
                    "title": "Second card",
                    "subtitle": "Element #2 of an hscroll",
                    "image_url": "https://cdn.pixabay.com/photo/2013/10/17/20/59/horse-197199_960_720.jpg",
                    "buttons": [{
                        "type": "postback",
                        "title": "Postback",
                        "payload": "Payload for second element in a generic bubble",
                    }],
                }]
            }
        }
    }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

function sendTextMessage(sender, text) {
    let messageData = { text:text }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

// Spin up the server
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})
