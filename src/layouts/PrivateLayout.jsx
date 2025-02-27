import React, { useEffect } from "react";
import Sidebar from "components/Sidebar";
import { useAuth0 } from "@auth0/auth0-react";
import { obtenerDatosUsuario } from "utils/api";
import { useUser } from "context/userContext";
import Header from "components/Header";
import Footer from "components/Footer";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import ReactLoading from 'react-loading';

const PrivateLayout = () => {
  const { isAuthenticated, getAccessTokenSilently, logout } = useAuth0();
  // const [loadingUserInformation, setLoadingUserInformation] = useState(false);
  const { setUserData } = useUser();

  useEffect(() => {
    const fetchAuth0Token = async () => {
      // 1. Primer paso es pedir token a auth0
      // setLoadingUserInformation(true);
      const accessToken = await getAccessTokenSilently({
        audience: `api-sistema-ventas`,
      });

      // 2.Segundo paso recibimos el token de auth0
      localStorage.setItem("token", accessToken);

      // 3. Tercer paso es enviarle el token a el backend
      await obtenerDatosUsuario(
        (response) => {
          setUserData(response.data);
          // setLoadingUserInformation(false);
        },
        (err) => {
          console.log("err", err);
          //  setLoadingUserInformation(false);
          // logout({ returnTo: '' });
        }
      );
    };

    if (isAuthenticated) {
      fetchAuth0Token();
    }
  }, [isAuthenticated, getAccessTokenSilently, logout, setUserData]);

  // if (isLoading || loadingUserInformation) return <ReactLoading type='spin' color='#0091EB' height={100} width={100} className='loading'/>;

  // if (!isAuthenticated) {
  //   return loginWithRedirect();
  // }

  return (
    <>
      {isAuthenticated ? (
        <>
          <div className="body_grid">
            <Header></Header>
            <Sidebar></Sidebar>
            <main>
              <Outlet />
            </main>
            <Footer></Footer>
          </div>
          <ToastContainer
            className="toast"
            position="top-center"
            autoClose={5000}
          ></ToastContainer>
        </>
      ) : (
        <>
          <div className="body_grid">
            <Header></Header>
            <Sidebar></Sidebar>
            <main>
              <span className="permiso">
                No tienes permiso para navegar en la página. Inicia sesión.
              </span>
            </main>
            <Footer></Footer>
          </div>
        </>
      )}
    </>
  );
};

export default PrivateLayout;
