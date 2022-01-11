import { useAuth0 } from '@auth0/auth0-react';

const Header = () => {
    const { user, loginWithRedirect, logout } = useAuth0();

    console.log('usuario es', user);

    const cerrarSesion = () => {
        // logout({ returnTo: 'https://sistema-ventas-mld.herokuapp.com/' });
        logout({ returnTo: 'http://localhost:3000/' });
        localStorage.setItem('token', null);
    };

    return (
        <header className="header">
            <span className="material-icons-round header_button menu">menu</span>
            <div className="header--right">
                {user ? (
                    <>
                        <span>{user.name}</span>
                        <img alt='Imagen de perfil' className='profile_picture' src={user.picture} />
                        <button title="Cerrar sesión" className='btn_bg' onClick={() => cerrarSesion()}>
                            <span className="material-icons-round header_button">logout</span>
                        </button>
                    </>) : (
                    <>
                        <span>Invitado(a)</span><span className="material-icons-round header_icons">account_circle</span>
                        <button title="Iniciar sesión" className='btn_bg' onClick={()=>{loginWithRedirect()}}>
                            <span className="material-icons-round header_button">login</span>
                        </button>
                    </>)}
                    

            </div>
        </header>
    )
}

export default Header