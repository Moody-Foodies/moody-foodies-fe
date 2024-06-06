
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './RecipeCard.css';
import { useState, KeyboardEvent } from 'react';
import Favorite from '../../assets/favorite.png';
import Unfavorite from '../../assets/unfavorite.png';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Exit from '../../assets/exit.png';
import Filler from '../../assets/filler.jpg';
import Clock from '../../assets/clock.png';

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
  id: number,
  error: string,
  favorites: number[],
  toggleFavorite: (id: number) => void,
  removeFavorite: (id: number) => void
}

export default function RecipeCard({name, image, ingredients, id, error, instructions, cookTime, healthBenefits, favorites, removeFavorite, toggleFavorite}: RecipeProps){
    const [open, setOpen] = useState<boolean>(false);
    const [favorite, setFavorite] = useState(false);

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
       {(image === '') ? <div className='image-container' style={{ 'backgroundImage': `url(${Filler})`, 'backgroundSize': 'cover',
    'backgroundPosition': 'center'}}></div> : <div className='image-container' style={{ 'backgroundImage': `url(${image})`, 'backgroundSize': 'cover',
    'backgroundPosition': 'center'}}></div>}
    <div className='name-container'><h2 className='recipe-carousel-name'>{name}</h2></div>
       {/* <div className='image-container' style={{ 'backgroundImage': `url(${image})`, 'backgroundSize': 'cover',
    'backgroundPosition': 'center'}}></div>  */}
        {(Number(cookTime) > 0) && <div className='clock-container'><img alt='A clock icon' className='clock' src={Clock} /><h3 className='cook-time-board'>{cookTime} minutes</h3></div>}
        <p className='recipe-page-descrip'>{healthBenefits}</p>
          <Button sx={{'position': 'absolute', 'bottom': 0, 'left': 10, 'color': '#390400' }}onClick={handleOpen}>Ingredients & Instructions</Button>
        <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>

          <Typography id="modal-modal-description" sx={{ mt: 2}}>
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
                <img onClick={handleClose} onKeyDown={(event) => accessibleExit(event)} tabIndex={0} src={Exit} alt='A black X icon' className='exit' />
            </div>
          </Typography>
        </Box>
      </Modal>
        {(!favorites.includes(id)) ? <div className='heart-container'><img tabIndex={0} className='heart' alt='White heart icon with a black outline' src={Unfavorite} onKeyDown={() => test(id)} onClick={() => test(id)} /></div> : <div className='heart-container'><img className='heart' tabIndex={0} alt='Red heart icon' src={Favorite} onKeyDown={() => test(id)} onClick={() => test(id)} /></div> }
     
     </div> 

        )
}