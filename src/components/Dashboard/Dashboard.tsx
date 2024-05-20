import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import affirmations from '../../Quotes/quotes';
import RecipeGrid from '../RecipeGrid/RecipeGrid';
import './Dashboard.css';
import { RecipeGridItem } from '../../types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BrainIcon from '@mui/icons-material/EmojiEmotions';
import Relaxation from '../../assets/relaxation.jpeg';
import Calm from '../../assets/calm.jpeg';
import HappyTheme from '../../assets/happy.jpeg';
import Energy from '../../assets/energy.jpeg'
import Enthus from '../../assets/enthus.jpeg';
import { motion } from 'framer-motion';

interface Affirmation {
  quote: string;
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

  function getRandomAffirmation(affirmations: Affirmation[]) {
    let randomQuote = affirmations[Math.floor(Math.random() * affirmations.length)];
    setQuote(randomQuote.quote);
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
      backButtonText: 'Go Back',
      description: 'Description 1',
      cookTime: '30',
      nutrient: 'Nutrient 1',
      ingredients: ['Ingredient 1', 'Ingredient 2'],
      instructions: ['Step 1', 'Step 2'],
    },
    // Add more items...
  ];

  return (
    <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} exit={{ scaleX: 0 }} transition={{ duration: 0.3 }}>
      <section className="container" style={{
        backgroundImage: `url(${value === 'calm' ? Calm : 
          value === 'energetic' ? Energy :
          value === 'relaxed' ? Relaxation :
          value === 'happy' ? HappyTheme :
          value === 'enthus' ? Enthus :
          Relaxation})`, 
        backgroundSize: 'cover', 
        backgroundRepeat: 'repeat',
        backgroundPosition: 'center', 
        height: '100vh', 
        width: '100vw',
        backgroundAttachment: 'fixed', 
        overflow: 'auto'
      }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="back" onClick={() => navigate('/')}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Mood Board
            </Typography>
            <IconButton color="inherit" aria-label="dashboard" onClick={() => navigate('/dashboard')}>
              <BrainIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
  
        <RecipeGrid items={recipeGridItems} />
      </section>
    </motion.div>
  );
}
