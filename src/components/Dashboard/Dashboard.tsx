import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import affirmations from '../../Quotes/quotes'
import RecipeGrid from '../RecipeGrid/RecipeGrid'
import './Dashboard.css'
import Relaxation from '../../assets/relaxation.jpeg';
import Calm from '../../assets/calm.jpeg';
import HappyTheme from '../../assets/happy.jpeg';
import Energy from '../../assets/energy.jpeg'
import Enthus from '../../assets/enthus.jpeg';
import Error from '../Error/Error';

interface Affirmation {
  quote: string
}

export default function Dashboard() {
  const [quote, setQuote] = useState<string>('')
  const navigate = useNavigate()
  const [value, setValue] = useState<string>(getValue())
  const [search, setSearch] = useState<string>('')
  const [allFavorites, setAllFavorites] = useState([])
  const [token, setToken] = useState<string>(getToken())
  const [user, setUser] = useState(getUser())
  const [userName, setUserName] = useState('')
  const [averageMood, setAverageMood] = useState<number>(0)
  const [filteredRecipes, setFilteredRecipes] = useState([])


  useEffect(() => {
    console.log(setValue)
    console.log(setToken)
    console.log(setUser)
  }, [])
  

function getUser(){
    const user = sessionStorage.getItem('user') || '';
    const initialValue = user ? JSON.parse(user) : null;
    return initialValue || "";
  }

  function getValue(){
    const value = sessionStorage.getItem('value') || '';
    const initialValue = value ? JSON.parse(value) : null;
    return initialValue || "";
  }

 function getToken(){
  const token = sessionStorage.getItem('token') || '';
  const initialValue = token ? JSON.parse(token) : null;
  return initialValue || "";
 }

  function getRandomAffirmation(affirmations: Affirmation[]) {
    let randomQuote =
      affirmations[Math.floor(Math.random() * affirmations.length)]
      setQuote(randomQuote.quote)
  }

  useEffect(() => {
    getRandomAffirmation(affirmations)
  }, [])

  useEffect(() => {
    
    fetch(`https://brain-food-501b641e50fb.herokuapp.com/api/v1/recipes/favorites?user_id=${user}`, {
      method: 'GET', 
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }) 
    .then(res => res.json())
    .then(data => setAllFavorites(data.data.recipes))

  }, [allFavorites])

  
  useEffect(() => {
    if(allFavorites){
      //@ts-ignore
      setFilteredRecipes(allFavorites.filter(favorite => favorite.attributes.name.toLowerCase().includes(search.toLowerCase())))
    }
  }, [allFavorites])
  

if(sessionStorage.length < 2){
  return (
    <Error />
  )
}

useEffect(() => {
  fetch('https://brain-food-501b641e50fb.herokuapp.com/api/v1/users', {
    method: 'GET', 
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  .then(res => res.json())
  .then(data => {
    setUserName(data.data.attributes.name)
    setAverageMood(data.data.attributes.moods.avg_mood.toFixed(1))
  })
}, [])

  return (
    <section className="container"
    style={{ 
      backgroundImage: 
      `url(${value === 'calm' ? Calm : 
      value === 'energetic' ? Energy :
      value === 'relaxed' ? Relaxation :
      value === 'happy' ? HappyTheme :
      value === 'enthus' ? Enthus  :
     Relaxation})` , 
      backgroundSize: 'cover', 
      backgroundRepeat: 'repeat',
      backgroundPosition: 'center', 
      height: '100vh', 
      width: '100vw',
      backgroundAttachment: 'fixed', 
      overflow: 'auto'
     }} >

<header className="dashboard-container">
        <h2 className='dashboard-greeting'>Hi there, {userName}!</h2>
        <h1 className="dashboard">Mood Board</h1>
        <div className='link-container'>
           <Link to='/' className='menu' onClick={() => navigate('/recipes')}>Logout</Link>
          <Link to='/home' className='menu' onClick={() => navigate('/')}>Home</Link>
        </div>
      </header>
    <div className='quote-container'>
     <div className='search-container'>
        <label className='time-label' htmlFor='search'>Search recipe by name</label>
        <input id='search' className='search' type='text' placeholder='Search recipe by name' onChange={(event) => setSearch(event.target.value)} />
      </div>
      <h2 className="average-mood-score">Average mood score: {averageMood}</h2>
      <h3 className="affirmation">{quote}</h3>
      </div>
 {(!allFavorites || !allFavorites.length) ? <h3 className='no-favorites'>You currently do not have any favorites recipes stored.</h3> : <RecipeGrid items={filteredRecipes} /> }
    </section>
  )
}
