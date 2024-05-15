import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Recipes.css';
import ReactCardFlip from 'react-card-flip';
import { useNavigate, useLocation } from 'react-router-dom';
import Brain from '../../assets/brain.png'; 
import RecipeCard from '../RecipeCard/RecipeCard'
import Favorite from '../../assets/favorite.png';
import Unfavorite from '../../assets/unfavorite.png';
  type Attributes = { 
    name: string, 
    time_to_cook: number, 
    nutrient: string, 
    image: string,
    description: string,
    ingredients: string[],
    instructions: string[]
  }

  type Recipe = {
    id: number, 
    type: string,
    attributes: Attributes
  }

export default function Recipes() {
  const [isFlipped, setIsFlipped] = useState<boolean>(false)
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [favoriteRecipe, setFavoriteRecipe] = useState(getFavoriteRecipes())
  const [favorite, setFavorite] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  // let mood = location.state.mood;
  // let time = location.state.time;
  useEffect(() => {
    setRecipes(location.state.data)
  }, [])
console.log(recipes)
  let settings = {
    dots: true, 
    infinite: true, 
    speed: 500, 
    slidesToShow: 1, 
    slidesToScroll: 1,
    nextArrow: (
      <div>
        <div onClick={() => setIsFlipped(false)} className="next-arrow">{'>'}</div>
      </div>
    ),
    prevArrow: (
      <div>
        <div className="prev-arrow">{'<'}</div>
      </div>
    )
  }

  function addRecipe(id) {
    setFavoriteRecipe([...favoriteRecipe, id])
  }

  function deleteRecipe(id){
    let filteredRecipes = favoriteRecipe.filter(recipe => recipe !== id)
    setFavoriteRecipe(filteredRecipes)
  }
    useEffect(() => {
        localStorage.setItem('favoriteRecipe', JSON.stringify(favoriteRecipe));
    }, [favoriteRecipe]);
    function getFavoriteRecipes(){
        const favoriteRecipe = localStorage.getItem('favoriteRecipe')
        const saved = JSON.parse(favoriteRecipe)
        return saved || []
    }
    
    
    // useEffect(() => {
    //     localStorage.setItem('favorite', JSON.stringify(favorite))
    // }, [favorite])

    // useEffect(() => {
    //     const test = JSON.parse(localStorage.getItem('test'))
    //     if(test) {
    //         setTest(test)
    //     }
    // }, [])


  return (
    <main className='recipe-container'>
      <header className='carousel' >
        <h2 className='previous' onClick={() => navigate('/')}>⬅</h2>
        <h2 className='title'>Food for Your Mood</h2>
        <img className='dashboard-icon' src={Brain} onClick={() => navigate('/dashboard')}/>
      </header>
    <Slider {...settings}>
    {recipes.map(recipe => {
      return (
        <ReactCardFlip
        isFlipped={isFlipped}
        flipDirection="horizontal"
        >
        <section className="front">
          <RecipeCard
          key={recipe.id} 
          id={recipe.id}
          image={recipe.attributes.image}
          name={recipe.attributes.name}
          description={recipe.attributes.description}
          cookTime={recipe.attributes.time_to_cook}
          nutrient={recipe.attributes.nutrient}
          favoriteRecipe={favoriteRecipe}
          addRecipe={addRecipe}
          deleteRecipe={deleteRecipe}

          />
          <button onClick={() => setIsFlipped(!isFlipped)} className='ingredient-button'>Ingredients & Instructions</button>
          <button onClick={() => setFavoriteRecipe('')}>reset</button>
          <button onClick={() => checkState()}>Checking!!</button>
        </section> 
        <section className="back">
         <section className='ingredient-container'>
            <h4>Ingredients</h4>
          {recipe.attributes.ingredients.map(ingredient => {
          return (
            <li>{ingredient}</li>
          )
        })}
        <h4>Instructions</h4>
        {recipe.attributes.instructions.map(instruction => {
          return (
            <ol>{instruction}</ol>
          )
        })}
        </section>
        <button className='recipe-button'onClick={() => setIsFlipped(!isFlipped)}>Recipe</button> 
      </section>
    </ReactCardFlip>
    )
  })}
    </Slider> 
   </main>
  )
}

