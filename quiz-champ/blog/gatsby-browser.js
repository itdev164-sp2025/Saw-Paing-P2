/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/
 */

// You can delete this file if you're not using it
const React = require("react")
const { ThemeWrapper } = require("./src/components/ThemeWrapper")

exports.wrapRootElement = ({ element }) => {
  return <ThemeWrapper>{element}</ThemeWrapper>
}