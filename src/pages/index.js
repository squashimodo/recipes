import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'

const IndexPage = ({ data }) => (
  <Layout>
    <>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      {data.allSitePage.edges.map(({ node }) => (
        <Link key={node.id} style={{ display: 'block' }} to={node.path}>
          {node.context.name}
        </Link>
      ))}
    </>
  </Layout>
)

export const query = graphql`
  {
    allSitePage(filter: { context: { type: { eq: "recipe" } } }) {
      edges {
        node {
          path
          id
          context {
            name
          }
        }
      }
    }
  }
`
export default IndexPage
