'use strict';

const VERIFY_TOKEN = process.env.FB_VERIFFY_TOKEN;
const token = process.env.FB_PAGE_ACCESS_TOKEN;
const PAGE_ID = '1365749950157719';

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

const UsersPlugin = require('./src/middlewares/users');
const TranslationsPlugin = require('./src/middlewares/translations');
const MESSAGES = require('./src/utils/messages');
const components = require('./src/components/');
const { ScenarioFactory } = require('./src/components/scenario');
const Request = require('./src/utils/request');

app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(UsersPlugin);
app.use(TranslationsPlugin);

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

const echo = (request) =>
    request.getUser()
        .then((userInfo) =>
            Request.postRequest(Request.URLS.FB_MESSAGES, {
                recipient: {id: userInfo.id},
                message: {
                    text: 'Echo'
                }
            })
        );

const userScenario = {};

function getCurrentUserReply(senderId) {
    const currentStep = userScenario[senderId].current().id;

    if (components[currentStep]) {
        return components[currentStep];
    }

    console.log(userScenario[senderId].toString());
    userScenario[senderId].reset();
    userScenario[senderId].next();

    return getCurrentUserReply(senderId);
}

function handlePostBack(request, event) {
    const sender = event.sender.id;
    const payload = event.postback.payload;

    switch (payload) {
        case MESSAGES.GET_STARTED.id: {

            userScenario[sender] = ScenarioFactory.get();
            userScenario[sender].next();

            const reply = getCurrentUserReply(sender);

            reply(request);
            break;
        }
        case MESSAGES.REPORT_HARASS_INCIDENT.id: {
            userScenario[sender].next();

            const reply = getCurrentUserReply(sender);

            reply(request);

            break;
        }
        case MESSAGES.SHOW_HARASS_INCIDENTS.id: {
            break;
        }
    }
}
app.post('/webhook/', function (request, response) {
    let messaging_events = request.body.entry[0].messaging;

    for (let i = 0; i < messaging_events.length; i++) {
        let event = messaging_events[i];
        let sender = event.sender.id;

        if (sender === PAGE_ID) {
            continue;
        }

        if (event.message && event.message.text) {
            let text = event.message.text;

            console.log('Received text message: %s', text);

            userScenario[sender].current().setPayload(text);
            userScenario[sender].next();

            const reply = getCurrentUserReply(sender);

            reply(request);

        } else if (event.message && event.message.attachments) {
            const location = event.message.attachments[0];

            console.log('Received attachment');

            userScenario[sender].current().setPayload(location);
            userScenario[sender].next();

            const reply = getCurrentUserReply(sender);

            reply(request);

        } else if (event.message && event.message.quick_reply) {
            const payload = event.message.quick_reply.payload;

            console.log('Received quick reply: %s', payload);

            userScenario[sender].current().setPayload(payload);
            userScenario[sender].next();

            const reply = getCurrentUserReply(sender);

            reply(request);
        } else if (event.postback && event.postback.payload) {
            console.log('Received postback: %s', event.postback.payload);
            handlePostBack(request, event);
        }
    }
    response.sendStatus(200);
});

// Spin up the server
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
});
