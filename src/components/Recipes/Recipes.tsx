import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Brain from '../../assets/brain.png'; ;
import RecipeGrid from '../RecipeGrid/RecipeGrid';
import './Recipes.css';
import { CarouselItem } from '../../types'; 
import { motion } from 'framer-motion';
import { RecipeGridItem } from '../../types';
import Relaxation from '../../assets/relaxation.jpeg';
import Calm from '../../assets/calm.jpeg';
import HappyTheme from '../../assets/happy.jpeg';
import Energy from '../../assets/energy.jpeg'
import Enthus from '../../assets/enthus.jpeg' 

interface Recipe {
  id: string,
  type: string,
  attributes: {
    image: string;
    name: string;
    description: string;
    time_to_cook: string;
    nutrient: string;
    ingredients: string[];
    instructions: string[];
  };
}

interface LocationState {
  mood: string;
  value: string; 
  time: string;
  data: Recipe[];
}

export default function Recipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  const value = state.value; 
  useEffect(() => {
    setRecipes(state.data);
  }, [state.data]);

  console.log('VALUE:', state.value)

  const recipeGridItems: RecipeGridItem[] = recipes.map(recipe => ({
    id: recipe.id, 
    name: recipe.attributes.name,
    image: recipe.attributes.image,
    details: recipe.attributes.description,
    favoriteIcon: Brain, 
    frontButtonText: 'Recipe Details',
    backButtonText: 'Go Back',
    description: recipe.attributes.description, 
    cookTime: recipe.attributes.time_to_cook,   
    nutrient: recipe.attributes.nutrient,       
    ingredients: recipe.attributes.ingredients, 
    instructions: recipe.attributes.instructions 
  }));


  return (
    <motion.div initial={{scaleX:0}} animate={{scaleX:1}} exit={{scaleX:0}} transition={{duration: 0.3}}>
    <main 
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
     }} 
    className='recipe-container'>
      <header className='recipeGrid'>
        <h2 className='previous' onClick={() => navigate('/')}>⬅</h2>
        <h2 className='title'>Food for Your Mood</h2>
        <img className='dashboard-icon' src={Brain} onClick={() => navigate('/dashboard')} />
      </header>
      <RecipeGrid recipes={recipes} items={recipeGridItems} customClass="recipe-grid" />
    </main>
    </motion.div>
  );
}
