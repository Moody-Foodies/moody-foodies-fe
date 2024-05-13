import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Recipes.css';
import ReactCardFlip from 'react-card-flip';
import Favorite from '../../assets/favorite.png';
import { useNavigate, useLocation } from 'react-router-dom';
import Brain from '../../assets/brain.png'

export default function Recipes() {
  const [isFlipped, setIsFlipped] = useState<boolean>(false)
  const [recipes, setRecipes] = useState([])
  const navigate = useNavigate()
  const location = useLocation()
  let mood = location.state.mood;
  let time = location.state.time;
   console.log('MOOD:', mood)
  console.log('TIME:', time)
  useEffect(() => {
    setRecipes(location.state.data)
  }, [])


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

  return (
    <main className='recipe-container'>
      <header className='carousel' >
        <h2 className='previous' onClick={() => navigate('/')}>⬅</h2>
        <h2 className='title'>Food for Your Mood</h2>
        <img className='brain' src={Brain} />
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
        <img className='favorite' src={Favorite} onClick={() => console.log("yes!!")}/>
        <img className='recipe-image' src={recipe.attributes.image}/>
        <button onClick={() => setIsFlipped(!isFlipped)}>Educational Details</button>
      </section> 
      <section className="back">
        {/* <h3>{t.details}</h3> */}
        <img className='favorite' src={Favorite} onClick={() => console.log("yes!!")}/>
        <button onClick={() => setIsFlipped(!isFlipped)}>Recipe</button>
      </section>
      </ReactCardFlip>
      )
  })}
      </Slider> 
   </main>
  )
}

