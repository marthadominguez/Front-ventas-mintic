import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header className="header">
            <span className="material-icons-round header_button menu">menu</span>
            <div className="header--right">
                <span>Usuario</span>
                <span className="material-icons-round header_icons">account_circle</span>
                <Link to='/'><span className="material-icons-round header_button">logout</span></Link> 
            </div>
        </header>
    )
}

export default Header