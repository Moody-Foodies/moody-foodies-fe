describe('Login page', () => {
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
  })
  it('should show the user the login form', () => {
    cy.get('h1').contains('Brain Food')
    cy.get('form').should('exist')
    cy.get('label').first().contains('Email:')
    cy.get('label').last().contains('Password:')
    cy.get('#email').type('email@gmail.com').should('have.value', 'email@gmail.com')
    cy.get('#password').type('password').should('have.value', 'password')
    cy.get('button').first().contains('Sign in')
    cy.get('.sign-in').click()
    cy.url().should('eq', 'http://127.0.0.1:5173/home')
    // cy.get('h2').contains('Don\'t have an account?')
    // cy.get('.MuiButtonBase-root').contains('Create one').click({force: true})
    // cy.get('.MuiBox-root').should('exist')
    // cy.get('h2').contains('Create a Brain Food Account')
    // cy.get('h3').contains('Let\'s get cookin\'!')
    // cy.get('form').should('exist')
    // cy.get('#name').should('have.attr', 'placeholder', 'Enter your name here')
    // // cy.get('button).click()
    // cy.get('.exit').click()
  })
})