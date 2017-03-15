const Request = require('../utils/request');
const users = new Map();

module.exports = (req, res, next) => {

    const messagingEvents = req.body.entry[0].messaging;

    if (messagingEvents.length > 0) {
        const sender = messagingEvents[0].sender;
        const userId = sender.id;
        let userPromise;

        if (!users.has(userId)) {
            userPromise = Request.getRequest(`${Request.URLS.FB_USER_PROFILE}/${userId}`, {
                qs: {
                    fields: 'first_name,last_name,profile_pic,locale,timezone,gender'
                }
            }).then((userInfo) => {
                userInfo.id = userId;

                req.userInfo = userInfo;

                users.set(userId, userInfo);
                next();

                return userInfo;
            });
        } else {
            userPromise = Promise.resolve(users.get(userId));
        }

        req.getUser = () => userPromise;
    }

    next();
};
