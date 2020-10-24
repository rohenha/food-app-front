const path = require("path")

exports.onCreateWebpackConfig = ({ stage, actions, plugins, loaders }) => {
    const config = {
        plugins: [
            plugins.define({
                "global.GENTLY": false,
            }),
        ],
    }
}

////////////////////////////////////////
// Function to create pages from Data //
////////////////////////////////////////

exports.onCreatePage = async ({ page, actions }) => {
    const { createPage } = actions
    // page.matchPath is a special key that's used for matching pages
    // only on the client.
    if (page.path.match(/^\/app/)) {
      page.matchPath = "/app/*"
      // Update the page.
      createPage(page)
    }
  }