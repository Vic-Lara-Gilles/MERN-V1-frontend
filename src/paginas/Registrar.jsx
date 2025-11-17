import { useState } from 'react'
import { Link } from 'react-router-dom'
import clienteAxios from '../config/axios'
import Alerta  from '../components/Alerta'


const Resgistrar = () => {
    const [ nombre, setNombre ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ repetirPassword, setRepetirPassword ] = useState('')

    const [ alerta, setAlerta] = useState({})

    const handleSumit = async e => {
        e.preventDefault();

        if([nombre, email, password, repetirPassword].includes('')) {
            setAlerta({ msg: 'Hay campos vacios', error: true})
            return;
        }
        if(password !== repetirPassword) {
            setAlerta({ msg: 'Los passwords no son iguales', error: true})
            return;
        }
        if(password.length < 6) {
            setAlerta({ msg: 'El Password es muy corto, min 6', error: true})
            return;
        }
        setAlerta({})

        // Crear el usuario en la api
        try {
            await clienteAxios.post('/veterinarios', {nombre, email, password })
           
            setAlerta({
                msg: 'Creado Correctamente, revisa tu email',
                error: false
            })
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            });
        }
    }

    const { msg } = alerta

    return (
        <>
            <div>
                <h1  className="text-sky-800 font-black text-6xl">
                    Crea tu cuenta y Aministra {""}
                    <span className="text-black"> tus Pacientes</span>
                </h1>
            </div>

            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded bg-slate-500 opacity-[94%]">
                { msg && <Alerta
                    alerta={alerta}
                />}
                <form
                    onSubmit={handleSumit}
                >
                    <div className="my-5">
                        <label 
                            className="uppercase text-white text-xl font-bold"
                        >
                            Nombre
                        </label>
                        <input 
                            type="text"
                            placeholder="Tu Nombre"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded"
                            value={nombre}
                            onChange={ e => setNombre(e.target.value)}
                        />
                    </div>
                    <div className="my-5">
                        <label 
                            className="uppercase text-white text-xl font-bold"
                        >
                            Email
                        </label>
                        <input 
                            type="email"
                            placeholder="Email de Registro"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded"
                            value={email}
                            onChange={ e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="my-5">
                        <label 
                            className="uppercase text-white text-xl font-bold"
                        >
                            Password
                        </label>
                        <input 
                            type="password"
                            placeholder="Password"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded"
                            value={password}
                            onChange={ e => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="my-5">
                        <label 
                            className="uppercase text-white text-xl font-bold"
                        >
                            Repetir Password
                        </label>
                        <input 
                            type="password"
                            placeholder="Repetir password"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded"
                            value={repetirPassword}
                            onChange={ e => setRepetirPassword(e.target.value)}
                        />
                    </div>

                    <input 
                    type="submit"
                    value="Crear Cuenta"
                    className="bg-slate-800 w-full py-3 px-10 rounded text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-slate-600 md:w-auto"                
                    />
                </form>
                <nav className="mt-10 lg:flex lg:justify-between">
                    <Link
                        className="block text-center my-5 text-white"
                        to="/">¿Ya tienes una cuenta? Inicia Sección</Link>
                    <Link 
                        className="block text-center my-5 text-white"
                        to="/olvide-password">Olvide mi Password</Link>
                </nav>
            </div>
        </>
    );
};

export default Resgistrar;