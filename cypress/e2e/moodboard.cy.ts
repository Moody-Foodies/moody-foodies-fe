describe('Mood board page', () => {
    beforeEach(() => {
        cy.visit('http://127.0.0.1:5173/dashboard')
    })
    it('Should show the user the mood board dashboard', () => {
        cy.get('h1').contains('Mood Board')
        cy.get('.menu').first().contains('Login Page')
        cy.get('.menu').last().contains('Home')
        cy.get('input[type=text]').should('have.attr', 'placeholder', 'Search recipe by name')
        
        cy.get('h2').contains('Average mood score: 7.5')
        cy.get('h3').should('exist')
        cy.get('.react-card-flip').first().contains('h4', 'Item 1')
        cy.get('.react-card-flip').first().contains('button', 'Details')
        cy.get('.react-card-flip').find('img').should('have.attr', 'src').should('include','/src/assets/delete.png')
        // cy.get('input[type=text]').type('2').should('have.value', 2)
        // cy.get('.react-card-flip').should('have.length', 1)
        cy.get('.react-card-flip').first().contains('button', 'Details').click()
        cy.get('.react-card-flip').first().contains('button', 'Go Back').click()
        // include click function for details/back button, delete button, and header .. maybe stars?
        cy.get('.rating').contains('My Rating')
        cy.get('.p-rating-item').first().click()
        cy.get('.p-rating-item-active').should('exist')
    })
})