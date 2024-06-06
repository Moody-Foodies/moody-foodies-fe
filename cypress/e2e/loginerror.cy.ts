describe('Login page', () => {
    beforeEach(() => {
      cy.intercept('POST', 'https://brain-food-501b641e50fb.herokuapp.com/api/v1/login', {
        statusCode: 422, 
        body: {
          "errors": [{
             "detail": "Invalid email or password"
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
      cy.get('#email').type('email@gmail.com').should('have.value', 'email@gmail.com')
      cy.get('button').first().contains('Sign in')
      cy.get('.sign-in').click()
        // invalid email or password error 
    })
  })