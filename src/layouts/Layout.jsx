import Header from "components/Header"
import Footer from "components/Footer"
import Sidebar from "components/Sidebar"
import { Outlet } from "react-router-dom"

const Layout = () => {
    return (
        <div className="body_grid">
            <Header></Header>
            <Sidebar></Sidebar>
            <main><Outlet/></main>
            <Footer></Footer>      
        </div>
    )
}

export default Layout
