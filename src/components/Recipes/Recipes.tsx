import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Favorite from '../../assets/favorite.png'
import RecipeGrid from '../RecipeGrid/RecipeGrid';
import Error from '../Error/Error';
import './Recipes.css';
import { motion } from 'framer-motion';
import { RecipeGridItem } from '../../types';
import Relaxation from '../../assets/relaxation.jpeg';
import Calm from '../../assets/calm.jpeg';
import HappyTheme from '../../assets/happy.jpeg';
import Energy from '../../assets/energy.jpeg'
import Enthus from '../../assets/enthus.jpeg';

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
  // const [recipes, setRecipes] = useState<Recipe[]>(getRecipes());
  const [value, setValue] = useState('')
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;

if(!state){
  return (
    <Error />
  )
}
  useEffect(() => {
    // setRecipes(state.data);
    setValue(state.value)
  }, [state.data]);

  // useEffect(() => {
  //   localStorage.setItem('value', JSON.stringify(value))
  // }, [value])
  
  // function getValue(){
  //   const value = localStorage.getItem('value') || '';
  //   const initialValue = JSON.parse(value);
  //   return initialValue || "";
  // // }
  // useEffect(() => {
  //   localStorage.setItem('recipes', JSON.stringify(recipes))
  // }, [recipes])
  
  // function getRecipes(){
  //   const recipes = localStorage.getItem('recipes') || '[]';
  //   const initialValue = JSON.parse(recipes);
  //   return initialValue || "";
  // }
  let test = [
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

  function getFavoriteRecipes() {
    fetch('https://brain-food-501b641e50fb.herokuapp.com/api/v1/recipes/favorites?user_id=1') 
      .then(res => res.json())
      .then(data => console.log('ALLFAVS:', data))
      navigate('/dashboard', {state: { value: value} })
  }


  // const recipeGridItems: RecipeGridItem[] = recipes.map(recipe => ({
  //   id: recipe.id, 
  //   name: recipe.attributes.name,
  //   image: recipe.attributes.image,
  //   details: recipe.attributes.description,
  //   favoriteIcon: Favorite, 
  //   frontButtonText: 'Recipe Details',
  //   backButtonText: 'Go Back',
  //   description: recipe.attributes.description, 
  //   cookTime: recipe.attributes.time_to_cook,   
  //   nutrient: recipe.attributes.nutrient,       
  //   ingredients: recipe.attributes.ingredients, 
  //   instructions: recipe.attributes.instructions 
  // }));
  const recipeGridItems: RecipeGridItem[] = test.map(recipe => ({
    id: recipe.id, 
    name: recipe.name,
    image: recipe.image,
    details: recipe.description,
    favoriteIcon: Favorite, 
    frontButtonText: 'Recipe Details',
    backButtonText: 'Go Back',
    description: recipe.description, 
    cookTime: recipe.cookTime,   
    nutrient: recipe.nutrient,       
    ingredients: recipe.ingredients, 
    instructions: recipe.instructions 
  }));


  return (
    <motion.div initial={{scaleX:0}} animate={{scaleX:1}} exit={{scaleX:0}} transition={{duration: 0.5}}>
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
        <h2 className='title'>Food for Your Mood</h2>
        <div className='link-styling'>
              <p className='navigate' onClick={() => getFavoriteRecipes()}>Mood Board</p>
        <p className='navigate' onClick={() => navigate('/', {state: {value: value}})}>Home</p>
        </div>
    
      </header>
      <RecipeGrid items={recipeGridItems} customClass="recipe-grid" />
    </main>
    </motion.div>
  );
}
