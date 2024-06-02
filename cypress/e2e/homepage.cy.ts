import cypress from "cypress"

describe('Homepage', () => {
    beforeEach(() => {
        cy.visit('http://127.0.0.1:5173/home')
    })
    it('Should show user homepage to enter daily mood level and time allotted to cook', () => {
        cy.get('h1').contains('Brain Food')
        cy.get('p').contains('I want to feel ...')
        cy.get('label').first().contains('Calm')
        cy.get('label').first().click()
        cy.get('.landing-page').should('have.css', 'background-image').and('include', '/src/assets/calm.jpeg')
        // cy.get('label').last().contains('Enthusiastic')
        // cy.get('label').last().click()
        // cy.get('.landing-page').should('have.css', 'background-image').and('include', '/src/assets/enthus.jpeg')
        cy.get('.menu').contains('Mood Board')
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
    })
    // it('Should take user to the dashboard when mood board is clicked', () => {
    //     cy.get('.menu').click()
    // })
})