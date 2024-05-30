import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import RecipeGrid from '../RecipeGrid/RecipeGrid';
import Error from '../Error/Error';
import './Recipes.css';
import Favorite from '../../assets/favorite.png';
import Unfavorite from '../../assets/unfavorite.png';
import Relaxation from '../../assets/relaxation.jpeg';
import Calm from '../../assets/calm.jpeg';
import HappyTheme from '../../assets/happy.jpeg';
import Energy from '../../assets/energy.jpeg'
import Enthus from '../../assets/enthus.jpeg';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Test from '../Test/Test'

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
  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    // Load initial favorite states from localStorage
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || {};
    setFavorites(savedFavorites);
  }, []);

  const toggleFavorite = (id) => {
    const newFavorites = { ...favorites, [id]: !favorites[id] };
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

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
  let recipes = [
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
    }
    
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
  // const recipeGridItems: RecipeGridItem[] = test.map(recipe => ({
  //   id: recipe.id, 
  //   name: recipe.name,
  //   image: recipe.image,
  //   details: recipe.description,
  //   favoriteIcon: Favorite, 
  //   frontButtonText: 'Recipe Details',
  //   backButtonText: 'Go Back',
  //   description: recipe.description, 
  //   cookTime: recipe.cookTime,   
  //   nutrient: recipe.nutrient,       
  //   ingredients: recipe.ingredients, 
  //   instructions: recipe.instructions 
  // }));

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      }
    ]
  };
  return (
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
      <Slider {...settings}>
      
        {recipes.map(recipe => {
          return (
     
            <Test
              name={recipe.name}
              image={recipe.image}
              ingredients={recipe.ingredients}
              instructions={recipe.instructions}
              cookTime={recipe.cookTime}
              description={recipe.description}
              id={recipe.id}
              isFavorite={favorites[recipe.id]}
              toggleFavorite={() => toggleFavorite(recipe.id)}
         
            />
            
          )
          
        })}

        </Slider>
    </main>
  )
 
}
