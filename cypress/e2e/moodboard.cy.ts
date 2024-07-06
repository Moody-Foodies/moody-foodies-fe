describe('Mood board page', () => {
        beforeEach(() => {
            cy.intercept('POST', 'https://brain-food-501b641e50fb.herokuapp.com/api/v1/login', {
              statusCode: 201, 
              body: {
                "data": {
                    "id": "1",
                    "type": "user",
                    "attributes": {
                        "name": "John",
                        "token": "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo2fQ.LRx_6SlAtuB6NakLx6VK9i4o6qDFbncEo6_lWtprJaU"
                    }
                }
              }
            })
        cy.intercept('GET', 'https://brain-food-501b641e50fb.herokuapp.com/api/v1/users', {
            statusCode: 200, 
            body: {
                "data": {
                    "id": "1",
                    "type": "user",
                    "attributes": {
                        "name": "John",
                        "moods": {
                            "avg_mood": 3.5,
                            "user_moods": [
                                {
                                    "date": "2024-06-01",
                                    "mood": 3
                                },
                                {
                                    "date": "2024-06-02",
                                    "mood": 2
                                },
                                {
                                    "date": "2024-06-03",
                                    "mood": 5
                                }
                            ]
                        },
                        "recipes": [
                            {
                                "id": 123,
                                "type": "recipe",
                                "attributes": {
                                    "name": "Red Lentil Soup with Chicken and Turnips",
                                    "description": "This food is good because of its taste",
                                    "time_to_cook": 45,
                                    "nutrient": "Magnesium",
                                    "health_benefits": "This will make you way less sad because of the way that it is",
                                    "image": "https://img.spoonacular.com/recipes/715415-312x231.jpg",
                                    "ingredients": [
                                        "3 medium carrots, peeled and diced",
                                        "3 celery stalks, diced",
                                        "2 cups fully-cooked chicken breast, shredded (may be omitted for a vegetarian version)",
                                        "½ cup flat leaf Italian parsley, chopped (plus extra for garnish)",
                                        "6 cloves of garlic, finely minced",
                                        "2 tablespoons olive oil",
                                        "28 ounce-can plum tomatoes, drained and rinsed, chopped",
                                        "2 cups dried red lentils, rinsed",
                                        "salt and black pepper, to taste",
                                        "1 large turnip, peeled and diced",
                                        "8 cups vegetable stock",
                                        "1 medium yellow onion, diced"
                                        ],
                                    "instructions": [
                                        "To a large dutch oven or soup pot, heat the olive oil over medium heat.",
                                        "Add the onion, carrots and celery and cook for 8-10 minutes or until tender, stirring occasionally.",
                                        "Add the garlic and cook for an additional 2 minutes, or until fragrant. Season conservatively with a pinch of salt and black pepper.To the pot, add the tomatoes, turnip and red lentils. Stir to combine. Stir in the vegetable stock and increase the heat on the stove to high. Bring the soup to a boil and then reduce to a simmer. Simmer for 20 minutes or until the turnips are tender and the lentils are cooked through.",
                                        "Add the chicken breast and parsley. Cook for an additional 5 minutes. Adjust seasoning to taste.",
                                        "Serve the soup immediately garnished with fresh parsley and any additional toppings. Enjoy!"
                                    ] 
                                },
                                "user_id": 1
                            },
                            {
                                "id": 124,
                                "type": "recipe",
                                "attributes": {
                                    "name": "Green Lentil Soup with Chicken and Turnips",
                                    "description": "This food is good because of its taste",
                                    "time_to_cook": 45,
                                    "nutrient": "Magnesium",
                                    "health_benefits": "This will make you way less sad because of the way that it is",
                                    "image": "https://img.spoonacular.com/recipes/715415-312x231.jpg",
                                    "ingredients": [
                                        "3 medium carrots, peeled and diced",
                                        "3 celery stalks, diced",
                                        "2 cups fully-cooked chicken breast, shredded (may be omitted for a vegetarian version)",
                                        "½ cup flat leaf Italian parsley, chopped (plus extra for garnish)",
                                        "6 cloves of garlic, finely minced",
                                        "2 tablespoons olive oil",
                                        "28 ounce-can plum tomatoes, drained and rinsed, chopped",
                                        "2 cups dried green lentils, rinsed",
                                        "salt and black pepper, to taste",
                                        "1 large turnip, peeled and diced",
                                        "8 cups vegetable stock",
                                        "1 medium yellow onion, diced"
                                    ],
                                    "instructions": [
                                        "To a large dutch oven or soup pot, heat the olive oil over medium heat.",
                                        "Add the onion, carrots and celery and cook for 8-10 minutes or until tender, stirring occasionally.",
                                        "Add the garlic and cook for an additional 2 minutes, or until fragrant. Season conservatively with a pinch of salt and black pepper.To the pot, add the tomatoes, turnip and green lentils. Stir to combine. Stir in the vegetable stock and increase the heat on the stove to high. Bring the soup to a boil and then reduce to a simmer. Simmer for 20 minutes or until the turnips are tender and the lentils are cooked through.",
                                        "Add the chicken breast and parsley. Cook for an additional 5 minutes. Adjust seasoning to taste.",
                                        "Serve the soup immediately garnished with fresh parsley and any additional toppings. Enjoy!"
                                    ]
                                },
                                "user_id": 1
                            },
                            {
                                "id": 125,
                                "type": "recipe",
                                "attributes": {
                                    "name": "Blue Lentil Soup with Chicken and Turnips",
                                    "description": "This food is good because of its taste",
                                    "time_to_cook": 45,
                                    "nutrient": "Magnesium",
                                    "health_benefits": "This will make you way less sad because of the way that it is",
                                    "image": "https://img.spoonacular.com/recipes/715415-312x231.jpg",
                                    "ingredients": [
                                        "3 medium carrots, peeled and diced",
                                        "3 celery stalks, diced",
                                        "2 cups fully-cooked chicken breast, shredded (may be omitted for a vegetarian version)",
                                        "½ cup flat leaf Italian parsley, chopped (plus extra for garnish)",
                                        "6 cloves of garlic, finely minced",
                                        "2 tablespoons olive oil",
                                        "28 ounce-can plum tomatoes, drained and rinsed, chopped",
                                        "2 cups dried green lentils, rinsed",
                                        "salt and black pepper, to taste",
                                        "1 large turnip, peeled and diced",
                                        "8 cups vegetable stock",
                                        "1 medium yellow onion, diced"
                                    ],
                                    "instructions": [
                                        "To a large dutch oven or soup pot, heat the olive oil over medium heat.",
                                        "Add the onion, carrots and celery and cook for 8-10 minutes or until tender, stirring occasionally.",
                                        "Add the garlic and cook for an additional 2 minutes, or until fragrant. Season conservatively with a pinch of salt and black pepper.To the pot, add the tomatoes, turnip and green lentils. Stir to combine. Stir in the vegetable stock and increase the heat on the stove to high. Bring the soup to a boil and then reduce to a simmer. Simmer for 20 minutes or until the turnips are tender and the lentils are cooked through.",
                                        "Add the chicken breast and parsley. Cook for an additional 5 minutes. Adjust seasoning to taste.",
                                        "Serve the soup immediately garnished with fresh parsley and any additional toppings. Enjoy!"
                                    ]
                                },
                                "user_id": 1
                            },
                            {
                                "id": 131,
                                "type": "recipe",
                                "attributes": {
                                    "name": "Maroon Lentil Soup with Chicken and Turnips",
                                    "description": "This food is good because of its taste",
                                    "time_to_cook": 45,
                                    "nutrient": "Magnesium",
                                    "health_benefits": "This will make you way less sad because of the way that it is",
                                    "image": "https://img.spoonacular.com/recipes/715415-312x231.jpg",
                                    "ingredients": [
                                        "3 medium carrots, peeled and diced",
                                        "3 celery stalks, diced",
                                        "2 cups fully-cooked chicken breast, shredded (may be omitted for a vegetarian version)",
                                        "½ cup flat leaf Italian parsley, chopped (plus extra for garnish)",
                                        "6 cloves of garlic, finely minced",
                                        "2 tablespoons olive oil",
                                        "28 ounce-can plum tomatoes, drained and rinsed, chopped",
                                        "2 cups dried green lentils, rinsed",
                                        "salt and black pepper, to taste",
                                        "1 large turnip, peeled and diced",
                                        "8 cups vegetable stock",
                                        "1 medium yellow onion, diced"
                                    ],
                                    "instructions": [
                                        "To a large dutch oven or soup pot, heat the olive oil over medium heat.",
                                        "Add the onion, carrots and celery and cook for 8-10 minutes or until tender, stirring occasionally.",
                                        "Add the garlic and cook for an additional 2 minutes, or until fragrant. Season conservatively with a pinch of salt and black pepper.To the pot, add the tomatoes, turnip and green lentils. Stir to combine. Stir in the vegetable stock and increase the heat on the stove to high. Bring the soup to a boil and then reduce to a simmer. Simmer for 20 minutes or until the turnips are tender and the lentils are cooked through.",
                                        "Add the chicken breast and parsley. Cook for an additional 5 minutes. Adjust seasoning to taste.",
                                        "Serve the soup immediately garnished with fresh parsley and any additional toppings. Enjoy!"
                                    ]
                                }
                            }
                        ]
                    }
                }
            }
        })
        cy.intercept('GET', 'https://brain-food-501b641e50fb.herokuapp.com/api/v1/recipes/favorites?user_id=1', {
            statusCode: 200, 
            body: {
                "data": [
                    {
                        "id": 123,
                        "type": "recipe",
                        "attributes": {
                            "name": "Red Lentil Soup with Chicken and Turnips",
                            "description": "This food is good because of its taste",
                            "time_to_cook": 45,
                            "nutrient": "Magnesium",
                            "health_benefits": "This will make you way less sad because of the way that it is",
                            "image": "https://img.spoonacular.com/recipes/715415-312x231.jpg",
                            "ingredients": [
                                "3 medium carrots, peeled and diced",
                                "3 celery stalks, diced",
                                "2 cups fully-cooked chicken breast, shredded (may be omitted for a vegetarian version)",
                                "½ cup flat leaf Italian parsley, chopped (plus extra for garnish)",
                                "6 cloves of garlic, finely minced",
                                "2 tablespoons olive oil",
                                "28 ounce-can plum tomatoes, drained and rinsed, chopped",
                                "2 cups dried red lentils, rinsed",
                                "salt and black pepper, to taste",
                                "1 large turnip, peeled and diced",
                                "8 cups vegetable stock",
                                "1 medium yellow onion, diced"
                                ],
                            "instructions": [
                                "To a large dutch oven or soup pot, heat the olive oil over medium heat.",
                                "Add the onion, carrots and celery and cook for 8-10 minutes or until tender, stirring occasionally.",
                                "Add the garlic and cook for an additional 2 minutes, or until fragrant. Season conservatively with a pinch of salt and black pepper.To the pot, add the tomatoes, turnip and red lentils. Stir to combine. Stir in the vegetable stock and increase the heat on the stove to high. Bring the soup to a boil and then reduce to a simmer. Simmer for 20 minutes or until the turnips are tender and the lentils are cooked through.",
                                "Add the chicken breast and parsley. Cook for an additional 5 minutes. Adjust seasoning to taste.",
                                "Serve the soup immediately garnished with fresh parsley and any additional toppings. Enjoy!"
                            ] 
                        },
                        "user_id": 1
                    },
                    {
                        "id": 124,
                        "type": "recipe",
                        "attributes": {
                            "name": "Green Lentil Soup with Chicken and Turnips",
                            "description": "This food is good because of its taste",
                            "time_to_cook": 45,
                            "nutrient": "Magnesium",
                            "health_benefits": "This will make you way less sad because of the way that it is",
                            "image": "https://img.spoonacular.com/recipes/715415-312x231.jpg",
                            "ingredients": [
                                "3 medium carrots, peeled and diced",
                                "3 celery stalks, diced",
                                "2 cups fully-cooked chicken breast, shredded (may be omitted for a vegetarian version)",
                                "½ cup flat leaf Italian parsley, chopped (plus extra for garnish)",
                                "6 cloves of garlic, finely minced",
                                "2 tablespoons olive oil",
                                "28 ounce-can plum tomatoes, drained and rinsed, chopped",
                                "2 cups dried green lentils, rinsed",
                                "salt and black pepper, to taste",
                                "1 large turnip, peeled and diced",
                                "8 cups vegetable stock",
                                "1 medium yellow onion, diced"
                            ],
                            "instructions": [
                                "To a large dutch oven or soup pot, heat the olive oil over medium heat.",
                                "Add the onion, carrots and celery and cook for 8-10 minutes or until tender, stirring occasionally.",
                                "Add the garlic and cook for an additional 2 minutes, or until fragrant. Season conservatively with a pinch of salt and black pepper.To the pot, add the tomatoes, turnip and green lentils. Stir to combine. Stir in the vegetable stock and increase the heat on the stove to high. Bring the soup to a boil and then reduce to a simmer. Simmer for 20 minutes or until the turnips are tender and the lentils are cooked through.",
                                "Add the chicken breast and parsley. Cook for an additional 5 minutes. Adjust seasoning to taste.",
                                "Serve the soup immediately garnished with fresh parsley and any additional toppings. Enjoy!"
                            ]
                        },
                        "user_id": 1
                    },
                    {
                        "id": 125,
                        "type": "recipe",
                        "attributes": {
                            "name": "Blue Lentil Soup with Chicken and Turnips",
                            "description": "This food is good because of its taste",
                            "time_to_cook": 45,
                            "nutrient": "Magnesium",
                            "health_benefits": "This will make you way less sad because of the way that it is",
                            "image": "https://img.spoonacular.com/recipes/715415-312x231.jpg",
                            "ingredients": [
                                "3 medium carrots, peeled and diced",
                                "3 celery stalks, diced",
                                "2 cups fully-cooked chicken breast, shredded (may be omitted for a vegetarian version)",
                                "½ cup flat leaf Italian parsley, chopped (plus extra for garnish)",
                                "6 cloves of garlic, finely minced",
                                "2 tablespoons olive oil",
                                "28 ounce-can plum tomatoes, drained and rinsed, chopped",
                                "2 cups dried green lentils, rinsed",
                                "salt and black pepper, to taste",
                                "1 large turnip, peeled and diced",
                                "8 cups vegetable stock",
                                "1 medium yellow onion, diced"
                            ],
                            "instructions": [
                                "To a large dutch oven or soup pot, heat the olive oil over medium heat.",
                                "Add the onion, carrots and celery and cook for 8-10 minutes or until tender, stirring occasionally.",
                                "Add the garlic and cook for an additional 2 minutes, or until fragrant. Season conservatively with a pinch of salt and black pepper.To the pot, add the tomatoes, turnip and green lentils. Stir to combine. Stir in the vegetable stock and increase the heat on the stove to high. Bring the soup to a boil and then reduce to a simmer. Simmer for 20 minutes or until the turnips are tender and the lentils are cooked through.",
                                "Add the chicken breast and parsley. Cook for an additional 5 minutes. Adjust seasoning to taste.",
                                "Serve the soup immediately garnished with fresh parsley and any additional toppings. Enjoy!"
                            ]
                        },
                        "user_id": 1
                    },
                    {
                        "id": 131,
                        "type": "recipe",
                        "attributes": {
                            "name": "Maroon Lentil Soup with Chicken and Turnips",
                            "description": "This food is good because of its taste",
                            "time_to_cook": 45,
                            "nutrient": "Magnesium",
                            "health_benefits": "This will make you way less sad because of the way that it is",
                            "image": "https://img.spoonacular.com/recipes/715415-312x231.jpg",
                            "ingredients": [
                                "3 medium carrots, peeled and diced",
                                "3 celery stalks, diced",
                                "2 cups fully-cooked chicken breast, shredded (may be omitted for a vegetarian version)",
                                "½ cup flat leaf Italian parsley, chopped (plus extra for garnish)",
                                "6 cloves of garlic, finely minced",
                                "2 tablespoons olive oil",
                                "28 ounce-can plum tomatoes, drained and rinsed, chopped",
                                "2 cups dried green lentils, rinsed",
                                "salt and black pepper, to taste",
                                "1 large turnip, peeled and diced",
                                "8 cups vegetable stock",
                                "1 medium yellow onion, diced"
                            ],
                            "instructions": [
                                "To a large dutch oven or soup pot, heat the olive oil over medium heat.",
                                "Add the onion, carrots and celery and cook for 8-10 minutes or until tender, stirring occasionally.",
                                "Add the garlic and cook for an additional 2 minutes, or until fragrant. Season conservatively with a pinch of salt and black pepper.To the pot, add the tomatoes, turnip and green lentils. Stir to combine. Stir in the vegetable stock and increase the heat on the stove to high. Bring the soup to a boil and then reduce to a simmer. Simmer for 20 minutes or until the turnips are tender and the lentils are cooked through.",
                                "Add the chicken breast and parsley. Cook for an additional 5 minutes. Adjust seasoning to taste.",
                                "Serve the soup immediately garnished with fresh parsley and any additional toppings. Enjoy!"
                            ]
                        },
                        "user_id": 1
                    }
                ]
            }
        })
        cy.visit('http://127.0.0.1:5173/')
        cy.get('#email').type('email@gmail.com').should('have.value', 'email@gmail.com')
        cy.get('#password').type('password').should('have.value', 'password')
        cy.get('button').first().contains('Sign in')
        cy.get('.sign-in').click()
        cy.get('.menu').contains('Mood Board').click()
        cy.url().should('eq', 'http://127.0.0.1:5173/dashboard')
    })

    it('Should show the user the mood board dashboard', () => {
        cy.get('h1').contains('Mood Board')
        cy.get('.dashboard-greeting').contains('Hi')
        cy.get('.menu').first().contains('Logout')
        cy.get('.menu').last().contains('Home')
        cy.get('input[type=text]').should('have.attr', 'placeholder', 'Search recipe by name')
        cy.get('h2').contains('Average Mood Score: 3.5')
        cy.get('h3').should('exist')
        cy.get('.menu').first().click()
        cy.url().should('eq', 'http://127.0.0.1:5173/')
    })
})