const MESSAGES = require('../utils/messages');

module.exports = (req, res, next) => {

    req.getTranslation = (key) => {

        if (req.userInfo) {
            const { locale } = req.userInfo;

            console.log('Looking for ----------------:', `message-${locale}`);

            return MESSAGES[key][`message-${locale}`] || 'Fallback -2';
        }
        return 'Fallback text';
    };

    next();
};
