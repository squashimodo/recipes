/**
import { graphql } from 'gatsby';
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const recipes = require('./src/data/recipes.json')
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
  return graphql(
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
    .then(result => {
      Promise.all(
        result.data.allRecipesJson.edges.map(edge => {
          return Vibrant.from(edge.node.localImage.absolutePath)
            .getPalette()
            .then(result => {
              return createPage({
                path: slugify(edge.node.name),
                component: recipeTemplate,
                context: {
                  type: 'recipe',
                  name: edge.node.name,
                  id: edge.node.id,
                  color: Object.keys(result).reduce(
                    (obj, curr) => ({
                      ...obj,
                      [curr]: result[curr].hex,
                    }),
                    {}
                  ),
                },
              })
            })
        })
      )
    })
    .catch(e => console.error(e))
}
