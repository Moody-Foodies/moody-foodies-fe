
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './RecipeCard.css';
import { useState, KeyboardEvent, useEffect } from 'react';
import Favorite from '../../assets/favorite.png';
import Unfavorite from '../../assets/unfavorite.png';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Exit from '../../assets/exit.png';
import Filler from '../../assets/filler.jpg';
import Clock from '../../assets/clock.png';
import Loading from '../../assets/loading.gif';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 700,
  bgcolor: '#8F9779',
  overflowY: "auto",
  boxShadow: 24,
  p: 4,
};

interface RecipeProps {
  name: string, 
  image: string, 
  ingredients: string[],
  instructions: string[],
  cookTime: string, 
  description: string, 
  id: string,
  nutrient: string,
  error: string,
  favorites: string[],
  healthBenefits: string,
  allFavoriteRecipes: string[],
  toggleFavorite: (id: string) => void,
  removeFavorite: (id: string) => void
}

export default function RecipeCard({name, image, ingredients, id, allFavoriteRecipes, instructions, nutrient, cookTime, removeFavorite, toggleFavorite}: RecipeProps){
    const [open, setOpen] = useState<boolean>(false);
    const [favorite, setFavorite] = useState(false);
    const [imageType, setImageType] = useState(image)
    const [user, setUser] = useState(getUser())
    const [token, setToken] = useState(getToken())
    const [favorites, setFavorites] = useState(getFavorites())
    
useEffect(() => {
  setUser(user)
  setToken(token)
  setFavorites(favorites)
  if(favorites.includes(id)) {
    setFavorite(true) 
  } else {
    setFavorite(false)
  }
}, [])
console.log('ALLTHEFAVORITESPLEASE WORK:', allFavoriteRecipes)
    function handleOpen() {
      setOpen(true)
    }

    function handleClose() {
      setOpen(false)
    }

    function test(id: string){
      setFavorite(!favorite)
      toggleFavorite(id)
    }


    function anotherTest(id: string) {
      setFavorite(!favorite)
      removeFavorite(id)
      
    }
    function testAccessibility(id: string, event: KeyboardEvent){
      if(event.key === 'Enter' || event.key === ' ') {
        setFavorite(!favorite)
      toggleFavorite(id)
      } 
    }


    function anotherTestAccessibility(id: string, event: KeyboardEvent) {
      if(event.key === 'Enter' || event.key === ' ') {
        setFavorite(!favorite)
      removeFavorite(id)
      }           
    }

    function getToken(){
      const token = localStorage.getItem('token') || '';
      const initialValue = token ? JSON.parse(token) : null;
      return initialValue || "";
    }
    function getUser(){
      const user = localStorage.getItem('user') || '';
      const initialValue = user ? JSON.parse(user) : null;
      return initialValue || "";
    }

    function getFavorites(){
      const favorites = localStorage.getItem('favorites') || '';
      const initialValue = favorites ? JSON.parse(favorites) : null;
      return initialValue || "";
    }

    function accessibleExit(event: KeyboardEvent<HTMLImageElement>) {
      if(event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        handleClose()
      }    
    }

useEffect(() => {
  if(image === '') {
    setImageType('null')
  }
}, [])

      return (
      <div className='recipe-carousel'>
       {(imageType === 'null') ? <div className='image-container' style={{ 'backgroundImage': `url(${Filler})`, 'backgroundSize': 'cover',
    'backgroundPosition': 'center'}}></div> : <div className='image-container' style={{ 'backgroundImage': `url(${imageType})`, 'backgroundSize': 'cover',
    'backgroundPosition': 'center'}}></div>}
    {(imageType === '') && <img className='image-loader' src={Loading} />}
    
    <div className='nutrient'><h2 className='nutrient-header' >Rich in {nutrient}</h2></div>
    <div className='name-container'><h2 className='recipe-carousel-name'>{name}</h2></div>
        {(Number(cookTime) > 0) && <div className='clock-container'><img alt='A clock icon' className='clock' src={Clock} /><h3 className='cook-time-board'>{cookTime} minutes</h3></div>}
          <Button sx={{'position': 'absolute', 'bottom': 0, 'left': 10, 'color': '#390400' }} onClick={handleOpen}>Ingredients & Instructions</Button>
        <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>

          <Typography id="modal-modal-description-2" sx={{ mt: 2}}>
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
                <img onClick={handleClose} onKeyDown={(event) => accessibleExit(event)} tabIndex={0} aria-label='exit modal' src={Exit} alt='A black X icon' className='exit' />
            </div>
          </Typography>
        </Box>
      </Modal>
      
      {(!allFavoriteRecipes.includes(id)) ? <div className='heart-container'><img tabIndex={0} aria-label='unfavorite' className='heart' alt='White heart icon with a black outline' src={Unfavorite} onKeyDown={(event) => testAccessibility(id, event)} onClick={() => test(id)}/></div> : <div className='heart-container'><img className='heart' aria-label='favorite' tabIndex={0} alt='Red heart icon' src={Favorite} onKeyDown={(event) => anotherTestAccessibility(id, event)} onClick={() => anotherTest(id)} /></div> }
      
     </div> 

        )
}