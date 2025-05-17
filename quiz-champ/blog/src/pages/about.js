import React from "react"
import { graphql } from "gatsby"

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
        contact {
          name
        }
      }
    }
  }
`

export default function About({ data }) {
  return (
    <div>
      <h1>About Quiz Champ</h1>
      <p>Site: {data.site.siteMetadata.title}</p>
      <p>Contact: {data.site.siteMetadata.contact.name}</p>
    </div>
  )
}