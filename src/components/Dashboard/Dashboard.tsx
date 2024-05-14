import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import affirmations from '../../Quotes/quotes';
import Carousel from '../Carousel/Carousel';
import './Dashboard.css';

type Affirmation = {
  quote: string;
};

export default function Dashboard() {
  const [quote, setQuote] = useState('');
  const navigate = useNavigate();

  function getRandomAffirmation(affirmations: Affirmation[]) {
    let randomQuote = affirmations[Math.floor(Math.random() * affirmations.length)];
    setQuote(randomQuote.quote);
  }

  useEffect(() => {
    getRandomAffirmation(affirmations);
  }, []);

  const carouselItems = [
    {
      name: "Item 1",
      image: "https://example.com/image1.jpg",
      details: "Detail 1",
      favoriteIcon: "https://example.com/icon1.png",
      frontButtonText: "Details",
      backButtonText: "More Info",
    },
    {
      name: "Item 2",
      image: "https://example.com/image2.jpg",
      details: "Detail 2",
      favoriteIcon: "https://example.com/icon2.png",
      frontButtonText: "Details",
      backButtonText: "More Info",
    },
  ];

  return (
    <section className="container">
      <header className="dashboard-container">
        <h2 className="back-arrow" onClick={() => navigate('/')}>⬅</h2>
        <h2 className="dashboard">Mood Board</h2>
      </header>
      <h3 className="average-mood-score">Average mood score: 7.5</h3>
      <h3 className="affirmation">{quote}</h3>
      <Carousel items={carouselItems} customClass="dashboard-carousel" />
    </section>
  );
}
