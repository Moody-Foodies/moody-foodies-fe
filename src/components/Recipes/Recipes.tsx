import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Brain from '../../assets/brain.png'; ;
import Carousel from '../Carousel/Carousel';
import './Recipes.css';
import { CarouselItem } from '../../types'; 

interface Recipe {
  id: string;
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
  time: string;
  data: Recipe[];
}

export default function Recipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;

  useEffect(() => {
    setRecipes(state.data);
  }, [state.data]);


  const carouselItems: CarouselItem[] = recipes.map(recipe => ({
    id: recipe.id, 
    name: recipe.attributes.name,
    image: recipe.attributes.image,
    details: recipe.attributes.description,
    favoriteIcon: Brain, 
    frontButtonText: 'Ingredients & Instructions',
    backButtonText: 'Recipe',
    description: recipe.attributes.description, 
    cookTime: recipe.attributes.time_to_cook,   
    nutrient: recipe.attributes.nutrient,       
    ingredients: recipe.attributes.ingredients, 
    instructions: recipe.attributes.instructions 
  }));

  const recipeCarouselSettings = { 
    dots: true, 
    infinite: true, 
    speed: 500, 
    slidesToShow: 1, 
    slidesToScroll: 1, 
  };

  return (
    <main className='recipe-container'>
      <header className='carousel'>
        <h2 className='previous' onClick={() => navigate('/')}>⬅</h2>
        <h2 className='title'>Food for Your Mood</h2>
        <img className='dashboard-icon' src={Brain} onClick={() => navigate('/dashboard')} />
      </header>
      <Carousel items={carouselItems} settings={recipeCarouselSettings} customClass="recipe-carousel" />
    </main>
  );
}
