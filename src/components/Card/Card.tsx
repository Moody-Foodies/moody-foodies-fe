import './Card.css';
import { useState, useEffect, KeyboardEvent, MouseEvent } from 'react';
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
import Loading from '../../assets/loading.gif';

interface ItemProps {
  name: string, 
  id: string, 
  image: string,
  getRatings: (id: string, newRating: number) => void,
  allRatings: any,
  ingredients: string[],
  instructions: string[],
  attributes: {},
  deleteRecipe: (event: MouseEvent | KeyboardEvent, id: string) => void
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 200,
    bgcolor: '#f5e1da',
    overflowY: "auto",
    boxShadow: 24,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
    p: 4,
  };

export default function Card({name, image, id, ingredients, instructions, getRatings, deleteRecipe, allRatings}: ItemProps) {
    const [open, setOpen] = useState<boolean>(false);
    const [rating, setRating] = useState<number>(0)
    const [isFlipped, setIsFlipped] = useState<boolean>(true)
    const [token, setToken] = useState<string>(getToken())
    const [user, setUser] = useState<number>(getUser())
    const [favorites, setFavorites] = useState(getFavorites())
    const [imageType, setImageType] = useState(image)


    useEffect(() => {
        setRating(rating)
        setToken(token)
        setUser(user)
        console.log(setFavorites)
    }, [])
 
    function getToken(){
      const token = localStorage.getItem('token') || '';
      const initialValue = token ? JSON.parse(token) : null;
      return initialValue || "";
    }

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
      const user = localStorage.getItem('user') || '';
      const initialValue = user ? JSON.parse(user) : null;
      return initialValue || "";
    }

    function test(event: MouseEvent, id:string) {
      deleteRecipe(event, id)
      handleClose()
    }

    function accessibilityDelete(event: KeyboardEvent, id: string) {
      if(event.key === 'Enter' || event.key === ' ') {
        deleteRecipe(event, id)
        handleClose()
      }
    }

    useEffect(() => {
      localStorage.setItem('favorites', JSON.stringify(favorites))
    }, [favorites])

    useEffect(() => {
      if(imageType === '') {
        setImageType('null')
      }
    }, [])


  return (
      <ReactCardFlip isFlipped={!isFlipped} flipDirection="horizontal">
        <div className='favorite-recipe'>
          <div className='star-rating-container'>
               <p className='rating'>My Rating:</p>
               <Rating value={allRatings[id]} onChange={(event) => handleRating(Number(event.target.value))} cancel={false} /> 
          </div>
          
            <div className='favorite-name-container'><h4 className='grid-recipe-name'>{name}</h4></div>
            {imageType === 'null' ? <div className='image' style={{ 'backgroundImage': `url(${Filler})`, 'backgroundSize': 'cover',
    'backgroundPosition': 'center'}}></div> : <div className='image' style={{ 'backgroundImage': `url(${imageType})`, 'backgroundSize': 'cover',
    'backgroundPosition': 'center'}}></div> }
     <div className='loading-image-container'>{(imageType === '') && <img className='image-loader' src={Loading} />}</div> 
    <button className='recipe-btn' onClick={handleClick}>Details</button>
            <img className='delete' onClick={handleOpen} src={Delete} aria-label='delete' tabIndex={0} alt='Icon of a trash bin'/>
        <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2, 'textAlign': 'center'}}>
    Are you sure you want to delete this recipe from your favorites? 
          </Typography>
          <button className='delete-button' onClick={(event) => test(event, id)} onKeyDown={(event) => accessibilityDelete(event, id)}>Yes, please!</button>
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
                {(instructions.length === 1) ? <a className='link-instructions' href={instructions[0]}>Click here for instructions.</a> : instructions.map((instruction, index) => <p className='modal-text'>{(index + 1)}: {instruction}</p>)}
                
            </div>
      
          <button className='recipe-btn' onClick={handleClick}>Go Back</button>
        </div>
        </ReactCardFlip>
    )

      

    
}