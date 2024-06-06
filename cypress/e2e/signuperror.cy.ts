// import { cy } from 'cypress'

describe('Login page', () => {
    beforeEach(() => {
      cy.intercept('POST', 'https://brain-food-501b641e50fb.herokuapp.com/api/v1/users', {
        statusCode: 422, 
        body: {
            "errors": [{
                "detail": ["Password can't be blank"]
            }]
        }
      })
      cy.visit('http://127.0.0.1:5173/')
    })
    it('should show the user the login form', () => {
      cy.get('h1').contains('Brain Food')
      cy.get('form').should('exist')
      cy.get('label').first().contains('Email:')
      cy.get('label').last().contains('Password:')
      cy.get('h2').contains('Don\'t have an account?')
      cy.get('.MuiButtonBase-root').contains('Create one').click({force: true})
      cy.get('.MuiBox-root').should('exist')
      cy.get('h2').contains('Create a Brain Food Account')
      cy.get('h3').contains('Let\'s get cookin\'!')
      cy.get('form').should('exist')
      cy.get('#name').should('have.attr', 'placeholder', 'Enter your name here')
      cy.get('#email-signup').should('have.attr', 'placeholder', 'Enter your email address here')
      cy.get('#password-signup').should('have.attr', 'placeholder', 'Enter your password here')
      cy.get('#name').type('Jhon').should('have.value', 'Jhon')
      cy.get('#email-signup').type('Jhon@gmail.com').should('have.value', 'Jhon@gmail.com')
      cy.get('.sign-in-button').click()
      cy.get('.email-error').contains('Password can\'t be blank')
      cy.get('.exit').click()
      cy.get('#email').should('exist')
    })
  })