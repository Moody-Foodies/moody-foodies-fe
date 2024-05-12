import { useState } from 'react';
import './Home.css'
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Sad from '../../assets/sad.png';
import Happy from '../../assets/happy.png';
import Logo from '../../assets/logo.png';

export default function Home() {
  const [moodValue, setMoodValue] = useState<number>(0)
  const [timeValue, setTimeValue] = useState<number>(0)
  const navigate = useNavigate()

  // when click let's cook buttton, will send a POST request with 
  // user id, moodValue, and timeValue. 
  // check if these values should be sent as a number or string
  // both are currently numbers 

  return (
    <main className='landing-page'>
      <header>
        <section className='logo-container'>
          <h1 className='brain'>Brain</h1>
          <img src={Logo} />
          <h1 className='food'>Food</h1>
        </section>
      </header>
    <h2>How are you feeling today?</h2>
    <section className='slider-container'>
      <div className='slider-container'>
        <img className='sad' src={Sad} />
        <Box sx={{ width: 500 }}> 
          <Slider step={1} marks min={0} max={5} valueLabelDisplay="auto" onChange={(event) => setMoodValue(event.target!.value)} />
        </Box>
        <img className='happy' src={Happy} />
      </div>
    </section>
      <h2 className='time'>I have {<input type='number' value={timeValue} onChange={(event) => setTimeValue(Number(event.target.value))}/>} minutes to cook.</h2>
      <button className='cook' onClick={() => navigate('/recipes')}>Let's cook!</button>
     </main> 
    )
}

