const Login = () => {
    return (
        <>
            <main className="main_login">
                <form action="" className="login_container">
                    <div className="login_title"><p>¿Usuario nuevo?<br/><b>Regístrate</b></p></div>
                    <label htmlFor="name" className="visuallyhidden">Nombre</label>
                    <input className="login_input" type="text" placeholder="Nombre completo" name="name" id="name" required />  
                    <label htmlFor="email" className="visuallyhidden">Correo</label>
                    <input className="login_input" type="text" placeholder="Correo electrónico" name="email" id="email" required />    
                    <label htmlFor="psw" className="visuallyhidden">Contraseña</label>
                    <input className="login_input" type="password" placeholder="Contraseña" name="psw" required />     
                    <button className="button" type="submit">Ingresar</button>
                    <p className="login_title">¿Ya tienes una cuenta?</p>
                    <button type="submit" className="button gmail_btn">Iniciar sesión <span className="iconify" data-icon="flat-color-icons:google"></span></button>
                </form>
            </main>
        </>
    )
}

export default Login