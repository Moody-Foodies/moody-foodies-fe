import './Error.css';
import { useNavigate } from 'react-router-dom';

export default function Error() {
    const navigate = useNavigate()
    return (
            <main className='error'>
            <h1 className='message'>Oh no! Looks like something went wrong.</h1>
            <button className='back-home' onClick={() => navigate('/')}>Return Home</button>
            </main>
    )
}