import { Outlet, Navigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import LoadingSpinner from "../components/LoadingSpinner"
import useAuth from "../hooks/useAuth"

const RutaProtegida = () => {
    const { auth, cargando } = useAuth()
    
    if(cargando) return <LoadingSpinner />

    
    return (
        <>      
            <Navbar />
                {auth?._id ? (   
                    <main className="min-h-screen bg-white dark:bg-gray-900">
                        <div className="container mx-auto py-8 px-4">
                            <Outlet /> 
                        </div>
                    </main>
                ):<Navigate to="/" />}
            <Footer />
        </>
    )
}

export default RutaProtegida