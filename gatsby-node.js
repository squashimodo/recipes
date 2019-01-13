/**
import { graphql } from 'gatsby';
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require('path')
const slugify = require('slugify')
const Vibrant = require('node-vibrant')

exports.onCreateNode = async ({ node, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'RecipesJson') {
    createNodeField({
      node,
      name: `slug`,
      value: slugify(node.name),
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const recipeTemplate = path.resolve(`src/templates/recipe-post.js`)
  const result = await graphql(
    `
      {
        allRecipesJson {
          edges {
            node {
              id
              name
              localImage {
                absolutePath
              }
            }
          }
        }
      }
    `
  )

  return Promise.all(
    result.data.allRecipesJson.edges.map(async edge => {
      const colors = await Vibrant.from(
        edge.node.localImage.absolutePath
      ).getPalette()
      return createPage({
        path: slugify(edge.node.name),
        component: recipeTemplate,
        context: {
          type: 'recipe',
          name: edge.node.name,
          id: edge.node.id,
          color: Object.keys(colors).reduce(
            (obj, curr) => ({
              ...obj,
              [curr]: colors[curr].hex,
            }),
            {}
          ),
        },
      })
    })
  )
}
