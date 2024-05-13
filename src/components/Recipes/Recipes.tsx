import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Recipes.css';
import ReactCardFlip from 'react-card-flip';
import Favorite from '../../assets/favorite.png';
import { useNavigate, useLocation } from 'react-router-dom';
import Brain from '../../assets/brain.png'
import Unfavorite from '../../assets/unfavorite.png'

export default function Recipes() {
  const [isFlipped, setIsFlipped] = useState<boolean>(false)
  const [recipes, setRecipes] = useState([])
  const [favorite, setFavorite] = useState<boolean>(false)
  const navigate = useNavigate()
  const location = useLocation()
  let mood = location.state.mood;
  let time = location.state.time;
   console.log('MOOD:', mood)
  console.log('TIME:', time)
 
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
console.log(favorite)
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
        <h3>{recipe.attributes.name}</h3>
        <p>{recipe.attributes.description}.</p>
        <p>Time to Cook: {recipe.attributes.time_to_cook} minutes</p>
        {favorite ? <img className='favorite' src={Favorite} onClick={() => setFavorite(!favorite)}/> : <img className='favorite' src={Unfavorite} onClick={() => setFavorite(!favorite)}/>}
        <img className='recipe-image' src={recipe.attributes.image}/>
        <p className='nutrient'>This recipe contains ✨{recipe.attributes.nutrient}✨</p>
        {/* {recipe.attributes.ingredients.map(ingredient => {
          return (
            <p>{ingredient}</p>
          )
        })} */}
        <button onClick={() => setIsFlipped(!isFlipped)} className='ingredient-button'>Ingredients & Directions</button>
      </section> 
      <section className="back">
        {/* <h3>{t.details}</h3> */}
        {favorite ? <img className='favorite' src={Favorite} onClick={() => setFavorite(!favorite)}/> : <img className='favorite' src={Unfavorite} onClick={() => setFavorite(!favorite)}/>}
         <section className='ingredient-container'>
            <h4>Ingredients</h4>
        {recipe.attributes.ingredients.map(ingredient => {
          return (
           
            <li>{ingredient}</li>
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

