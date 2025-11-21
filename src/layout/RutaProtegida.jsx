import { Outlet, Navigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import useAuth from "../hooks/useAuth"

const RutaProtegida = () => {
    const { auth, cargando } = useAuth()
    
    if(cargando) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent dark:border-lime-500 dark:border-r-transparent"></div>
                <p className="mt-4 text-slate-600 dark:text-slate-300">Cargando...</p>
            </div>
        </div>
    )

    
    return (
        <>      
            <Navbar />
                {auth?._id ? (   
                    <main className="min-h-screen">
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