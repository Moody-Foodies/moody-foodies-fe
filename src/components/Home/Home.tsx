import { useState, useEffect } from 'react'
import './Home.css'
import { useNavigate, Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import Sad from '../../assets/sad.jpeg'
import HappyFace from '../../assets/happyface.jpeg'
import Relaxation from '../../assets/relaxation.jpeg';
import Calm from '../../assets/calm.jpeg';
import HappyTheme from '../../assets/happy.jpeg';
import Energy from '../../assets/energy.jpeg'
import Enthus from '../../assets/enthus.jpeg'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Error from '../Error/Error';

export default function Home() {
  const [moodValue, setMoodValue] = useState<number>(1)
  const [timeValue, setTimeValue] = useState<number>(15)
  const [timeOfDay, setTimeOfDay] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState<string>('calm')
  const [error, setError] = useState('')
  const [user, setUser] = useState(getUser())
  const [token, setToken] = useState(getToken())
  const navigate = useNavigate()
  const [loadingMessage, setLoadingMessage] = useState<string>('Loading Recipes ...')

const array = ['Loading Recipes...', 'We\'re cooking up something good...']
let index = 1

function displayMessages() {

    if(index === array.length){
      index = 0;
    }
  setLoadingMessage(array[index])
  index++
}

  useEffect(() => {
    sessionStorage.setItem('value', JSON.stringify(value))
  }, [value])
      
function getToken(){
    const token = localStorage.getItem('token') || '';
    const initialValue = token ? JSON.parse(token) : null;
    return initialValue || "";
    }

  function getUser(){
    const user = localStorage.getItem('user') || '';
    const initialValue = user ? JSON.parse(user) : null;
    return initialValue || "";
  }

  useEffect(() => {
    setToken(token)
    setUser(user)
  }, [])


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
    setLoading(true)
    setInterval(displayMessages, 1500)
    fetch('https://brain-food-501b641e50fb.herokuapp.com/api/v1/recipes',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          mood: moodValue,
          time_available: timeValue,
          user_id: Number(user)
        }),
      }
    )
      .then(res => {
        if(!res.ok){
          setError(`${res.status}: ${res.statusText}`)
          setLoading(false)
        } else {
          return res.json()
        }
      })
      .then((data) => {
      navigate('/recipes', {state: { data: data.data, token: token, value: value, mood: moodValue, time: timeValue}})
       if(!data) {
        console.log('error')
       }
        setLoading(false)
      })
      .catch(error => setError(error.message))
     if(error) {
      setLoading(false)
     }
      
  }



 useEffect(() => {
if(error) {
  setLoading(false)
}
 }, [])

  if(localStorage.length < 2) {
    return (
      <Error />
    )
  }

  return (
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
      minHeight: '130vh', 
      width: '100vw',
      backgroundAttachment: 'fixed', 
      overflow: 'auto'
     }} 
     className='landing-page'
      >
      <header>
      <h1 className='name'>Brain Food</h1>

          <FormControl>
          <p className='label'>I want to feel ...</p>
          <RadioGroup
          row
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
    <div className='link-cont'>

      <Link to='/' className='menu'>Logout</Link>
    </div>
        </header>
        <section id='main-section'
        className={value === 'enthus' ? 'enthus' : value === 'energetic' ? 'energetic' : 'main-page'}>
          {timeOfDay && <h2 className='time-of-day'>{timeOfDay}!</h2>}
      <h2 className='feeling'>How are you feeling today?</h2>
      <section className="slider-container" id='slider-color'>
        <img className="sad" src={Sad} alt='Icon of a blue frowning face with an orange background'/>
        <div className="slider-container">
          
          <Box sx={{width: 500}}>
            <Slider
             aria-label="Default"
              step={1}
              marks
              min={1}
              max={5}
              valueLabelDisplay="auto"
              onChange={(event: any) => setMoodValue(event.target.value)}
            />
          </Box>

        </div>
        
        <img className='happy' src={HappyFace} alt='Icon of a yellow smiling face with a pink background'/>
      </section>
      <h2 className="time">
        I have{''}
        {<><label className='time-label' htmlFor='time'>Time</label>
          <input
            id='time'
            type="number"
            step="5"
            min="15"
            value={timeValue}
            onChange={(event) => setTimeValue(Number(event.target.value))}
          />
          </>
        }{''}
        minutes to cook.
      </h2>

      <button className="cook" onClick={() => {postUserData()}}>
        Let's cook!
      </button>
      {loading && <p className='loading'>{loadingMessage}</p>} 
      {error && <p className='post-error'>Oh no! Looks like something went wrong. Please refresh the page or try again later.</p> }
        </section>

    </main>

  )
}