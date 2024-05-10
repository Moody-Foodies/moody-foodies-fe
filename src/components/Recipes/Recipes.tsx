import { useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Recipes.css';
import ReactCardFlip from 'react-card-flip';

export default function Recipes() {
  const [isFlipped, setIsFlipped] = useState(false)
  let test = [{name: 1, 
    details: "YAY EDUCATION"},{ 
    name: 2, 
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
//     prevArrow: (
//       // <div>
//         <div className="prev-arrow">{'<'}</div>
// /
//     )
  }

console.log(isFlipped)
  return (
    <main className='recipe-container'>
          <h2>Food for your Mood</h2>
    <Slider {...settings}>
    {test.map(t => {
      return (
        <ReactCardFlip
        isFlipped={isFlipped}
        flipDirection="vertical"
        >
        
        <section className="front">
        <h3>{t.name}</h3>
        <button onClick={() => setIsFlipped(!isFlipped)}>Educational Details</button>
      </section> 
      <section className="back">
        <h3>{t.details}</h3>
        <button onClick={() => setIsFlipped(!isFlipped)}>Recipe</button>
      </section>
      
      </ReactCardFlip>
      )
    })}
      
 
      </Slider> 
 
   </main>
  )

 

}

