import { useState, useEffect } from 'react'
import './Home.css'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import Sad from '../../assets/sad.jpeg'
import HappyFace from '../../assets/happyface.jpeg'
import { motion } from 'framer-motion';
import Relaxation from '../../assets/relaxation.jpeg';
import Calm from '../../assets/calm.jpeg';
import HappyTheme from '../../assets/happy.jpeg';
import Energy from '../../assets/energy.jpeg'
import Enthus from '../../assets/enthus.jpeg'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


export default function Home() {
  const [moodValue, setMoodValue] = useState<number>(1)
  const [timeValue, setTimeValue] = useState<number>(15)
  const [timeOfDay, setTimeOfDay] = useState<string>('')
  const [value, setValue] = useState(getValue())
  const navigate = useNavigate()
  useEffect(() => {
    localStorage.setItem('value', JSON.stringify(value))
  }, [value])
  
  function getValue(){
    const value = localStorage.getItem('value') || '';
    const initialValue = JSON.parse(value);
    return initialValue || "";
  }

const time = new Date().getHours()
useEffect(() => {
  if (time < 12) {
  setTimeOfDay('Good morning')
} else if (time < 18) {
  setTimeOfDay('Good afternoon')
} else {
  setTimeOfDay('Good evening')
}

}, [])

  function postUserData() {
    fetch(
      'https://brain-food-501b641e50fb.herokuapp.com/api/v1/recipes',
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          mood: moodValue,
          time_available: timeValue,
          user_id: 1
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        navigate('/recipes', {
          state: { data: data.data, mood: moodValue, time: timeValue, value: value },
        })
      })
  }

  function getFavoriteRecipes() {
    fetch('https://brain-food-501b641e50fb.herokuapp.com/api/v1/recipes/favorites?user_id=1') 
      .then(res => res.json())
      .then(data => console.log('ALLFAVS:', data))
      navigate('/dashboard', {state: { value: value} })
  }


  return (
    <motion.div initial={{scaleX:0}} animate={{scaleX:1}} exit={{scaleX:0}} transition={{duration: 0.5}}>
    <main 
    style=
    {{ 
      backgroundImage: 
      `url(${value === 'calm' ? Calm : 
      value === 'energetic' ? Energy :
      value === 'relaxed' ? Relaxation :
      value === 'happy' ? HappyTheme :
      value === 'enthus' ? Enthus  :
     Relaxation})` , 
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      minHeight: '100vh', 
      width: '100vw',
      backgroundAttachment: 'fixed', 
      overflow: 'auto'
     }} 
     className='landing-page'
      >
      <header>
      <p className='name'>Brain Food</p>

          <FormControl>
          <FormLabel className='label' component="legend">I want to feel ...</FormLabel>
          <RadioGroup
          row
        aria-labelledby="demo-radio-buttons-group-label"
        value={value}
        name="radio-buttons-group"
        onChange={(event) => setValue(event.target.value)}
      >
      
        <FormControlLabel value="calm" control={<Radio />} label="Calm" />
        <FormControlLabel value="energetic" control={<Radio />} label="Energetic" />
        <FormControlLabel value="relaxed" control={<Radio />} label="Relaxed" />
        <FormControlLabel value="happy" control={<Radio />} label="Happy" />
        <FormControlLabel value="enthus" control={<Radio />} label="Enthusiastic" />
      </RadioGroup>
    </FormControl>
      <p className='menu' onClick={()=> getFavoriteRecipes()}>Mood Board</p>
        </header>
        <section 
        className={value === 'enthus' ? 'enthus' : value === 'energetic' ? 'energetic' : 'main-page'}>
          {timeOfDay && <h1>{timeOfDay}!</h1>}
      <h2>How are you feeling today?</h2>
      <section className="slider-container">
        <img className="sad" src={Sad} />
        <div className="slider-container">
          <Box sx={{ width: 500 }}>
            <Slider
              step={1}
              marks
              min={1}
              max={5}
              valueLabelDisplay="auto"
              onChange={(event: any) => setMoodValue(event.target.value)}
            />
          </Box>

        </div>
        
        <img className='happy' src={HappyFace} />
      </section>
      <h2 className="time">
        I have{' '}
        {
          <input
            type="number"
            step="5"
            min="15"
            value={timeValue}
            onChange={(event) => setTimeValue(Number(event.target.value))}
          />
        }{' '}
        minutes to cook.
      </h2>

      <button className="cook" onClick={() => postUserData()}>
        Let's cook!
      </button>
      
        </section>

    </main>
    </motion.div>
  )
}