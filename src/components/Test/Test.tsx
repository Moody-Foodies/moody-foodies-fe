
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Test.css';
import { useState, useEffect } from 'react';
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

// let test = [
//     {
//       id: '1',
//       name: 'Item 1',
//       image: 'https://www.howsweeteats.com/wp-content/uploads/2023/09/chickpea-salad-bowl-6.jpg',
//       details: 'Detail 1',
//       favoriteIcon: 'https://example.com/icon1.png',
//       frontButtonText: 'Recipe Details',
//       backButtonText: 'More Info',
//       description: 'Description 1',
//       cookTime: '30',
//       nutrient: 'Nutrient 1',
//       ingredients: ['Ingredient 1', 'Ingredient 2'],
//       instructions: ['Step 1', 'Step 2']
//     },
//     {
//       id: '2',
//       name: 'Item 2',
//       image: 'https://www.inspiredtaste.net/wp-content/uploads/2021/03/Vegetable-Quesadilla-Recipe-1-1200-1200x800.jpg',
//       details: 'Detail 2',
//       favoriteIcon: 'https://example.com/icon2.png',
//       frontButtonText: 'Recipe Details',
//       backButtonText: 'More Info',
//       description: 'Description 2',
//       cookTime: '45',
//       nutrient: 'Nutrient 2',
//       ingredients: ['Ingredient 1', 'Ingredient 2'],
//       instructions: ['Step 1', 'Step 2']
//     },
//     {
//       id: '3',
//       name: 'Item 3',
//       image: 'https://fraicheliving.com/wp-content/uploads/2021/01/fraiche-living-tropical-green-smoothie.jpg',
//       details: 'Detail 3',
//       favoriteIcon: 'https://example.com/icon3.png',
//       frontButtonText: 'Recipe Details',
//       backButtonText: 'More Info',
//       description: 'Description 3',
//       cookTime: '60',
//       nutrient: 'Nutrient 3',
//       ingredients: ['Ingredient 1', 'Ingredient 2'],
//       instructions: ['Step 1', 'Step 2'],
//     }
    
//     ]
export default function Test({name, image, id,  ingredients, instructions, cookTime, description, toggleFavorite, isFavorite}){
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

      return (
      <div className='recipe-carousel'>
        <h3>{name}</h3>
       <div className='image-container' style={{ 'backgroundImage': `url(${image})`, 'backgroundSize': 'cover',
    'backgroundPosition': 'center'}}></div> 
        <p>Cook time: {cookTime} minutes</p>
        <p>{description}</p>
       {/* {!isFavorite ?  <button onClick={() =>toggleFavorite()}>NotFav</button> : <button onClick={() =>toggleFavorite()}>Fav</button>} */}
        <Button sx={{'position': 'absolute', 'bottom': 0, 'left': 10, 'color': '#00563B' }}onClick={handleOpen}>Ingredients & Instructions</Button>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            Ingredients & Instructions
          </Typography> */}
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
        
        {(!isFavorite) ? <img className='heart' src={Unfavorite} onClick={() => toggleFavorite()} /> : <img className='heart' src={Favorite} onClick={() => toggleFavorite()} /> }
      </div>
       

        )

 
}