import { useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Recipes.css';
import ReactCardFlip from 'react-card-flip';
import Favorite from '../../assets/favorite.png';

export default function Recipes() {
  const [isFlipped, setIsFlipped] = useState<boolean>(false)

  let test = [{name: 1, 
    image: "https://handletheheat.com/wp-content/uploads/2015/03/Best-Birthday-Cake-with-milk-chocolate-buttercream-SQUARE.jpg",
    details: "YAY EDUCATION"},{ 
    name: 2, 
    image: "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2009/4/5/1/IG1C17_30946_s4x3.jpg.rend.hgtvcom.1280.1280.suffix/1433541424559.jpeg",
    details: "YAY THIS IS WORKING"}]

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
          <h2>Food for your Mood</h2>
    <Slider {...settings}>
    {test.map(t => {
      return (
        <ReactCardFlip
        isFlipped={isFlipped}
        flipDirection="horizontal"
        >
        
        <section className="front">
        <h3>{t.name}</h3>
        <img className='favorite' src={Favorite} onClick={() => console.log("yes!!")}/>
        <img src={t.image}/>
        <button onClick={() => setIsFlipped(!isFlipped)}>Educational Details</button>
      </section> 
      <section className="back">
        <h3>{t.details}</h3>
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

