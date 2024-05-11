import { useState } from 'react';
import './Home.css'
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Sad from '../../assets/sad.svg';
import Happy from '../../assets/happy.svg';
import Logo from '../../assets/logo.png';

function Home() {
  const [moodValue, setMoodValue] = useState(0)
  const [timeValue, setTimeValue] = useState(0)
const navigate = useNavigate()
console.log(moodValue)
console.log(timeValue)

  return (
    <main className='landing-page'>
      <header>
        <div className='logo-container'>
          <h1 className='brain'>Brain</h1>
         <img src={Logo} />
         <h1 className='food'>Food</h1>
        </div>
      
      </header>
    
    <h2>How are you feeling today?</h2>
      <section className='slider-container'>
      <Box sx={{ width: 500 }}>
        <Slider step={1} marks min={0} max={5} aria-label="Default" valueLabelDisplay="auto" onChange={(event) => setMoodValue(event.target.value)}/>
      </Box>
      </section>
      <h2>I have {<input type='number' value={timeValue} onChange={(event) => setTimeValue(event.target.value)}/>} minutes to cook.</h2>
      <button onClick={() => navigate('/recipes')}>Let's cook!</button>
     </main> 
    )
    // <>
    //   <p>Home Component</p>
      
      
    // </>

}

export default Home
