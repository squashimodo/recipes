import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'

const Type = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  padding: 5px 10px;
  background: rgb(69, 114, 192);
`
const Ingredients = styled.div`
  h3 {
    text-align: center;
  }
  ul {
    list-style: none;
  }
`
const Wrapper = styled.div`
  position: relative;
  max-width: 1024px;
  box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.2);
  margin: 0 auto;
  padding: 0 10px;
`
const Image = styled.img``
const Header = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 40vh;
  overflow: hidden;
`

const Heading = styled.h2`
  background: rgb(69, 114, 192);
  padding: 20px;
  margin: 0 auto;
  color: white;
  width: 100%;
  text-align: center;
  z-index: 1;
  position: absolute;
  bottom: 0;
`

const Instructions = styled.div`
  ul {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 30px 50px;
  }
  h3 {
    text-align: center;
  }
  ul {
    list-style: none;
  }
`
const Step = styled.li`
  padding-left: 45px;
  vertical-align: text-top;
  &:before {
    margin-left: -45px;
    position: absolute;
    content: '${({ step }) => step}';
    color: rgb(179,192,238);
    font-size: 40px;
    vertical-align: text-top;
  }
`
const Ingredient = styled.li``
const Recipe = ({ data }) => {
  const { recipe } = data
  return (
    <Wrapper>
      <Header>
        <Heading>{recipe.name}</Heading>
        <Type>Dessert</Type>
        <Image src={recipe.imageURL} />
      </Header>
      <Ingredients>
        <h3>Ingredients</h3>
        <ul>
          {recipe.ingredients.map(({ name, quantity }) => (
            <Ingredient>
              {quantity} {name}
            </Ingredient>
          ))}
        </ul>
      </Ingredients>
      <Instructions>
        <h3>Instructions</h3>
        <ul>
          {recipe.steps.map((step, i) => (
            <Step step={i + 1}>{step}</Step>
          ))}
        </ul>
      </Instructions>
    </Wrapper>
  )
}
export const query = graphql`
  query recipeQuery($id: String!) {
    recipe: recipesJson(id: { eq: $id }) {
      id
      name
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
