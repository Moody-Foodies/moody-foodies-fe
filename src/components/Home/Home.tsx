// import { useState } from 'react'
import './Home.css'
import { useNavigate } from 'react-router-dom'

function Home() {
const navigate = useNavigate()
  return (
    <>
      <p>Home Component</p>
      <button onClick={() => navigate('/recipes')}>Let's cook!</button>
    </>
  )
}

export default Home
