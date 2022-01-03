import Header from "components/Header"
import Footer from "components/Footer"
import Sidebar from "components/Sidebar"
import { Outlet } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {
    return (
        <>
        <div className="body_grid">
            <Header></Header>
            <Sidebar></Sidebar>
            <main><Outlet/></main>
            <Footer></Footer>      
        </div>
        <ToastContainer className="toast" position="top-center" autoClose={5000}></ToastContainer>
        </>
    )
}

export default Layout
