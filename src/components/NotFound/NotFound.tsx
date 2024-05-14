import SadBrain from '../../assets/sadbrain.png';
import './NotFound.css'

export default function NotFound(){
    return (
        <section className='notfound-container'>
            <h1 className='error-message'>Oh no! Looks like something went wrong. Please try again later.</h1>
  
        <img className='sad-brain' src={SadBrain} /> 
        </section>
       
    )
}