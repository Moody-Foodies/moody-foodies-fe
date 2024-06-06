import './RecipeGrid.css';
import Card from '../Card/Card';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';


interface AllRecipe {
  id: number;
  name: string;
  image: string;
  details: string;
  favoriteIcon: string;
  frontButtonText: string;
  backButtonText: string;
  description: string;
  cookTime: string;
  nutrient: string;
  ingredients: string[];
  instructions: string[];
}

interface ItemProps {
  items: AllRecipe[]
}

export default function RecipeGrid({ items }: ItemProps) {
  const [allRatings, setAllRatings] = useState(getStarRatings())


  function getRatings(id: number, rating: number){
    setAllRatings({...allRatings, [id]: rating})
  }

  useEffect(() => {
    localStorage.setItem('allRatings', JSON.stringify(allRatings))
  }, [allRatings])

  function getStarRatings(){
    const starRatings = localStorage.getItem('allRatings') || '{}';
  const initialValue = JSON.parse(starRatings);
  return initialValue || "";
  }
  


  return (
    <div className='recipe-grid'>
      {items.map(item => (
        <Card
         name={item.attributes.name}
         id={item.id}
         key={item.id}
         image={item.attributes.image}
         getRatings={getRatings}
         allRatings={allRatings}
         ingredients={item.attributes.ingredients}
         instructions={item.attributes.instructions}
        />

      ))}
    </div>
  );
}