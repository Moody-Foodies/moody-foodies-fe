// describe('Recipes carousel page', () => {
//     beforeEach(() => {
//         cy.intercept('GET', 'https://7a97657d-b4dd-468a-960b-563f46161622.mock.pstmn.io/api/v1/recipes', {
//             statusCode: 200, 
//             body: "recipes"
//         })
//         cy.visit('http://localhost:3000/recipes')
//     })
//     it('Should show the user the recipes carousel page', () => {
//         cy.get('h2').contains('Food for Your Mood')
// //         cy.get('.front').contains('h3', 'Red Lentil Soup with Chicken and Turnips')
// //         cy.get('p').first().contains('This good is good because of its taste')
// //         cy.get('p').last().contains('This recipe contains Magnesium')
// //         cy.get('.ingredient-button').contains('Ingredients & Instructions')
// //         cy.get('.ingredient-button').contains('Ingredients & Instructions').click()
// //         cy.get('.ingredient-container').find('h4').first().contains('Ingredients');
// //         cy.get('.ingredient-container').find('h4').last().contains('Instructions');

//     })


// })

// describe('Just visit e2e test', () => {
//     it('should visit', () => {
//         cy.visit('/')
//     })
// })