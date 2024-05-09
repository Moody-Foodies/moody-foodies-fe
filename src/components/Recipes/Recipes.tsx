// import { useState } from 'react'
// import Carousel from '../Carousel/Carousel'

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Recipes.css';

function Recipes() {
  let test = [1, 2, 3, 4, 5]
  let settings = {
    dots: true, 
    infinite: true, 
    speed: 500, 
    slidesToShow: 1, 
    slidesToScroll: 1
  }
  return (
    <>
      <p>Recipes Component</p>
      <Slider {...settings}>
    {test.map(t => {
      return (
        <section className='recipe-carousel'>
        <h2>{t}</h2>
      </section>
      )
    })}
      
 
      </Slider> 
    </>
  )
}

export default Recipes
