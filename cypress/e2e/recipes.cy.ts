describe('Recipe carousel page', () => {
    beforeEach(() => {
        
        cy.visit('http://127.0.0.1:5173/home')
        cy.get('button').contains('Let\'s cook!').click()
    })
    it('Should show all the recipes based on mood level and time allotted to cook', () => {
        cy.get('h1').contains('Food for Your Mood')
        cy.get('.menu').first().contains('Mood Board')
        cy.get('.menu').last().contains('Login Page')
        cy.get('.slick-slider').contains('h2', 'Item 1')
        cy.get('.image-container').should('exist')
        cy.get('.slick-slider').contains('h3', 'Cook time: 30 minutes')
        cy.get('.slick-slider').contains('p', 'Description 1')
        cy.get('.MuiButtonBase-root').contains('Ingredients & Instructions').click({force: true})
        cy.get('.MuiBox-root').should('exist')
        cy.get('.MuiBox-root').contains('h2', 'Ingredients')
        cy.get('.MuiBox-root').contains('h2', 'Instructions')
        // test ingredients & instructions here. 
        cy.get('.exit').click()
        cy.get('.MuiBox-root').should('not.exist')
        cy.get('.heart').first().click()
        // heart changing image png
        cy.get('.slick-next').click()
        cy.get('.slick-prev').click()
    })
})