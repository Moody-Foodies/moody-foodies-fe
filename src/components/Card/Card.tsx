import './Card.css';
import { useState, useEffect } from 'react';
import ReactStars from 'react-stars';


export default function Card({name, id}) {

    const [rating, setRating] = useState(getRating())
    function handleClick(newRating) {
  
      setRating(newRating)
    }
 
    useEffect(() => {
        localStorage.setItem('rating', JSON.stringify(rating))
      }, [rating])
      
      function getRating(){
        const rating = localStorage.getItem('rating') || '[]';
        const initialValue = JSON.parse(rating);
        return initialValue || '[]';
      }
       console.log(rating)

 
    return (
        <div id={id}>
            <h2>{name}</h2>
             <input type="checkbox" onClick={(event) => console.log(event?.target.checked)}/>
             <div className='rating'>
                   <p>My Rating:</p>
           <ReactStars 
                     className='star-rating'
                     count={4}
                    color2={'#06C7EE'}
                    value={rating}
                     half={true}
                    edit={true} 
                    size={15}
                   onChange={handleClick}
                   
                />
             </div>
          <button >help</button>
        </div>
    )
}