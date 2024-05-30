import { cyan } from "@mui/material/colors"
import cypress from "cypress"

describe('Homepage', () => {
    beforeEach(() => {
        cy.visit('http://127.0.0.1:5173/home')
    })
    it('Should show user homepage to enter daily mood level and time allotted to cook', () => {
        cy.get('p').contains('Brain Food')
        cy.get('legend').contains('I want to feel ...')
        cy.get('label').first().contains('Calm')
        cy.get('label').first().click()
        cy.get('.landing-page').should('have.css', 'background-image').and('include', '/src/assets/calm.jpeg')
        cy.get('label').last().contains('Enthusiastic')
        cy.get('label').last().click()
        cy.get('.landing-page').should('have.css', 'background-image').and('include', '/src/assets/enthus.jpeg')
        cy.get('.menu').contains('Mood Board')
        cy.get('h1').contains('Good')
        cy.get('h2').first().contains('How are you feeling today?')
        cy.get('.sad').should('exist')
        cy.get('.happy').should('exist')
        cy.get('h2').last().contains('I have minutes to cook')
        cy.get('input[type=number]').should('exist')
        cy.get('input[type=number]').type('{upArrow}').should('have.value', 20)
        cy.get('input[type=number]').type('{downArrow}').should('have.value', 15)
        cy.get('button').contains('Let\'s cook!')
    })
    // it('Should take user to the dashboard when mood board is clicked', () => {
    //     cy.get('.menu').click()
    // })
})