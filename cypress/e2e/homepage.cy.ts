import cypress from "cypress"

describe('Homepage', () => {
    beforeEach(() => {
        cy.intercept('POST', 'https://brain-food-501b641e50fb.herokuapp.com/api/v1/login', {
            statusCode: 201, 
            body: {
              "data": {
                  "id": "1",
                  "type": "user",
                  "attributes": {
                      "name": "Jhon",
                      "token": "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo2fQ.LRx_6SlAtuB6NakLx6VK9i4o6qDFbncEo6_lWtprJaU"
                  }
              }
            }
          })
        cy.visit('http://127.0.0.1:5173/')
        cy.get('#email').type('email@gmail.com').should('have.value', 'email@gmail.com')
        cy.get('#password').type('password').should('have.value', 'password')
        cy.get('button').first().contains('Sign in')
        cy.get('.sign-in').click()
    })
    it('Should show user homepage to enter daily mood level and time allotted to cook', () => {
        cy.get('h1').contains('Brain Food')
        cy.get('p').contains('I want to feel ...')
        cy.get('label').first().contains('Calm')
        cy.get('label').first().click()
        cy.get('.landing-page').should('have.css', 'background-image').and('include', '/src/assets/calm.jpeg')
        cy.get('h2').first().contains('Good')
        cy.get('.feeling').contains('How are you feeling today?')
        cy.get('.sad').should('exist')
        cy.get('.happy').should('exist')
        cy.get('.slider-container').should('exist')
        cy.get('.MuiBox-root').type('{rightArrow}')
        cy.get('input[aria-valuenow]').should('have.attr', 'aria-valuenow', '3')
        cy.get('h2').last().contains('I have')
        cy.get('input[type=number]').should('exist')
        cy.get('input[type=number]').type('{upArrow}').should('have.value', 20)
        cy.get('input[type=number]').type('{downArrow}').should('have.value', 15)
        cy.get('button').contains('Let\'s cook!')
        cy.get('.menu').last().click()
        cy.url().should('eq', 'http://127.0.0.1:5173/')
    })

})