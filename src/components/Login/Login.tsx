import './Login.css';
import { motion } from 'framer-motion';

export default function Login(){
    return (
        <main className='form-container'>
            <motion.section initial={{ y: -1000 }} animate={{ y: 0 }} transition={{ duration: 2, type: "spring", stiffness: 100, damping: 12 }} className='login-container'>
            <div className='logo-header'>
              <h1 className='name'>Brain Food</h1>  
            </div>
            <form>
                <label htmlFor='email'>Your email</label>
                <input id='email' className='login' type='text'></input>
                <label htmlFor='password'>Your password</label>
                <input id='password' className='login' type='text'></input> 
            </form>
            <button className='sign-in'>Sign in</button> 
            </motion.section>
        </main>
    )
}