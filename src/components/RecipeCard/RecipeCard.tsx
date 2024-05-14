import { useState } from 'react';
import Favorite from '../../assets/favorite.png';
import Unfavorite from '../../assets/unfavorite.png';
import './RecipeCard.css';

type RecipeProps = {
    name: string; 
    description: string, 
    cookTime: number, 
    image: string, 
    nutrient: string
}

export default function RecipeCard({ name, description, cookTime, image, nutrient } : RecipeProps){
    const [favorite, setFavorite] = useState(false)

    return (
        <>
        <h3>{name}</h3>
        <p>{description}</p>
        <p>Time to Cook: {cookTime} minutes</p>
        <img className='recipe-image' src={image}/>
        <p className='nutrient'>This recipe contains ✨{nutrient}✨</p>
        {favorite ? <img className='favorite' src={Favorite} onClick={() => setFavorite(!favorite)}/> : <img className='favorite' src={Unfavorite} onClick={() => setFavorite(!favorite)}/>}
        </>
        
    )
}