import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import affirmations from '../../Quotes/quotes'
import RecipeGrid from '../RecipeGrid/RecipeGrid'
import './Dashboard.css'
import { RecipeGridItem } from '../../types';
import Relaxation from '../../assets/relaxation.jpeg';
import Calm from '../../assets/calm.jpeg';
import HappyTheme from '../../assets/happy.jpeg';
import Energy from '../../assets/energy.jpeg'
import Enthus from '../../assets/enthus.jpeg';
import { motion } from 'framer-motion';

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

  const recipeGridItems: RecipeGridItem[] = [
    //this is fake data, replace with real data... 
    {
      id: '1',
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
      id: '2',
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
      id: '3',
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
    },
    
  ]

let filteredRecipes = recipeGridItems.filter(recipe => recipe.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <motion.div initial={{scaleX:0}} animate={{scaleX:1}} exit={{scaleX:0}} transition={{duration: 0.5}}>
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
        <h2 className="dashboard">Mood Board</h2>
        <p className='navigate' onClick={() => navigate('/recipes')}>Recipes</p>
        <p className='navigate' onClick={() => navigate('/')}>Home</p>
      </header>
      <input className='search' type='text' placeholder='Search recipe by name' onChange={(event) => setSearch(event.target.value)} />
      <h3 className="average-mood-score">Average mood score: 7.5</h3>
      <h3 className="affirmation">{quote}</h3>
      <RecipeGrid items={filteredRecipes} customClass="dashboard-recipeGrid" />
    </section>
    </motion.div>
  )
}
