import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer>
            <p>By Martha L. Domínguez</p>
            <p>|</p>
            <Link className='link' to="https://www.linkedin.com/in/martha-liliana-dom%C3%ADnguez-09b722136"><i class="fab fa-linkedin"></i></Link>
            <Link className='link' to="https://github.com/marthadominguez"><i class="fab fa-github"></i></Link>   
        </footer>
    )
}

export default Footer