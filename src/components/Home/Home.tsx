import { useState } from 'react';
import './Home.css'
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function Home() {
  const [value, setValue] = useState(0)
const navigate = useNavigate()
console.log(value)
  return (
    <main>
    <h1>Brain Food</h1>
    <h2>How are you feeling today?</h2>
      <section className='slider-container'>
      <Box sx={{ width: 500 }}>
        <Slider defaultValue={2} step={1} marks min={0} max={5} aria-label="Default" valueLabelDisplay="auto" onChange={(event) => setValue(event.target.value)}/>
      </Box>
      </section>
      <h2>I have {<input type='number' />} minutes to cook.</h2>
      <button onClick={() => navigate('/recipes')}>Let's cook!</button>
     </main> 
    )
    // <>
    //   <p>Home Component</p>
      
      
    // </>

}

export default Home
