import { useEffect, useState } from "react"
import AdminNav from "../components/AdminNav"
import useAuth from '../hooks/useAuth'
import Alerta from "../components/Alerta"

const EditarPerfil = () => {

    const { auth, actualizarPerfil} = useAuth()
    const [perfil, setPerfil] = useState({})
    const [alerta, setAlerta] = useState({})

    useEffect(() => {
        setPerfil(auth)
    },[auth])
    
    const handleSumit = async e => {
        e.preventDefault()
        const {nombre, email} = perfil
        if([nombre, email].includes('')) {
            setAlerta({
                msg: 'Email y Nombre son obligatorios',
                error: true,
            })
            return
        }
        const resultado = await actualizarPerfil(perfil)
        setAlerta(resultado)

    }
    const { msg } = alerta

    return (
        <>
            <AdminNav />

            <div className="flex justify-center">
                <h2 className="text-center font-semibold text-2xl w-full md:w-1/2 text-yellow-400 flex-items-start py-4 px-6 mb-6 mx-10 rounded-md bg-black uppercase mt-10">Modifica tu Información aquí</h2>
            </div>
            
            <div className="flex justify-center">
                <div className="w-full md:w-1/2 bg-gray-300 bg-opacity-50 shadow rounded p-5">
                
                    <form 
                        onSubmit={handleSumit}
                    >
                        <div>
                            <label className="uppercase font-bold text-gray-600">Nombre</label>
                            <input 
                                type="text"
                                className="border bg-gray-50 w-full p-2 mt-2 mb-5 rounded"
                                name="nombre"
                                placeholder="Escribe tu nombre"
                                value={perfil.nombre || '' }
                                onChange={ e => setPerfil({
                                    ...perfil,
                                    [e.target.name] : e.target.value
                                })}
                             />

                            <label className="uppercase font-bold text-gray-600">Sitio Web</label>
                            <input 
                                type="text"
                                className="border bg-gray-50 w-full p-2 mt-2 mb-5 rounded"
                                name="web"
                                placeholder="Escribe tu Sitio Web"
                                value={perfil.web || ''}
                                onChange={ e => setPerfil({
                                    ...perfil,
                                    [e.target.name] : e.target.value
                                })}
                             />

                            <label className="uppercase font-bold text-gray-600">Telefono</label>
                            <input 
                                type="text"
                                className="border bg-gray-50 w-full p-2 mt-2 mb-5 rounded"
                                name="telefono"
                                placeholder="Escribe tu Telefono"
                                value={perfil.telefono || ''}
                                onChange={ e => setPerfil({
                                    ...perfil,
                                    [e.target.name] : e.target.value
                                })}
                             />

                            <label className="uppercase font-bold text-gray-600">Email</label>
                            <input 
                                type="text"
                                className="border bg-gray-50 w-full p-2 mt-2 mb-5 rounded"
                                name="email"
                                placeholder="Escribe tu Email"
                                value={perfil.email || ''}
                                onChange={ e => setPerfil({
                                    ...perfil,
                                    [e.target.name] : e.target.value
                                })}
                             />
                        </div>
                        
                        <div className="flex justify-center">
                            <input 
                                type="submit"
                                value="Guardar Cambios"
                                className="bg-black p-3 rounded text-lime-400 uppercase font-bold hover:bg-lime-300 hover:text-black cursor-pointer transition-colors duration-300"  
                            />
                        </div>
                    </form> 
                    {msg && <Alerta alerta={alerta} />}    
                </div>
            </div>
        </>
    )
}

export default EditarPerfil