import './Card.css';
import { useState } from 'react';
import Delete from '../../assets/delete.png';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ReactCardFlip from 'react-card-flip';
import ReactStars from 'react-stars';
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 200,
    bgcolor: '#8F9779',
    overflowY: "auto",
    boxShadow: 24,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
    p: 4,
  };
export default function Card({name, id, image}) {
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [isFlipped, setIsFlipped] = useState(true)
    function handleClick(){
      setIsFlipped(!isFlipped)
  }

function handleRating(newRating){
  setRating(newRating)
}
    return (
      <ReactCardFlip isFlipped={!isFlipped} flipDirection="horizontal">
        <div className='favorite-recipe'>
        <ReactStars 
                     className='star-rating'
                     count={4}
                    color2={'#06C7EE'}
                    value={rating}
                     half={true}
                    edit={true} 
                    size={15}
                   onChange={handleRating}
                />
            <h2>{name}</h2>
            <div className='image' style={{ 'backgroundImage': `url(${image})`, 'backgroundSize': 'cover',
    'backgroundPosition': 'center'}}></div> 
    <button className='recipe-btn' onClick={handleClick}>Details</button>
            <img className='delete' onClick={handleOpen} src={Delete} />
         
            {/* <Button sx={{'position': 'absolute', 'bottom': 0, 'left': 10, 'marginBottom': 2, 'color': '#00563B' }}onClick={handleOpen}>Ingredients & Instructions</Button> */}
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
          <Typography id="modal-modal-description" sx={{ mt: 2, 'textAlign': 'center'}}>
    Are you sure you want to delete this recipe from your favorites? 
          </Typography>
          <button className='delete-button' onClick={() => handleClose()}>Yes, please!</button>
        </Box>
      </Modal>
 
             {/* <input type="checkbox" onClick={(event) => console.log(event?.target.checked)}/> */}
        </div>  
        
        <div className='recipe-details'>
          <p>This will be the back</p>
          <button className='recipe-btn' onClick={handleClick}>back to front</button>
        </div>
        </ReactCardFlip>
    )
}