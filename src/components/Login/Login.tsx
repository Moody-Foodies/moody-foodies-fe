import './Login.css';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 500,
    bgcolor: '#8F9779',
    overflowY: "auto",
    boxShadow: 24,
    borderRadius: 10,
    p: 4,
  };

export default function Login(){
    const [open, setOpen] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    function handleOpen() {
      setOpen(true)
    }

    function handleClose() {
      setOpen(false)
    }

    function sendAccountData() {
        fetch('', {
            method: 'POST', 
            body: JSON.stringify({
                email: email,
                password: password
            }),
            headers: {
                'Content-type': 'application/json'
            }
        })
    }
console.log(email)
console.log(password)
    return (
        <main className='form-container'>
            <motion.section initial={{ y: -1000 }} animate={{ y: 0 }} transition={{ duration: 2, type: "spring", stiffness: 100, damping: 12 }} className='login-container'>
            <div className='logo-header'>
              <h1 className='name'>Brain Food</h1>  
            </div>
            <form>
                <label htmlFor='email'>Your email</label>
                <input id='email' className='login' type='text' placeholder='Enter your email address here'></input>
                <label htmlFor='password'>Your password</label>
                <input id='password' className='login' type='password' placeholder='Enter your password here'></input> 
            </form>
            <button className='sign-in'>Sign in</button> 
            <div className='account-styling'> 
            <p>Don't have an account?</p>
            <Button sx={{color: '#79c2d0'}}onClick={handleOpen}>Create one</Button>
        <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>

          <Typography id="modal-modal-description" sx={{ mt: 2}}>
          <form>
                <label htmlFor='email'>Your email</label>
                <input placeholder='Enter your email address here' id='email' value={email} className='login' type='text' onChange={(event) => setEmail(event.target.value)}></input>
                <label htmlFor='password'>Your password</label>
                <input placeholder='Enter your password here' id='password' value={password} onChange={(event) => setPassword(event.target.value)} className='login' type='password'></input> 
            </form>
            <button className='sign-in'>Sign up</button> 
          </Typography>
        </Box>
      </Modal>
      </div>
            </motion.section>
        </main>
    )
}