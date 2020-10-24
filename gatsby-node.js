const path = require("path")

exports.onCreateWebpackConfig = ({ stage, actions, plugins, loaders }) => {
    const config = {
        plugins: [
            plugins.define({
                "global.GENTLY": false,
            }),
        ],
    };
};