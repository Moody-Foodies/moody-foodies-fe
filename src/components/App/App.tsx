import './App.css'
import Home from '../Home/Home'
import Dashboard from '../Dashboard/Dashboard'
import Recipes from '../Recipes/Recipes'
import { useLocation, Routes, Route } from 'react-router-dom'
import NotFound from '../NotFound/NotFound';
import Login from '../Login/Login';
import { AnimatePresence } from "framer-motion";
import { PrimeReactProvider } from 'primereact/api';

export default function App() {
  const location = useLocation();

  return (
    <PrimeReactProvider>
       <div className="App">
      <AnimatePresence>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
      </AnimatePresence>
    </div>
    </PrimeReactProvider>
   
  )
}
