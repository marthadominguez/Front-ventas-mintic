import React, { useEffect, useState } from 'react';
import Sidebar from 'components/Sidebar';
import { useAuth0 } from '@auth0/auth0-react';
import { obtenerDatosUsuario } from 'utils/api';
import { useUser } from 'context/userContext';
import Header from 'components/Header';
import Footer from 'components/Footer';

const PrivateLayout = ({ children }) => {
  const { isAuthenticated, isLoading, loginWithRedirect, getAccessTokenSilently, logout } = useAuth0();
//   const [loadingUserInformation, setLoadingUserInformation] = useState(false);
  const { setUserData } = useUser();

  useEffect(() => {
    const fetchAuth0Token = async () => {

      // 1. Primer paso es pedir token a auth0
      setLoadingUserInformation(true);
      const accessToken = await getAccessTokenSilently({
        audience: `api-sistema-ventas`,
      });

      // 2.Segundo paso recibimos el token de auth0
      localStorage.setItem('token', accessToken);

      // 3. Tercer paso es enviarle el token a el backend
      await obtenerDatosUsuario(
        (response) => {
          console.log('response con datos del usuario', response);
          setUserData(response.data);
        //   setLoadingUserInformation(false);
        },
        (err) => {
          console.log('err', err);
        //   setLoadingUserInformation(false);
          logout({ returnTo: '' });
        //   todo
        }
      );
    };

    if (isAuthenticated) {
      fetchAuth0Token();
    }
  }, [isAuthenticated, getAccessTokenSilently, logout, setUserData]);

//   if (isLoading || loadingUserInformation)
//     return <ReactLoading type='cylon' color='#abc123' height={667} width={375} />;

  if (!isAuthenticated) {
    return loginWithRedirect();
  }

  return (
    <>
    <div className="body_grid">
        <Header></Header>
        <Sidebar></Sidebar>
        <main>{children}</main>
        <Footer></Footer>      
    </div>
    <ToastContainer className="toast" position="top-center" autoClose={5000}></ToastContainer>
    </>
  );
};

export default PrivateLayout;