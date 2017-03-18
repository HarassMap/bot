const Request = require('../utils/request');
const users = new Map();
const PAGE_ID = '1365749950157719';

function bindUserToRequest(req, userId, next) {
    const userInfo = users.get(userId);
    req.getUser = () => Promise.resolve(userInfo);
    req.userInfo = userInfo;

    return next();
}

module.exports = (req, res, next) => {

    if (!req.body.entry || req.body.entry.length === 0) {
        return next();
    }
    
    const messagingEvents = req.body.entry[0].messaging;

    if (messagingEvents.length === 0) {
        return next();
    }

    const sender = messagingEvents[0].sender;
    const userId = sender.id;

    if (userId === PAGE_ID) {
        return next();
    }

    if (!users.has(userId)) {
        return Request.getRequest(`${Request.URLS.FB_USER_PROFILE}/${userId}`, {
            qs: {
                fields: 'first_name,last_name,profile_pic,locale,timezone,gender'
            }
        }).then((userInfo) => {
            userInfo.id = userId;

            users.set(userId, userInfo);

            bindUserToRequest(req, userId, next);
            return userInfo;
        });
    }

    return bindUserToRequest(req, userId, next);
};
