import './Error.css';
import { useNavigate } from 'react-router-dom';
import Sad from '../../assets/sad.jpeg';


export default function Error(){
    const navigate = useNavigate()

    return (
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
            <button className='back-home' onClick={() => navigate('/')}>Click here for the login page</button>
        </section>

    )
}