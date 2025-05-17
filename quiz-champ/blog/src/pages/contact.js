import React from "react"
import { graphql } from "gatsby"

export const query = graphql`
  query {
    site {
      siteMetadata {
        contact {
          name
          email
        }
      }
    }
  }
`

export default function Contact({ data }) {
  const { name, email } = data.site.siteMetadata.contact
  return (
    <div>
      <h1>Contact Us</h1>
      <p>Name: {name}</p>
      <p>Email: {email}</p>
    </div>
  )
}