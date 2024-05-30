describe('Login page', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5173/')
  })
  it('should show the user the login form', () => {
    cy.get('p').contains('Brain Food')
    cy.get('form').should('exist')
    cy.get('label').first().contains('Your email')
    cy.get('label').last().contains('Your password')
    cy.get('button').contains('Sign in')
    // cy.get('button').click()
  })


})