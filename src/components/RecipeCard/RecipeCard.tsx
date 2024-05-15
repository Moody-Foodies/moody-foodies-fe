import { useState } from 'react';
import Favorite from '../../assets/favorite.png';
import Unfavorite from '../../assets/unfavorite.png';
import './RecipeCard.css';

type RecipeProps = {
    name: string; 
    description: string, 
    cookTime: number, 
    image: string, 
    nutrient: string,
    id: number
}

export default function RecipeCard({ id, name, addRecipe, deleteRecipe, description, cookTime, image, nutrient, favoriteRecipe } : RecipeProps){
    const [favorite, setFavorite] = useState('')
console.log('FAV:', favorite)
console.log('RECIPES:', favoriteRecipe)
//     function postFavoriteRecipe(){
//         if(favorite){

//          setFavorite(id)
//         } else {
//             console.log('not a favorite recipe')
//         }

//     }
// console.log(favorite)
    // useEffect(() => {
    //     localStorage.setItem('favorite', JSON.stringify(favorite));
    // }, [favorite]);
    // function getFavoriteRecipes(){
    //     const favoriteRecipes = localStorage.getItem('favorite')
    //     const saved = JSON.parse(favoriteRecipes)
    //     return saved || []
    // }
    
    
    // useEffect(() => {
    //     localStorage.setItem('favorite', JSON.stringify(favorite))
    // }, [favorite])

    // useEffect(() => {
    //     const favorite = JSON.parse(localStorage.getItem('favorite'))
    //     if(favorite) {
    //         setFavorite(favorite)
    //     }
    // }, [])

    function test(){
        setFavorite(!favorite)
        if(favorite){
            deleteRecipe(id)
        } else {
            addRecipe(id)
        }
    }

            return (
        <>
            <h3>{name}</h3>
            <p>{description}</p>
            <p>Time to Cook: {cookTime} minutes</p>
            <img className='recipe-image' src={image}/>
            <p className='nutrient'>This recipe contains ✨{nutrient}✨</p>
      
            {/* {favorite ? <img className='favorite' src={Favorite} onClick={() => check()} /> : <img className='favorite' src={Unfavorite} onClick={() => check()}/>} */}
            {favoriteRecipe.includes(id) ? <img className='favorite' src={Favorite} onClick={() => test(id)}/> : <img className='favorite' src={Unfavorite} onClick={() => test(id)}/>}
            <button onClick={() => postFavoriteRecipe()}>TEST</button>
        </>
    )

  

}

// if you click on the heart, will toggle between false and true. 
// if click on heat, will print out id of recipe. 
// if click on heart and favorite === true, then set 
// favorite recipes to id 
// if click on heart and favorite === false, then delete 
//  id from favorite recipes. 
// if favorite ....show this heart
// if not-favorite ... show other heart. 