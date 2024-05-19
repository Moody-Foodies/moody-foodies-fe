import './NotFound.css';
import Sad from '../../assets/sad.jpeg';
import { motion } from 'framer-motion';

export default function NotFound(){
    return (
        <motion.div initial={{scaleX:0}} animate={{scaleX:1}} exit={{scaleX:0}} transition={{duration: 0.5}}>
        <section 
        style={{ 
            backgroundImage: 
            `url(${Sad})`,
            backgroundSize: 'cover', 
            backgroundPosition: 'center', 
            height: '100vh', 
            width: '100vw'
           }} 
        className='notfound-container'>
            <h1 className='error-message'>Oh no! Looks like something went wrong. Please try again later.</h1>
        </section>
        </motion.div>
    )
}