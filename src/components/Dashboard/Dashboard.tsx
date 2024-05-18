import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

interface Affirmation {
  quote: string;
}

export default function Dashboard() {
  const [quote, setQuote] = useState<string>('');
  const navigate = useNavigate();

  function getRandomAffirmation(affirmations: Affirmation[]) {
    let randomQuote = affirmations[Math.floor(Math.random() * affirmations.length)];
    setQuote(randomQuote.quote);
  }

  useEffect(() => {
    getRandomAffirmation(affirmations);
  }, []);

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
    {
      id: '2',
      name: 'Item 2',
      image: 'https://www.inspiredtaste.net/wp-content/uploads/2021/03/Vegetable-Quesadilla-Recipe-1-1200-1200x800.jpg',
      details: 'Detail 2',
      favoriteIcon: 'https://example.com/icon2.png',
      frontButtonText: 'Recipe Details',
      backButtonText: 'Go Back',
      description: 'Description 2',
      cookTime: '45',
      nutrient: 'Nutrient 2',
      ingredients: ['Ingredient 1', 'Ingredient 2'],
      instructions: ['Step 1', 'Step 2'],
    },
    {
      id: '3',
      name: 'Item 3',
      image: 'https://fraicheliving.com/wp-content/uploads/2021/01/fraiche-living-tropical-green-smoothie.jpg',
      details: 'Detail 3',
      favoriteIcon: 'https://example.com/icon3.png',
      frontButtonText: 'Recipe Details',
      backButtonText: 'Go Back',
      description: 'Description 3',
      cookTime: '60',
      nutrient: 'Nutrient 3',
      ingredients: ['Ingredient 1', 'Ingredient 2'],
      instructions: ['Step 1', 'Step 2'],
    },
  ];

  return (
    <section className="container">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="back"
            onClick={() => navigate('/')}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Mood Board
          </Typography>
          <IconButton
            color="inherit"
            aria-label="dashboard"
            onClick={() => navigate('/dashboard')}
          >
            <BrainIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <RecipeGrid items={recipeGridItems} />

      <Typography variant="h6" component="div" sx={{ mt: 2 }}>
        Average mood score: 7.5
      </Typography>
      <Typography variant="h6" component="div" sx={{ mt: 2 }}>
        {quote}
      </Typography>
    </section>
  );
}
