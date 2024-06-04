
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Test.css';
import { useState, KeyboardEvent } from 'react';
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
  id: number,
  favorites: number[],
  toggleFavorite: (id: number) => void,
  removeFavorite: (id: number) => void
}

export default function Test({name, image, ingredients, id, instructions, cookTime, description, favorites, removeFavorite, toggleFavorite}: RecipeProps){
    const [open, setOpen] = useState<boolean>(false);
    const [favorite, setFavorite] = useState(false)

    function handleOpen() {
      setOpen(true)
    }

    function handleClose() {
      setOpen(false)
    }

    function test(id: number){
      setFavorite(!favorite)
      if(!favorite){
        toggleFavorite(id)
      } else {
        removeFavorite(id)
        console.log('this will be removed.')
      }
    }

    function accessibleExit(event: KeyboardEvent<HTMLImageElement>) {
      event.preventDefault()
      handleClose()
    }

      return (
      <div className='recipe-carousel'>
        <h2>{name}</h2>
       <div className='image-container' style={{ 'backgroundImage': `url(${image})`, 'backgroundSize': 'cover',
    'backgroundPosition': 'center'}}></div> 
        <h3 className='cook-time-board'>Cook time: {cookTime} minutes</h3>
        <p className='recipe-page-descrip'>{description}</p>
          <Button sx={{'position': 'absolute', 'bottom': 0, 'left': 10, 'color': '#390400' }}onClick={handleOpen}>Ingredients & Instructions</Button>
        <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>

          <Typography id="modal-modal-description" sx={{ mt: 2}}>
            <div>
                <h2 className='modal-text'>Ingredients</h2>
                <p className='modal-text'>{ingredients}</p>
            </div>
            <div>
                <h2 className='modal-text'>Instructions</h2>
                <p className='modal-text'>{instructions}</p>
                <img onClick={handleClose} onKeyDown={(event) => accessibleExit(event)} tabIndex={0} src={Exit} alt='A black X icon' className='exit' />
            </div>
          </Typography>
        </Box>
      </Modal>
        {(!favorites.includes(id)) ? <div className='heart-container'><img tabIndex={0} className='heart' alt='White heart icon with a black outline' src={Unfavorite} onKeyDown={() => test(id)} onClick={() => test(id)} /></div> : <div className='heart-container'><img className='heart' tabIndex={0} alt='Red heart icon' src={Favorite} onKeyDown={() => test(id)} onClick={() => test(id)} /></div> }
     </div>
        )
}