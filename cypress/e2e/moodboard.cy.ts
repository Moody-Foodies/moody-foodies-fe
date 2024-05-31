describe('Mood board page', () => {
    beforeEach(() => {
        cy.visit('http://127.0.0.1:5173/dashboard')
    })
    it('Should show the user the mood board dashboard', () => {
        cy.get('h2').contains('Mood Board')
        cy.get('.link-styling').contains('p', 'Recipes')
        cy.get('.link-styling').contains('p', 'Home')
        cy.get('input[type=text]').should('have.attr', 'placeholder', 'Search recipe by name')
        
        cy.get('h3').first().contains('Average mood score: 7.5')
        cy.get('h3').last().should('exist')
        cy.get('.react-card-flip').first().contains('h2', 'Item 1')
        cy.get('.react-card-flip').first().contains('button', 'Details')
        cy.get('.react-card-flip').find('img').should('have.attr', 'src').should('include','/src/assets/delete.png')
        // cy.get('input[type=text]').type('2').should('have.value', 2)
        // cy.get('.react-card-flip').should('have.length', 1)
        cy.get('.react-card-flip').first().contains('button', 'Details').click()
        cy.get('.react-card-flip').first().contains('button', 'back to front')
        // include click function for details/back button, delete button, and header .. maybe stars?
    })
})