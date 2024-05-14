import { useEffect, useState } from 'react'
import './Dashboard.css'
import { useNavigate } from 'react-router-dom'
import affirmations from '../../Quotes/quotes'

export default function Dashboard() {
  const [quote, setQuote] = useState('')
  const navigate = useNavigate()
 


  function getRandomAffirmation(affirmations: object[]){
     let randomQuote = affirmations[Math.floor(Math.random() * affirmations.length)]
     setQuote(randomQuote.quote)
  }

  useEffect(() => {
    getRandomAffirmation(affirmations)
  }, [])

  return (
    <section className='container'>
    <header className='dashboard-container'>
      <h2 className='back-arrow' onClick={() => navigate('/recipes')}>⬅</h2>
      <h2 className='dashboard'>Mood Board</h2>
    </header>
    <h3 className='affirmation'>{quote}</h3>
    </section>
  )
}

