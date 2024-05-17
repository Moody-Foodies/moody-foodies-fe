import './App.css'
import Home from '../Home/Home'
import Dashboard from '../Dashboard/Dashboard'
import Recipes from '../Recipes/Recipes'
import { useLocation, Routes, Route } from 'react-router-dom'
import NotFound from '../NotFound/NotFound'
import { AnimatePresence } from "framer-motion"
export default function App() {
  const location = useLocation();

  return (
    <div className="App">
      <AnimatePresence mode='wait' initial={false}>
          <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/recipes" element={<Recipes  />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </AnimatePresence>
    </div>
  )
}
