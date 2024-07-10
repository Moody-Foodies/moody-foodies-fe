import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Error from '../Error/Error';
import './Recipes.css';
import Relaxation from '../../assets/relaxation.jpeg';
import Calm from '../../assets/calm.jpeg';
import HappyTheme from '../../assets/happy.jpeg';
import Energy from '../../assets/energy.jpeg'
import Enthus from '../../assets/enthus.jpeg';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RecipeCard from '../RecipeCard/RecipeCard'

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
    health_benefits: string
  };
}

export default function Recipes() {

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [value, setValue] = useState<string>(getValue())
  const [token, setToken] = useState(getToken())
  const [error, setError] = useState('')
  const [user, setUser] = useState(getUser())
  const [description, setDescription] = useState('')
  const [favorites, setFavorites] = useState(getFavorites())
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
   setValue(value)
    setToken(token)
    setUser(user)
    setFavorites(favorites)
    setRecipes(recipeByMood);
    getFavoriteRecipes()
  }, [])
  
  let recipeByMood: any

  if(location.state){
     recipeByMood = location.state.data 

  } else {
    return (
      <Error />
    )
  }

function getValue(){
  const value = sessionStorage.getItem('value') || '';
  const initialValue = value ? JSON.parse(value) : null;
  return initialValue || "";
}

function getToken(){
  const tokens = localStorage.getItem('token') || '';
  const initialValue = tokens ? JSON.parse(tokens) : null;
  return initialValue || "";
}

function getFavorites() {
  const favorites = localStorage.getItem('favorites') || '';
  const initialValue = favorites ? JSON.parse(favorites) : null;
  return initialValue || "";
}
function getUser(){
  const users = localStorage.getItem('user') || '';
  const initialValue = users ? JSON.parse(users) : null;
  return initialValue || "";
}

  function toggleFavorite (id: string) {
    
    let favoriteRecipe = recipes.find(recipe => {
      return recipe.id === id
    })

    fetch('https://brain-food-501b641e50fb.herokuapp.com/api/v1/recipes/favorites', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        id: favoriteRecipe?.id, 
        type: favoriteRecipe?.type, 
        attributes: {
          name: favoriteRecipe?.attributes.name, 
          description: favoriteRecipe?.attributes.description, 
          time_to_cook: favoriteRecipe?.attributes.time_to_cook,
          nutrient: favoriteRecipe?.attributes.nutrient,
          health_benefits: favoriteRecipe?.attributes.health_benefits,
          image: favoriteRecipe?.attributes.image,
          ingredients: favoriteRecipe?.attributes.ingredients, 
          instructions: favoriteRecipe?.attributes.instructions
        },
        user_id: user
      })
    })
    .then(res => res.json())
    .then(data => {
      getFavoriteRecipes()
    if(data.errors) {
      setError(data.errors[0].detail)
  }
     })
    }

     async function removeFavorite(id: string){
 
      try {

      await fetch(`https://brain-food-501b641e50fb.herokuapp.com/api/v1/recipes/favorites`, {
        method: 'DELETE',
        body: JSON.stringify({
          recipe_id: id,
          user_id: user
        }),
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => console.log(data))
      const response = await fetch(`https://brain-food-501b641e50fb.herokuapp.com/api/v1/recipes/favorites?user_id=${user}`, {
        method: 'GET', 
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      const data = await response.json();
      let favoriteId = data.data.recipes.map((fav: Recipe) => {
        return fav.id 
      })
      localStorage.setItem('favorites', JSON.stringify(favoriteId))
      getFavoriteRecipes()
     }
     catch (error) {
      console.error('Error:', error);
    }
    }

  function getFavoriteRecipes() {
    fetch(`https://brain-food-501b641e50fb.herokuapp.com/api/v1/recipes/favorites?user_id=${user}`, {
      method: 'GET', 
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }) 
      .then(res => res.json())
      .then(data => {
        let favoriteId = data.data.recipes.map((fav: Recipe) => {
          return fav.id 
        })
        localStorage.setItem('favorites', JSON.stringify(favoriteId))
      })
  }

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
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      }
    ]
  };

  function modifyDescription() {
    let splitString = recipeByMood[0].attributes.health_benefits.split(' ')
    splitString.shift()
    setDescription(splitString.join(' '))
  }

  useEffect(() => {
    modifyDescription()
  }, [])

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
        <h1 className='title'>Food for Your Mood</h1>
        <div className='link-container'>
          <Link to='/dashboard' className='menu'>Mood Board</Link>
          <Link to='/home' className='menu' onClick={() => navigate('/', {state: {value: value, user: user, token: token}})}>Home</Link>
          <Link to='/' className='menu'>Logout</Link>
        </div>
      </header>
     {(recipeByMood.length > 0) && <section className='benefit-container'><p className='health-benefit'><span>💡 Did you know?</span> {description}</p></section>}
      <Slider {...settings}>
        {recipes.map(recipe => {
          return (
            <RecipeCard
              name={recipe.attributes.name}
              key={recipe.id}
              id={recipe.id}
              image={recipe.attributes.image}
              ingredients={recipe.attributes.ingredients}
              instructions={recipe.attributes.instructions}
              cookTime={recipe.attributes.time_to_cook}
              description={recipe.attributes.description}
              removeFavorite={() => removeFavorite(recipe.id)}
              toggleFavorite={() => toggleFavorite(recipe.id)}
              favorites={favorites}
              error={error}
              healthBenefits={recipe.attributes.health_benefits}
              nutrient={recipe.attributes.nutrient}
            />
          )
        })}

        </Slider>
    </main>
  )
 
}
