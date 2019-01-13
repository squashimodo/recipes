import React from 'react'
import { graphql } from 'gatsby'
import styled, { keyframes } from 'styled-components'
import Layout from '../components/layout'
import Image from 'gatsby-image'
import AniLink from 'gatsby-plugin-transition-link/AniLink'
const Type = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  padding: 5px 60px 5px 1.45rem;
  background: rgb(69, 114, 192);
  color: white;
  text-align: left;
  background: ${({ background }) => background};
`
const Ingredients = styled.div`
  ul {
    padding: 0 30px;
  }
`
const Wrapper = styled.div`
  position: relative;
  max-width: 1024px;
  box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.2);
  margin: 0 auto;

  ul {
    list-style: none;
  }
`

const Header = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 40vh;
  overflow: hidden;
`

const Heading = styled.h2`
  font-family: ${({ theme }) => theme.headingFont};
  font-weight: 700;
  background: ${({ background }) => background};
  padding: 20px;
  margin: 0 auto;
  color: white;
  width: 100%;
  text-align: center;
  z-index: 1;
  position: absolute;
  bottom: 0;
`

const LineHeader = styled.h3`
  font-family: ${({ theme }) => theme.headingFont};
  text-align: center;
  padding: 50px 0;

  display: flex;
  width: 90%;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 0 auto;

  &:before,
  &:after {
    content: '';
    border-top: 2px solid #f1f1f1;
    margin: 0 20px 0 0;
    flex: 1 0 20px;
  }

  &:after {
    margin: 0 0 0 20px;
  }
`
const Instructions = styled.div`
  ul {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 30px 50px;
    padding: 0 30px;
  }
`
const Step = styled.li`
  padding-left: 45px;
  vertical-align: text-top;
  &:before {
    line-height: 1;
    font-family: ${({ theme }) => theme.headingFont};
    margin-left: -45px;
    position: absolute;
    content: '${({ step }) => step}';
    color: rgb(179,192,238);
    font-size: 40px;
    vertical-align: text-top;
  }
`
const Ingredient = styled.li``

const randomItem = items => {
  return items[Math.floor(Math.random() * items.length)]
}

const shake = keyframes`

  49% { transform: translate(0) rotate(0); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-3px, 1px) rotate(0deg); }
  70% { transform: translate(3px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(1px, 2px) rotate(0deg); }
  100% { transform: translate(0) rotate(0); }

`
const RandomLink = styled(AniLink)`
  padding: 20px 30px;
  background: #4572c0;
  position: absolute;
  color: white;
  text-decoration: none;
  right: -70px;
  top: 50px;
  z-index: -1;
  background: ${({ background }) => background};

  transition: 0.2s right ease;
  animation: ${shake} 3s infinite;
  animation-delay: 3s;
  &:hover {
    animation: none;
    right: -160px;
  }
`

const Recipe = ({ data, pageContext }) => {
  const { recipe } = data

  /**
   colors:
   Vibrant
    LightVibrant
    DarkVibrant
    Muted
    LightMuted
    DarkMuted
   */
  const backgroundColor = pageContext.color.DarkVibrant
  return (
    <Layout>
      <Wrapper>
        <RandomLink
          paintDrip
          hex={backgroundColor}
          background={backgroundColor}
          down
          to={`${randomItem(
            data.allRecipes.edges.map(e => e.node.fields.slug)
          )}`}
        >
          Pick another
        </RandomLink>
        <Header>
          <Heading background={backgroundColor}>{recipe.name} - </Heading>
          <Type background={backgroundColor}>Dessert</Type>
          <Image fluid={recipe.localImage.childImageSharp.fluid} />
        </Header>
        <Ingredients>
          <LineHeader>Ingredients</LineHeader>
          <ul>
            {recipe.ingredients.map(({ name, quantity }) => (
              <Ingredient key={quantity + name}>
                {quantity} {name}
              </Ingredient>
            ))}
          </ul>
        </Ingredients>
        <Instructions>
          <LineHeader>Instructions</LineHeader>
          <ul>
            {recipe.steps.map((step, i) => (
              <Step key={i + step} step={i + 1}>
                {step}
              </Step>
            ))}
          </ul>
        </Instructions>
      </Wrapper>
    </Layout>
  )
}
export const query = graphql`
  query recipeQuery($id: String!) {
    allRecipes: allRecipesJson {
      edges {
        node {
          fields {
            slug
          }
        }
      }
    }
    recipe: recipesJson(id: { eq: $id }) {
      id
      name
      localImage {
        id
        childImageSharp {
          fluid(maxWidth: 1024) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      ingredients {
        quantity
        name
        type
      }
      steps
      timers
      imageURL
      originalURL
    }
  }
`
export default Recipe
