import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import Layout from '../components/layout'

const Type = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  padding: 5px 60px 5px 1.45rem;
  background: rgb(69, 114, 192);
  color: white;
  text-align: left;
`
const Ingredients = styled.div`
  ul {
    list-style: none;
    padding: 0 30px;
  }
`
const Wrapper = styled.div`
  position: relative;
  max-width: 1024px;
  box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.2);
  margin: 0 auto;
`
const Image = styled.img`
  object-fit: cover;
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
    list-style: none;
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
const Recipe = ({ data }) => {
  const { recipe } = data
  return (
    <Layout>
      <Wrapper>
        <Header>
          <Heading>{recipe.name}</Heading>
          <Type>Dessert</Type>
          <Image src={recipe.imageURL} />
        </Header>
        <Ingredients>
          <LineHeader>Ingredients</LineHeader>
          <ul>
            {recipe.ingredients.map(({ name, quantity }) => (
              <Ingredient key={name}>
                {quantity} {name}
              </Ingredient>
            ))}
          </ul>
        </Ingredients>
        <Instructions>
          <LineHeader>Instructions</LineHeader>
          <ul>
            {recipe.steps.map((step, i) => (
              <Step key={step} step={i + 1}>
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
