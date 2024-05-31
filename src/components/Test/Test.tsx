
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Test.css';
import { useState } from 'react';
import Favorite from '../../assets/favorite.png';
import Unfavorite from '../../assets/unfavorite.png';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Exit from '../../assets/exit.png'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 500,
  bgcolor: '#8F9779',
  overflowY: "auto",
  boxShadow: 24,
  borderRadius: 10,
  p: 4,
};

interface RecipeProps {
  name: string, 
  image: string, 
  ingredients: string[],
  instructions: string[],
  cookTime: string, 
  description: string, 
}

export default function Test({name, image, ingredients, id, instructions, cookTime, description, favorites, removeFavorite, toggleFavorite}: RecipeProps){
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [favorite, setFavorite] = useState(false)
console.log('ALL THE FAVS< PLEASE WORK:', favorites)
    function test(id){
      setFavorite(!favorite)
      if(!favorite){
        toggleFavorite(id)
      } else {
        removeFavorite(id)
        console.log('this will be removed.')
      }
      
    }

      return (
      <div className='recipe-carousel'>
        <h3>{name}</h3>
       <div className='image-container' style={{ 'backgroundImage': `url(${image})`, 'backgroundSize': 'cover',
    'backgroundPosition': 'center'}}></div> 
        <p>Cook time: {cookTime} minutes</p>
        <p>{description}</p>
        <Button sx={{'position': 'absolute', 'bottom': 0, 'left': 10, 'color': '#00563B' }}onClick={handleOpen}>Ingredients & Instructions</Button>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

          <Typography id="modal-modal-description" sx={{ mt: 2}}>
            <div>
                <h2>Ingredients</h2>
                <p>{ingredients}</p>
            </div>
            <div>
                <h2>Instructions</h2>
                <p>{instructions}</p>
                <img onClick={handleClose} src={Exit} className='exit' />
            </div>
         
         
          </Typography>
        </Box>
      </Modal>
        
        {(!favorites.includes(id)) ? <img className='heart' src={Unfavorite} onClick={() => test(id)} /> : <img className='heart' src={Favorite} onClick={() => test(id)} /> }
      </div>
       

        )

 
}