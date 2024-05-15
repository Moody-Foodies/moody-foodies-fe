describe('Landing page', () => {
  beforeEach(() => {
      cy.intercept('POST', 'https://7a97657d-b4dd-468a-960b-563f46161622.mock.pstmn.io/api/v1/recipes', {
          statusCode: 201, 
          body: {
                  "mood": 3, 
                  "time_available": 45, 
                  "user_id": 1
          }
      })
      cy.visit('http://localhost:3000/')
  })
  it('Should show the user the landing page', () => {
      cy.get('h1').first().contains('Brain')
      cy.get('h1').last().contains('Food')
      cy.get('h2').first().contains('How are you feeling today?')
      cy.get('h2').last().contains('I have minutes to cook')
      cy.get('button').contains('Let\'s cook!').click()
//         cy.get('.front').contains('h3', 'Red Lentil Soup with Chicken and Turnips')
//         cy.get('p').first().contains('This good is good because of its taste')
//         cy.get('p').last().contains('This recipe contains Magnesium')
//         cy.get('.ingredient-button').contains('Ingredients & Instructions')
//         cy.get('.ingredient-button').contains('Ingredients & Instructions').click()
//         cy.get('.ingredient-container').find('h4').first().contains('Ingredients');
//         cy.get('.ingredient-container').find('h4').last().contains('Instructions');

  })


})