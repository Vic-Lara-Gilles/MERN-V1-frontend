import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from '../components/Alerta';
import clienteAxios from "../config/axios";


const OlvidePassword = () => {
    const [email, setEmail] = useState('')
    const [alerta, setAlerta] = useState({})
    
    const handleSubmit = async e => {
        e.preventDefault()

        if(email === '' || email.length < 6) {
            setAlerta({msg: 'El Email es obligatorio', error: true})
            return
        }

        try {
            const { data } = await clienteAxios.post('/veterinarios/olvide-password', { email })
            setAlerta({msg: data.msg})
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }
    
    const { msg } = alerta

    return (
        <>
            <div>
                <h1 className="text-slate-600 font-black text-6xl">
                    Recupera tu acceso y no pierdas {""}
                    <span className="text-black"> tus Paciente</span>
                </h1>
            </div>
            
            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 my-20 rounded bg-slate-500 opacity-[94%]">
                { msg && <Alerta
                    alerta={alerta}
                />}
                <form
                    onSubmit={handleSubmit}
                >
                    <div className="my-5">
                        <label 
                            className="uppercase text-white text-xl font-bold"
                        >
                            Email
                        </label>
                        <input 
                            type="email"
                            placeholder="Email de Registro"
                            className="border w-full p-3 py-3 mt-3 bg-gray-50 rounded"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    <input 
                        type="submit"
                        value="Enviar Intrucciones"
                        className="bg-slate-800 w-full py-3  px-10 rounded text-white 
                        uppercase font-bold mt-5 hover:cursor-pointer 
                        hover:bg-indigo-800 md:w-auto"                
                    />
                </form>

                <nav className="mt-10 lg:flex lg:justify-between">
                    <Link
                        className="block text-center my-5 text-white"
                        to="/">¿Ya tienes una cuenta? Inicia Seción</Link>
                    <Link 
                        className="block text-center my-5 text-white"
                        to="/registrar">¿No tienes cuenta? Regístrate</Link>
                </nav>
            </div>
        </>
    );
};

export default OlvidePassword;