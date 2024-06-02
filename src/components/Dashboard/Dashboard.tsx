import { useState, useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import affirmations from '../../Quotes/quotes'
import RecipeGrid from '../RecipeGrid/RecipeGrid'
import './Dashboard.css'
import Relaxation from '../../assets/relaxation.jpeg';
import Calm from '../../assets/calm.jpeg';
import HappyTheme from '../../assets/happy.jpeg';
import Energy from '../../assets/energy.jpeg'
import Enthus from '../../assets/enthus.jpeg';

interface Affirmation {
  quote: string
}

interface LocationState {
  value: string; 
}

export default function Dashboard() {
  const [quote, setQuote] = useState<string>('')
  const navigate = useNavigate()
  const location = useLocation();
  const state = location.state as LocationState;
  const [value, setValue] = useState('')
  const [search, setSearch] = useState('')


  function getRandomAffirmation(affirmations: Affirmation[]) {
    let randomQuote =
      affirmations[Math.floor(Math.random() * affirmations.length)]
      setQuote(randomQuote.quote)
  }

  useEffect(() => {
    getRandomAffirmation(affirmations)
    if(!state){
      setValue('relaxed')
    } else {
      setValue(state.value)
    }
    
  }, [])

  // const recipeGridItems: RecipeGridItem[] = [
  //   //this is fake data, replace with real data... 
  const recipes = [
    {
      id: 1,
      name: 'Item 1',
      image: 'https://www.howsweeteats.com/wp-content/uploads/2023/09/chickpea-salad-bowl-6.jpg',
      details: 'Detail 1',
      favoriteIcon: 'https://example.com/icon1.png',
      frontButtonText: 'Recipe Details',
      backButtonText: 'More Info',
      description: 'Description 1',
      cookTime: '30',
      nutrient: 'Nutrient 1',
      ingredients: ['Ingredient 1', 'Ingredient 2'],
      instructions: ['Step 1', 'Step 2']
    },
    {
      id: 2,
      name: 'Item 2',
      image: 'https://www.inspiredtaste.net/wp-content/uploads/2021/03/Vegetable-Quesadilla-Recipe-1-1200-1200x800.jpg',
      details: 'Detail 2',
      favoriteIcon: 'https://example.com/icon2.png',
      frontButtonText: 'Recipe Details',
      backButtonText: 'More Info',
      description: 'Description 2',
      cookTime: '45',
      nutrient: 'Nutrient 2',
      ingredients: ['Ingredient 1', 'Ingredient 2'],
      instructions: ['Step 1', 'Step 2']
    },
    {
      id: 3,
      name: 'Item 3',
      image: 'https://fraicheliving.com/wp-content/uploads/2021/01/fraiche-living-tropical-green-smoothie.jpg',
      details: 'Detail 3',
      favoriteIcon: 'https://example.com/icon3.png',
      frontButtonText: 'Recipe Details',
      backButtonText: 'More Info',
      description: 'Description 3',
      cookTime: '60',
      nutrient: 'Nutrient 3',
      ingredients: ['Ingredient 1', 'Ingredient 2'],
      instructions: ['Step 1', 'Step 2'],
    }
    
  ]

let filteredRecipes = recipes.filter(recipe => recipe.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <section className="container"
    style={{ 
      backgroundImage: 
      `url(${value === 'calm' ? Calm : 
      value === 'energetic' ? Energy :
      value === 'relaxed' ? Relaxation :
      value === 'happy' ? HappyTheme :
      value === 'enthus' ? Enthus  :
     Relaxation})` , 
      backgroundSize: 'cover', 
      backgroundRepeat: 'repeat',
      backgroundPosition: 'center', 
      height: '100vh', 
      width: '100vw',
      backgroundAttachment: 'fixed', 
      overflow: 'auto'
     }} >

<header className="dashboard-container">
        <h1 className="dashboard">Mood Board</h1>
        <div className='link-styling'>
           <Link to='/recipes' className='navigate' onClick={() => navigate('/recipes')}>Recipes</Link>
        <Link to='/home' className='navigate' onClick={() => navigate('/')}>Home</Link>
        </div>
       
      </header>
    <div className='quote-container'>
     <div className='search-container'>
        <label className='time-label' htmlFor='search'>Search recipe by name</label>
        <input id='search' className='search' type='text' placeholder='Search recipe by name' onChange={(event) => setSearch(event.target.value)} />
      </div>
      <h2 className="average-mood-score">Average mood score: 7.5</h2>
      <h3 className="affirmation">{quote}</h3>
      </div>
  <RecipeGrid items={filteredRecipes} /> 
    </section>
  )
}
