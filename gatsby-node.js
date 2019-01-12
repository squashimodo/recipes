/**
import { graphql } from 'gatsby';
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const recipes = require('./src/data/recipes.json')
const path = require('path')
const slugify = require('slugify')

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === 'RecipesJson') {
    createNodeField({
      node,
      name: `slug`,
      value: slugify(node.name),
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const recipeTemplate = path.resolve(`src/templates/recipe-post.js`)
  console.log(recipes.length)

  return graphql(
    `
      {
        allRecipesJson {
          edges {
            node {
              id
              name
            }
          }
        }
      }
    `
  ).then(result => {
    result.data.allRecipesJson.edges.forEach(edge => {
      createPage({
        path: slugify(edge.node.name),
        component: recipeTemplate,
        context: {
          type: 'recipe',
          name: edge.node.name,
          id: edge.node.id,
        },
      })
    })
  })
}
