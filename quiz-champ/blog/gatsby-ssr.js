/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/
 */

/**
 * @type {import('gatsby').GatsbySSR['onRenderBody']}
 */
exports.onRenderBody = ({ setHtmlAttributes }) => {
  setHtmlAttributes({ lang: `en` })
}

const React = require("react")
const { ThemeWrapper } = require("./src/components/ThemeWrapper")

exports.wrapRootElement = ({ element }) => {
  return <ThemeWrapper>{element}</ThemeWrapper>
}