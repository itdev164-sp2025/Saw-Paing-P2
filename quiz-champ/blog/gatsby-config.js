require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
  title: `Quiz Champ`,
  description: `Test your knowledge by playing interactive quizzes!`,
  author: `@quizchamp`,
  siteUrl: `https://quizchamp.netlify.app/`,
  contact: {
    name: `Saw Paing`,
    email: `sawp2489@email.com`,
  },
},
plugins: [
  {
    resolve: `gatsby-source-contentful`,
    options: {
      spaceId: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    },
  },
  `gatsby-plugin-image`,
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `images`,
      path: `${__dirname}/src/images`,
    },
  },
  `gatsby-transformer-sharp`,
  `gatsby-plugin-sharp`,
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: `gatsby-starter-default`,
      short_name: `starter`,
      start_url: `/`,
      background_color: `#663399`,
      display: `minimal-ui`,
      icon: `src/images/gatsby-icon.png`,
    },
  },
],
}
