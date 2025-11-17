import { Outlet, Navigate } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import useAuth from "../hooks/useAuth"

const RutaProtegida = () => {
    const { auth, cargando } = useAuth()
    
    if(cargando) return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50">
            <div className="text-center">
                <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
                <p className="mt-4 text-muted-foreground">Cargando...</p>
            </div>
        </div>
    )

    
    return (
        <>      
            <Header />
                
                {auth?._id ? (   
                    <main className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50/30 to-indigo-50/30">
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