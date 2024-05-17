import './App.css'
import Home from '../Home/Home'
import Dashboard from '../Dashboard/Dashboard'
import { Container } from '@mui/material'
import Recipes from '../Recipes/Recipes'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NotFound from '../NotFound/NotFound'

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </div>
  )
}
