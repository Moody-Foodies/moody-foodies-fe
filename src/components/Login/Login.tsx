import './Login.css';
import { motion } from 'framer-motion';
import { useState, KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Hide from '../../assets/hide.png';
import Show from '../../assets/show.png';
import Exit from '../../assets/exit.png';
import Error from '../Error/Error';
import Loading from '../../assets/loading.gif';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    height: 600,
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
    const [confirmShow, setConfirmShow] = useState<boolean>(false)
    const [signUpEmail, setSignUpEmail] = useState<string>('')
    const [signUpPassword, setSignUpPassword] = useState<string>('')
    const [signUpConfirm, setSignUpConfirm] = useState('')
    const [emailError, setEmailError] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [invalidError, setInvalidError] = useState<string>('')
    const [confirmation, setConfirmation] = useState<boolean>(true)
    const [showLogin, setShowLogin] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [signUpLoading, setSignUpLoading] = useState<boolean>(false)

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
      setSignUpConfirm('')
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
            setLoading(true)
            localStorage.setItem('user', JSON.stringify(data.data.id))
            localStorage.setItem('token', JSON.stringify(data.data.attributes.token))
            navigate('/home')
          }
        })
        .catch(error => {
          setError(error.message)
        })
    }
console.log('LOADING:', loading)
    if(error) {
      return (
        <Error />
      )
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
      setConfirmation(true)
      if(signUpPassword === signUpConfirm) {
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
            setSignUpLoading(true)
            localStorage.setItem('user', JSON.stringify(data.data.id))
            localStorage.setItem('token', JSON.stringify(data.data.attributes.token))
            navigate('/home')
          }
        })
        
        .catch(error => console.log(error))
      } else {
        setConfirmation(false)
            setEmailError('')
      }
        }

    function togglePasswordVisibility(event: KeyboardEvent) {
      if(event.key === 'Enter' || event.key === ' ') {
        setShow(!show)
      }
    }

    function toggleVisibility(event: KeyboardEvent) {
      if(event.key === 'Enter' || event.key === ' ') {
        setShowLogin(!showLogin)
      }
    }

    function togglePasswordConfirmationVisibility(event: KeyboardEvent) {
      if(event.key === 'Enter' || event.key === ' ') {
        setConfirmShow(!confirmShow)
      }
    }

    return (
        <main className='form-container'>
            <motion.section initial={{ y: 50 }} animate={{ y: 0 }} transition={{ duration: 1 }} className='login-container'>
            <div className='logo-header'>
              <h1 className='name'>Brain Food</h1>  
            </div>
            <form>
                <label htmlFor='email'>Email:</label>
                <input id='email' className='login' value={email} type='text' placeholder='Enter your email address here' onChange={(event) => setEmail(event.target.value)}></input>
                <label htmlFor='password'>Password:</label>
                <div className='password-icon'>
                  <input placeholder='Enter your password here'  id='password' value={password} onChange={(event) => setPassword(event.target.value)} className='login' type={(showLogin) ? 'text' : 'password'}></input> 
                {(showLogin) ? <img tabIndex={0} className='hide' aria-label='Hide password' alt='Icon of an eye with a slash through it' src={Hide} onClick={() => setShowLogin(!showLogin)} onKeyDown={(event) => toggleVisibility(event)} /> : <img tabIndex={0} className='show' alt='Icon of an eye' aria-label='Show password' src={Show} onKeyDown={(event) => toggleVisibility(event)} onClick={() => setShowLogin(!showLogin)}/>}  
                </div>
            </form>
            {invalidError && <p className='invalid-error'>{invalidError}</p>}
            {(loading) && <img className='loading' src={Loading} />}
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
                <label htmlFor='name'>First Name:</label>
                <input placeholder='Enter your first name here' type='text' id='name' value={name} className='login' onChange={(event) => setName(event.target.value)}/>
                <label htmlFor='email-signup'>Email:</label>
                <input placeholder='Enter your email address here' id='email-signup' value={signUpEmail} className='login' type='text' onChange={(event) => setSignUpEmail(event.target.value)}></input>
                <label htmlFor='password-signup'>Password:</label>
                <div className='password-icon'>
                  <input placeholder='Enter your password here'  id='password-signup' value={signUpPassword} onChange={(event) => setSignUpPassword(event.target.value)} className='login' type={(show) ? 'text' : 'password'}></input> 
                {(show) ? <img className='hide' aria-label='Hide password' tabIndex={0} alt='Icon of an eye with a slash through it' src={Hide} onClick={() => setShow(!show)} onKeyDown={(event) => togglePasswordVisibility(event)} /> : <img tabIndex={0} className='show' alt='Icon of an eye' aria-label='Show password' src={Show} onClick={() => setShow(!show)} onKeyDown={(event) => togglePasswordVisibility(event)} />}  
                </div> 
                <label htmlFor='password-signup'>Confirm Password:</label>
                <div className='password-icon'>
                  <input placeholder='Enter your password again here'  id='password-signup' value={signUpConfirm} onChange={(event) => setSignUpConfirm(event.target.value)} className='login' type={(confirmShow) ? 'text' : 'password'}></input> 
                {(confirmShow) ? <img className='hide' aria-label='Hide password' tabIndex={0} alt='Icon of an eye with a slash through it' src={Hide} onClick={() => setConfirmShow(!confirmShow)} onKeyDown={(event) => togglePasswordConfirmationVisibility(event)} /> : <img tabIndex={0} className='show' alt='Icon of an eye' aria-label='Show password' src={Show} onClick={() => setConfirmShow(!confirmShow)} onKeyDown={(event) => togglePasswordConfirmationVisibility(event)} />}  
                </div>     
            </form>
            {emailError && <p className='email-error'>{emailError}</p>}
            {!confirmation && <p className='email-error'>Passwords do not match</p>}
            {(signUpLoading) && <img className='loading-sign-up' src={Loading} />}
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