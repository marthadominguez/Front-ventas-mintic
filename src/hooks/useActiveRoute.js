// Aquí van mis hooks personalizados
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react'

const useActiveRoute = (ruta) => {

    const location = useLocation()
    const [isActive, setIsActive] = useState(false)

    useEffect(() => {

        if (location.pathname.includes(ruta)) {
            setIsActive(true)
        } else {
            setIsActive(false)
        }
    }, [location, ruta])

    return isActive
}

export default useActiveRoute

// donde la vaya a usar solo debo definir la variable const isActive = useActiveRoute()