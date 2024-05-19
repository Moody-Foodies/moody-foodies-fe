import './Error.css';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'

export default function Error() {
    const navigate = useNavigate()
    return (
        <motion.div initial={{scaleX:0}} animate={{scaleX:1}} exit={{scaleX:0}} transition={{duration: 0.5}}>
            <main className='error'>
            <h1 className='message'>Oh no! Looks like something went wrong.</h1>
            <button className='back-home' onClick={() => navigate('/')}>Return Home</button>
            </main>
        </motion.div>    
    )
}