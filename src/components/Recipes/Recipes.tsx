import { useState } from 'react'
// import Carousel from '../Carousel/Carousel'

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Recipes.css';

function Recipes() {
  const [flip, setFlip] = useState(false)
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
    // nextArrow: (
    //   <div>
    //     <div className="next-arrow">{'>'}</div>
    //   </div>
    // ),
    // prevArrow: (
    //   <div>
    //     <div className="prev-arrow">{'<'}</div>
    //   </div>
    // )
  }

  console.log(flip)
  return (
    <main className='recipe-container'>
          <h2>Food for your Mood</h2>
      <Slider {...settings}>
    {test.map(t => {
      return (
        <section className='recipe-carousel'>
        {!flip ? <h2>{t.name}</h2> : <h2>{t.details}</h2>}
        <button onClick={() => setFlip(!flip)}>Educational Details</button>
      </section>
      )
    })}
      
 
      </Slider> 
 
   </main>
  )

 

}

export default Recipes
