import { useState } from 'react'; 
import Slider from 'react-slick'; 
import ReactCardFlip from 'react-card-flip'; 
import Favorite from '../../assets/favorite.png'; 
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default function Carousel() {
const [isFlipped, setIsFlipped] = useState<boolean>(false)

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
}

let test = [
  {
    name: 1,
    image:
      'https://handletheheat.com/wp-content/uploads/2015/03/Best-Birthday-Cake-with-milk-chocolate-buttercream-SQUARE.jpg',
    details: 'YAY',
  },
  {
    name: 2,
    image:
      'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2009/4/5/1/IG1C17_30946_s4x3.jpg.rend.hgtvcom.1280.1280.suffix/1433541424559.jpeg',
    details: 'work work work',
  },
]

  return (
    <Slider {...settings}>
        {test.map((t) => {
          return (
            <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
              <section className="front">
                <h3>{t.name}</h3>
                <img
                  className="favorite"
                  src={Favorite}
                  onClick={() => console.log('yes!!')}
                />
                <img src={t.image} />
                <button onClick={() => setIsFlipped(!isFlipped)}>
                  Educational Details
                </button>
              </section>
              <section className="back">
                <h3>{t.details}</h3>
                <img
                  className="favorite"
                  src={Favorite}
                  onClick={() => console.log('yes!!')}
                />
                <button onClick={() => setIsFlipped(!isFlipped)}>Recipe</button>
              </section>
            </ReactCardFlip>
          )
        })}
      </Slider>
  )
}
