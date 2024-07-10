import './RecipeGrid.css';
import Card from '../Card/Card';
import { useState, useEffect } from 'react';

interface AllRecipe {
  id: string;
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
  attributes: any,
  getRatings: (id: string, rating: number) => void,
}

interface ItemProps {
  items: AllRecipe[],
  deleteRecipe: any
}

interface PreviousRatings {
  [user: number]: {
    [id: string]: number
  }
}


export default function RecipeGrid({ items, deleteRecipe }: ItemProps) {
  const [allRatings, setAllRatings] = useState(getStarRatings())
  const [user, setUser] = useState(getUser())

  useEffect(() => {
    setUser(user)
  }, [])

  function getRatings(id: string, rating: number, user: number){
    setAllRatings((prevRatings: PreviousRatings) => ({
      ...prevRatings,
      [user]: {
        ...prevRatings[user], 
        [id]: rating
      }
    }));
  }

  useEffect(() => {
    localStorage.setItem('allRatings', JSON.stringify(allRatings))
  }, [allRatings])

  function getUser(){
    const user = localStorage.getItem('user') || '';
    const initialValue = user ? JSON.parse(user) : null;
    return initialValue || "";
  }

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
         attributes={item.attributes}
         deleteRecipe={deleteRecipe}
        />

      ))}
    </div>
  );
}