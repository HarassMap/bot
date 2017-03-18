const DEFAULT_LOCALE = 'en_US';

module.exports = (req, res, next) => {

    req.getTranslation = (message) => {
        let key = DEFAULT_LOCALE;

        if (req.userInfo) {
            const { locale = DEFAULT_LOCALE } = req.userInfo;

            if (locale !== DEFAULT_LOCALE) {
                key = `${locale}`;
            }
        }

        return message[key];
    };

    next();
};
