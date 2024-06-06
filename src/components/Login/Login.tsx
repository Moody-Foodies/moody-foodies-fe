import './Login.css';
import { motion } from 'framer-motion';
import { useState, KeyboardEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Hide from '../../assets/hide.png';
import Show from '../../assets/show.png';
import Exit from '../../assets/exit.png';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    height: 520,
    bgcolor: '#8F9779',
    overflowY: "auto",
    boxShadow: 24,
    borderRadius: 5,
    p: 4,
    display: 'flex',
    justifyContent: 'center'
  };

export default function Login(){
    const [open, setOpen] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [show, setShow] = useState<boolean>(false)
    const [signUpEmail, setSignUpEmail] = useState<string>('')
    const [signUpPassword, setSignUpPassword] = useState<string>('')
    const [user, setUser] = useState<string>('')
    const [emailError, setEmailError] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [invalidError, setInvalidError] = useState<string>('')
    const [token, setToken] = useState<string>('')

    useEffect(() => {
      sessionStorage.setItem('token', JSON.stringify(token))
    }, [token])

    useEffect(() => {
      sessionStorage.setItem('user', JSON.stringify(user))
    }, [user])
    
    const navigate = useNavigate()

    function handleOpen() {
      setOpen(true)
    }

    function handleClose() {
      setOpen(false)
      setSignUpEmail('')
      setName('')
      setSignUpPassword('')
      setEmailError('')
    }

    function postLogin() {
        fetch('https://brain-food-501b641e50fb.herokuapp.com/api/v1/login', {
            method: 'POST', 
            body: JSON.stringify({
                email: email,
                password: password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
              return res.json()
        })
        .then(data => {
          if(data.errors) {
            setInvalidError(data.errors[0].detail)
          } else {
            setUser(data.data.id)
            setToken(data.data.attributes.token)
            navigate('/home')
          }
        })
        .catch(error => setError(error.message))
    }

    function test(event: KeyboardEvent<HTMLImageElement>) {
        event.preventDefault()
       handleClose()
    }

    function clearForm() {
      setEmail('')
      setPassword('')
      setEmailError('')
      setInvalidError('')
    }

    function postSignUp() {
        fetch('https://brain-food-501b641e50fb.herokuapp.com/api/v1/users', {
            method: 'POST', 
            body: JSON.stringify({
                name: name,
                email: signUpEmail,
                password: signUpPassword
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
          return res.json()
        })
        .then(data => {
          if(data.errors) {
            setEmailError(data.errors[0].detail[0])
          } else {
            setUser(data.data.id)
            setToken(data.data.attributes.token)
            navigate('/home')
          }
        })
        .catch(error => console.log(error))
        }
console.log(token)
console.log(user)
    return (
        <main className='form-container'>
            <motion.section initial={{ y: -1000 }} animate={{ y: 0 }} transition={{ duration: 2, type: "spring", stiffness: 100, damping: 12 }} className='login-container'>
            <div className='logo-header'>
              <h1 className='name'>Brain Food</h1>  
            </div>
            <form>
                <label htmlFor='email'>Email:</label>
                <input id='email' className='login' value={email} type='text' placeholder='Enter your email address here' onChange={(event) => setEmail(event.target.value)}></input>
                <label htmlFor='password'>Password:</label>
                <div className='password-icon'>
                  <input placeholder='Enter your password here'  id='password' value={password} onChange={(event) => setPassword(event.target.value)} className='login' type={(show) ? 'text' : 'password'}></input> 
                {(show) ? <img tabIndex={0} className='hide' aria-label='Hide password' alt='Icon of an eye with a slash through it' src={Hide} onClick={() => setShow(!show)} onKeyDown={() => setShow(!show)} /> : <img tabIndex={0} className='show' alt='Icon of an eye' aria-label='Show password' src={Show} onKeyDown={() => setShow(!show)} onClick={() => setShow(!show)}/>}  
                </div>
            </form>
            {invalidError && <p className='invalid-error'>{invalidError}</p>}
            <button className='sign-in' onClick={() => postLogin()}>Sign in</button> 
            <button className='reset' onClick={() => clearForm()}>Reset form</button>
            <div className='account-styling'> 
            <h2 className='account-message'>Don't have an account?</h2>
            <Button sx={{color: '#79c2d0'}}onClick={handleOpen}>Create one</Button>
        <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>

          <Typography id="modal-modal-description" sx={{ mt: 2}}>
            <h2 className='create-account'>Create a Brain Food Account</h2>
            <h3 className='cook-header'>Let's get cookin'!</h3>
          <form>
                <label htmlFor='name'>Name:</label>
                <input placeholder='Enter your name here' type='text' id='name' value={name} className='login' onChange={(event) => setName(event.target.value)}/>
                <label htmlFor='email-signup'>Email:</label>
                <input placeholder='Enter your email address here' id='email-signup' value={signUpEmail} className='login' type='text' onChange={(event) => setSignUpEmail(event.target.value)}></input>
                <label htmlFor='password-signup'>Password:</label>
                <div className='password-icon'>
                  <input placeholder='Enter your password here'  id='password-signup' value={signUpPassword} onChange={(event) => setSignUpPassword(event.target.value)} className='login' type={(show) ? 'text' : 'password'}></input> 
                {(show) ? <img className='hide' aria-label='Hide password' tabIndex={0} alt='Icon of an eye with a slash through it' src={Hide} onClick={() => setShow(!show)} onKeyDown={() => setShow(!show)} /> : <img tabIndex={0} className='show' alt='Icon of an eye' aria-label='Show password' src={Show} onClick={() => setShow(!show)} onKeyDown={() => setShow(!show)} />}  
                </div>
                
            </form>
            {emailError && <p className='email-error'>{emailError}</p>}
            <button className='sign-in-button' onClick={() => postSignUp()}>Sign up</button> 
          </Typography>
          <img src={Exit} alt='A black X icon' onKeyDown={(event) => test(event)} onClick={handleClose} tabIndex={0} className='exit' />
        </Box>
      </Modal>
      </div>
            </motion.section>
        </main>
    )
}