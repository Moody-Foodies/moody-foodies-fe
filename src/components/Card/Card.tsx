import './Card.css';
import { useState, KeyboardEvent, useEffect } from 'react';
import Delete from '../../assets/delete.png';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ReactCardFlip from 'react-card-flip';
import { Rating } from 'primereact/rating';
import 'primereact/resources/themes/saga-blue/theme.css';  
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import Filler from '../../assets/filler.jpg';

interface ItemProps {
  name: string, 
  id: number, 
  image: string,
  getRatings: (id: number, newRating: number) => void,
  allRatings: any
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 200,
    bgcolor: '#ffc0d0',
    overflowY: "auto",
    boxShadow: 24,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
    p: 4,
  };

export default function Card({name, image, id, ingredients, instructions, getRatings, allRatings}: ItemProps) {
    const [open, setOpen] = useState<boolean>(false);
    const [rating, setRating] = useState<number>(0)
    const [isFlipped, setIsFlipped] = useState<boolean>(true)
    const [token, setToken] = useState<string>(getToken())
    const [user, setUser] = useState<number>(getUser())
    const [favorites, setFavorites] = useState(getFavorites())

    function getToken(){
      const token = sessionStorage.getItem('token') || '';
      const initialValue = token ? JSON.parse(token) : null;
      return initialValue || "";
    }
    console.log(token)
    console.log(user)

    function handleOpen() {
      setOpen(true)
    }

    function handleClose() {
      setOpen(false)
    }
    
    function handleClick(){
      setIsFlipped(!isFlipped)
    }

    function handleRating(newRating: number){
      setRating(newRating)
      getRatings(id, newRating)
    }

    function getFavorites(){
      const favorites = localStorage.getItem('favorites') || '[]';
      const initialValue = JSON.parse(favorites);
      return initialValue || "";
    }
  

    function getUser(){
      const user = sessionStorage.getItem('user') || '';
      const initialValue = user ? JSON.parse(user) : null;
      return initialValue || "";
    }

    function deleteRecipe(event: KeyboardEvent<HTMLImageElement>, id) {
      event.preventDefault()
          
      fetch(`https://brain-food-501b641e50fb.herokuapp.com/api/v1/recipes/favorites`, {
        method: 'DELETE',
        body: JSON.stringify({
          recipe_id: id,
          user_id: user
        }),
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": 'application/json'
        }
      })
      handleClose()
      let newFavorites = favorites.filter((fav: string) => fav !== id)
      setFavorites(newFavorites)
  
    
     }
     useEffect(() => {
      localStorage.setItem('favorites', JSON.stringify(favorites))
        fetch(`https://brain-food-501b641e50fb.herokuapp.com/api/v1/recipes/favorites?user_id=${user}`, {
        method: 'GET', 
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }) 
        .then(res => res.json())
        .then(data => {
          console.log('ALL TIME FAVS:', data.data.recipes)
        })
    }, [favorites])

console.log('FAVS:', favorites)
    return (
      <ReactCardFlip isFlipped={!isFlipped} flipDirection="horizontal">
        <div className='favorite-recipe'>
          <div className='star-rating-container'>
               <p className='rating'>My Rating:</p>
               <Rating value={allRatings[id]} onChange={(event) => handleRating(Number(event.target.value))} cancel={false} /> 
          </div>
          
            <div className='favorite-name-container'><h4 className='grid-recipe-name'>{name}</h4></div>
            {image ? <div className='image' style={{ 'backgroundImage': `url(${image})`, 'backgroundSize': 'cover',
    'backgroundPosition': 'center'}}></div> : <div className='image' style={{ 'backgroundImage': `url(${Filler})`, 'backgroundSize': 'cover',
    'backgroundPosition': 'center'}}></div> }
    <button className='recipe-btn' onClick={handleClick}>Details</button>
            <img className='delete' onClick={handleOpen} src={Delete} tabIndex={0} onKeyDown={(event) => deleteRecipe(event)} alt='Icon of a trash bin'/>
        <Modal
        open={open}
        onClose={handleClose}
        // aria-labelledby="modal-modal-title"
        // aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2, 'textAlign': 'center'}}>
    Are you sure you want to delete this recipe from your favorites? 
          </Typography>
          <button className='delete-button' onClick={(event) => deleteRecipe(event, id)}>Yes, please!</button>
        </Box>
      </Modal>
        </div>       
        <div className='recipe-details'>
        <div>
                <h2 className='modal-text'>Ingredients</h2>
                {ingredients.map(ingredient => {
                  return (
                    <li>{ingredient}</li>
                  )
                })}
            </div>
            <div>
                <h2 className='modal-text' id='instructions'>Instructions</h2>
                {(instructions.length === 1) ? <a className='link-instructions' href={instructions}>Click here for instructions.</a> : instructions.map((instruction, index) => <p className='modal-text'>{(index + 1)}: {instruction}</p>)}
                
            </div>
          <button className='recipe-btn' onClick={handleClick}>Go Back</button>
        </div>
        </ReactCardFlip>
    )
}