import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import './layout.css'
import { Helmet } from 'react-helmet'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import theme from '../theme'
const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Open Sans';
  }

  ul {
    margin: 0; 
  }
`
const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet>
          <link
            href="https://fonts.googleapis.com/css?family=Alice|Open+Sans|Ovo|Playfair+Display:400,700,900"
            rel="stylesheet"
          />
        </Helmet>
        <GlobalStyles />
        <div
          style={{
            margin: `0 auto`,
            maxWidth: 960,
            padding: `0px 1.0875rem 1.45rem`,
            paddingTop: 0,
          }}
        >
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
          <footer>
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </footer>
        </div>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
