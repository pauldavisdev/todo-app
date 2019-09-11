const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

module.exports = {
    plugins: [
        // Or: To strip all locales except “en", "en-gb"
        new MomentLocalesPlugin({
            localesToKeep: ['en-gb'],
        }),
    ],
};
