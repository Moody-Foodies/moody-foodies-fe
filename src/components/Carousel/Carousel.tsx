import { useState } from 'react'; 
import Slider from 'react-slick'; 
import ReactCardFlip from 'react-card-flip'; 
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './Carousel.css';

interface CarouselProps {
  items: any[]; // Define a more specific type if possible
  settings?: object;
  customClass?: string;
}

export default function CustomCarousel({ items, settings, customClass }: CarouselProps) {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const defaultSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  const finalSettings = { ...defaultSettings, ...settings };

  return (
    <Slider {...finalSettings} className={customClass}>
      {items.map((item, index) => (
        <ReactCardFlip key={index} isFlipped={isFlipped} flipDirection="horizontal">
          <section className="front">
            <h3>{item.name}</h3>
            <img
              className="favorite"
              src={item.favoriteIcon}
              onClick={() => console.log('yes!!')}
            />
            <img src={item.image} alt={item.name} />
            <button onClick={() => setIsFlipped(!isFlipped)}>
              {item.frontButtonText}
            </button>
          </section>
          <section className="back">
            <h3>{item.details}</h3>
            <img
              className="favorite"
              src={item.favoriteIcon}
              onClick={() => console.log('yes!!')}
            />
            <button onClick={() => setIsFlipped(!isFlipped)}>{item.backButtonText}</button>
          </section>
        </ReactCardFlip>
      ))}
    </Slider>
  );
}
