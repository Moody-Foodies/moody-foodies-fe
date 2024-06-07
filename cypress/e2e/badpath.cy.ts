describe('Navigating to a bad path', () => {
    beforeEach(() => {
        cy.visit('http://127.0.0.1:5173/badpath')
    })
    it('Should show user error if navigated to bath path', () => {
        cy.get('h1').contains('Oh no! Looks like something went wrong. Please try again later.')
        cy.get('button').click()
        cy.url().should('eq', 'http://127.0.0.1:5173/')
    })
})