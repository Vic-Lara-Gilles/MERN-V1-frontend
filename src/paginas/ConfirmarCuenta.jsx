import { useEffect, useState } from 'react'
import { useParams, Link } from "react-router-dom"
import Alerta from '../components/Alerta'
import clienteAxios from '../config/axios'

const ConfirnarCuenta = () => {
    const [cuentaConfirmada, setCuentaConfirmada] = useState(false)
    const [cargando, setCargando] = useState(true)
    const [alerta, setAlerta] = useState({})
    
    const params = useParams()
    const { id } = params

    useEffect(() => {
        const ConfirmarCuenta = async () => {
            try {
                // Cambiar endpoint de veterinarios a usuarios
                const url = `/usuarios/confirmar/${id}`
                const { data } = await clienteAxios(url)
                setCuentaConfirmada(true)
                setAlerta({
                    msg: data.msg
                })
            }   catch (error) {
                setAlerta({
                    msg: error.response?.data?.msg || error.message,
                    error: true
                })
            }

            setCargando(false)
        }
        ConfirmarCuenta();
    },[])

    return (
        <>
            <div>
                <h1 className="text-indigo-600 from-black font-bold text-6xl">
                    Confirma tu Cuenta y Administra {""}
                    <span className="text-black">tus Pacientes</span>
                </h1>
            </div>

            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                {!cargando && 
                    <Alerta
                    alerta={alerta}
                />}
                {cuentaConfirmada && (
                    <Link
                    className='block text-center my-5 text-gray-500'
                    to="/"
                    > Iniciar Seción
                    </Link>
                )}
            </div>
        </>
    );
};

export default ConfirnarCuenta;