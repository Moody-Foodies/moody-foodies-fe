describe('Homepage', () => {
    beforeEach(() => {
        cy.visit('http://127.0.0.1:5173/home')
    })
    it('Should show user homepage to enter daily mood level and time allotted to cook', () => {
        cy.get('h1').contains('Oh no! Looks like something went wrong. Please try again later.')
        cy.get('button').click()
        cy.url().should('eq', 'http://127.0.0.1:5173/')
    })
})