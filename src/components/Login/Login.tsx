import './Login.css';
import { motion } from 'framer-motion';

export default function Login(){
    return (
        <main className='form-container'>
            <motion.section initial={{ y: -1000 }} animate={{ y: 0 }} transition={{ duration: 2, type: "spring", stiffness: 100, damping: 12 }} className='login-container'>
            <div className='logo-header'>
              <p className='name'>Brain Food</p>  
            </div>
            
                <form>
                <label>Your email</label>
            <input className='login' type='text'></input>
            <label>Your password</label>
            <input className='login' type='text'></input> 
            </form>
            <button className='sign-in'>Sign in</button> 
            </motion.section>
           
        </main>
    )
}