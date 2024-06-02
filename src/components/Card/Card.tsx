import './Card.css';
import { useState } from 'react';
import Delete from '../../assets/delete.png';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ReactCardFlip from 'react-card-flip';
import ReactStars from 'react-stars';

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

export default function Card({name, image, id, getRatings, allRatings}: ItemProps) {
    const [open, setOpen] = useState<boolean>(false);
    const [rating, setRating] = useState<number>(0)
    const [isFlipped, setIsFlipped] = useState<boolean>(true)

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

console.log(rating)
    return (
      <ReactCardFlip isFlipped={!isFlipped} flipDirection="horizontal">
        <div className='favorite-recipe'>
          <div className='star-rating-container'>
               <p className='rating'>My Rating:</p>
        <ReactStars 
                     className='star-rating'
                     count={4}
                     color1={'#36454F'}
                    color2={'#ece8d9'}
                    // value={rating}
                    value={allRatings[id]}
                     half={true}
                    edit={true} 
                    size={15}
                   onChange={handleRating}
                />
          </div>
       
            <h4 className='grid-recipe-name'>{name}</h4>
            <div className='image' style={{ 'backgroundImage': `url(${image})`, 'backgroundSize': 'cover',
    'backgroundPosition': 'center'}}></div> 
    <button className='recipe-btn' onClick={handleClick}>Details</button>
            <img className='delete' onClick={handleOpen} src={Delete} alt='Icon of a trash bin'/>
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
          <button className='delete-button' onClick={() => handleClose()}>Yes, please!</button>
        </Box>
      </Modal>
        </div>       
        <div className='recipe-details'>
          {/* <p>This will be the back</p> */}
          <button className='recipe-btn' onClick={handleClick}>Go Back</button>
        </div>
        </ReactCardFlip>
    )
}