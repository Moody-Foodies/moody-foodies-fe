import './RecipeGrid.css';
import ReactStars from 'react-stars';
import { useState } from 'react';
import Card from '../Card/Card';

export default function RecipeGrid({ items }) {
  // const [rating, setRating] = useState(0)
  // function handleClick(newRating){
  //   setRating(newRating)
  // }

  return (
    <div className='recipe-grid'>
      {items.map(item => (
        <Card
         name={item.name}
         id={item.id}
        />
         
          // <input type="checkbox" onClick={(event) => console.log(event?.target.checked)}/>
          // <ReactStars 
          //           className='star-rating'
          //           count={4}
          //           color2={'#06C7EE'}
          //           value={rating}
          //           half={true}
          //           edit={true} 
          //           size={15}
          //           onChange={handleClick}
          //       />

      ))}
    </div>
  );
}