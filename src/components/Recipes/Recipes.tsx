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

// interface LocationState {
//   mood: string;
//   value: string; 
//   time: string;
//   data: Recipe[];
// }

export default function Recipes() {

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  // const [value, setValue] = useState<string>('')
  const navigate = useNavigate();
  const location = useLocation();
  let recipeByMood = location.state.data
  let token = location.state.token
  let user = location.state.user
  let value = location.state.value

  // const [favorite, setFavorite] = useState(false)
  const [favorites, setFavorites] = useState(getFavorites());
  const [favoriteRecipe, setFavoriteRecipe] = useState([])
  // const [favorite, setFavorite] = useState(false)
  // useEffect(() => {
  //   const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || {};
  //   setFavorites(savedFavorites);
  // }, []);

  // function toggleFavorite (id: number) {
  //   if(!favorites.includes(id)){
  //     setFavorites([...favorites, id])
  //   }
  // }

  function toggleFavorite (id: number) {
    if(!favorites.includes(id)){
      setFavorites([...favorites, id])
    }
    let favoriteRecipe = recipes.find(recipe => {
      return recipe.id === id
    })
    console.log(favoriteRecipe)
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
    .then(data => console.log(data))
     }
//     useEffect(() => {
// fetch('https://brain-food-501b641e50fb.herokuapp.com/api/v1/recipes/favorites', {
//       method: 'POST', 
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`
//       },
//       body: JSON.stringify({
//         favoriteRecipe, 
//         user_id: user
//       })
//     })
//     .then(res => res.json())
//     .then(data => console.log(data))
//     }, [favoriteRecipe])
    
     

     function removeFavorite(id: number){
      let newFavorites = favorites.filter((fav: number) => fav !== id)
      setFavorites(newFavorites)
      console.log('removing this guy:', id)
      fetch(`https://brain-food-501b641e50fb.herokuapp.com/api/v1/recipes/favorites`, {
        method: 'DELETE',
        body: JSON.stringify({
          recipe_id: id
        }),
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => console.log(data))
     }


// console.log(id, favorite)
//     // setFavorite(toggle[!favorite])
//     // // const newFavorites = { ...favorites, [id]: !favorites[id] };
//     // setFavorites([...favorites, id]);
//     // localStorage.setItem('favorites', JSON.stringify(newFavorites));
//   };
 

// if(!state){
//   return (
//     <Error />
//   )
// }
  useEffect(() => {
    setRecipes(recipeByMood);
    // setValue(state.value)
  }, []);

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

    useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

   function getFavorites(){
    const favorites = localStorage.getItem('favorites') || '[]';
    const initialValue = JSON.parse(favorites);
    return initialValue || "";
  }

  function getFavoriteRecipes() {

    fetch(`https://brain-food-501b641e50fb.herokuapp.com/api/v1/recipes/favorites?user_id=${user}`, {
      method: 'GET', 
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }) 
      .then(res => res.json())
      .then(data => console.log('ALLFAVS:', data))
      // navigate('/dashboard', {state: { value: value} })
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
        <h1 className='title'>Food for Your Mood</h1>
        <div className='link-container'>
          <Link to='/dashboard' className='menu' onClick={() => getFavoriteRecipes()}>Mood Board</Link>
          <Link to='/home' className='menu' onClick={() => navigate('/', {state: {value: value, user: user, token: token}})}>Home</Link>
          <Link to='/' className='menu'>Logout</Link>
        </div>
      </header>
     <section className='benefit-container'><p className='health-benefit'><span>💡 Did you know?</span> {recipeByMood[0].attributes.health_benefits}</p></section>
      <Slider {...settings}>
        {recipes.map(recipe => {
          return (
            <Test
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
            />
          )
        })}

        </Slider>
    </main>
  )
 
}
