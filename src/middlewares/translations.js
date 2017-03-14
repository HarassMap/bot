module.exports = (req, res, next) => {

    req.getTranslations = () => {
        if (req.getUser) {
            req.getUser()
                .then(userInfo => {
                    console.log('Locale -------------:', userInfo['locale']);
                });
        } else {
            console.log('Could not get user info');
        }
    };

    next();
};
