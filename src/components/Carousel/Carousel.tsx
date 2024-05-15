import { useState, useEffect } from 'react'
import Slider from 'react-slick'
import ReactCardFlip from 'react-card-flip'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Favorite from '../../assets/favorite.png'
import Unfavorite from '../../assets/unfavorite.png'
import './Carousel.css'
import { CarouselItem } from '../../types'

interface CarouselProps {
  items: CarouselItem[]
  settings?: object
  customClass?: string
}

export default function CustomCarousel({
  items = [],
  settings,
  customClass,
}: CarouselProps) {
  const [isFlipped, setIsFlipped] = useState<{ [key: string]: boolean }>({})
  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({})

  useEffect(() => {
    console.log('Carousel items:', items)
  }, [items])

  const defaultSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  }

  const finalSettings = { ...defaultSettings, ...settings }

  const handleFlip = (id: string) => {
    setIsFlipped((prevState) => ({ ...prevState, [id]: !prevState[id] }))
  }

  const toggleFavorite = (id: string) => {
    setFavorites((prevState) => ({ ...prevState, [id]: !prevState[id] }))
  }

  return (
    <Slider {...finalSettings} className={customClass}>
      {Array.isArray(items) && items.length > 0 ? (
        items.map((item) => (
          <ReactCardFlip
            key={item.id}
            isFlipped={isFlipped[item.id]}
            flipDirection="horizontal"
          >
            <section className="front">
              <h3>{item.name}</h3>
              <img
                className="favorite"
                src={favorites[item.id] ? Favorite : Unfavorite}
                onClick={() => toggleFavorite(item.id)}
                alt="Favorite"
              />
              <img src={item.image} alt={item.name} className="recipe-image" />
              <p>{item.description}</p>
              <p>Time to Cook: {item.cookTime} minutes</p>
              <p className="nutrient">
                This recipe contains ✨{item.nutrient}✨
              </p>
              <button onClick={() => handleFlip(item.id)}>
                {item.frontButtonText}
              </button>
            </section>
            <section className="back">
              <h3>Ingredients & Instructions</h3>
              <section className="ingredient-container">
                <h4>Ingredients</h4>
                <ul>
                  {item.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
                <h4>Instructions</h4>
                <ol>
                  {item.instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </ol>
              </section>
              <button onClick={() => handleFlip(item.id)}>
                {item.backButtonText}
              </button>
            </section>
          </ReactCardFlip>
        ))
      ) : (
        <p>No items to display</p>
      )}
    </Slider>
  )
}
