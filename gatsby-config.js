var autoprefixer = require("autoprefixer")
require("dotenv").config()

module.exports = {
    plugins: [
        "gatsby-plugin-react-helmet",
        "gatsby-plugin-tsconfig-paths",
        {
            resolve: `gatsby-plugin-env-variables`,
            options: {
                allowList: ["BACKEND_URL"],
            },
        },
        {
            resolve: "gatsby-plugin-sass",
            options: {
                data: `@import "${__dirname}/src/styles/site";`,
            },
        },
        // {
        //     resolve: `gatsby-plugin-layout`,
        //     options: {
        //         component: require.resolve(`./src/components/layout/layout.component.tsx`),
        //     },
        // },
        {
            resolve: `gatsby-plugin-postcss`,
            options: {
                postCssPlugins: [autoprefixer()],
            },
        },
    ],
}
