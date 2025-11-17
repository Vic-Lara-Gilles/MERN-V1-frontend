import { useState, useEffect } from "react"
import Alerta from "./Alerta"
import usePacientes from "../hooks/usePacientes"

const Formulario = () => {
    const [nombre, setNombre] = useState('')
    const [especie, setEspecie] = useState('')
    const [fechaNac, setFechaNac] = useState('')
    const [sexo, setSexo] = useState('')
    const [peso, setPeso] = useState('')
    const [raza, setRaza] = useState('')
    const [altura, setAltura] = useState('')
    /* Vacunas */

    const [fechaIngreso, setFechaIngreso] = useState('')
    const [fechaAlta, setFechaAlta] = useState('')
    const [sintomas, setSintomas] = useState('')

    /* Propietario */
    const [propietario, setPropietario] = useState('')
    const [run, setRun] = useState('')
    const [domicilio, setDomicilio] = useState('')
    const [telefono, setTelefono] = useState('')
    const [email, setEmail] = useState('')
    const [id, setId] = useState(null)
    
    const [alerta, setAlerta] = useState({})
    const { guardarPaciente, paciente } = usePacientes()

    useEffect(() =>{
        if(paciente?.nombre){
            setNombre(paciente.nombre)
            setSexo(paciente.sexo)
            setEspecie(paciente.especie)
            setPeso(paciente.peso)
            setRaza(paciente.raza)
            setAltura(paciente.altura)
            /* Vacunas */
            setFechaIngreso(paciente.fechaIngreso)
            setFechaAlta(paciente.fechaAlta)
            setFechaNac(paciente.fechaNac)
            setSintomas(paciente.sintomas)
            /* Propietario */
            setPropietario(paciente.propietario)
            setRun(paciente.run)
            setDomicilio(paciente.domicilio)
            setTelefono(paciente.telefono)
            setEmail(paciente.email)
            setId(paciente._id)
        }
    },[paciente])

    const handleSubmit = e => {
        e.preventDefault()

        // validar el formulario
        if([nombre, sexo, especie, peso, raza, altura, fechaIngreso, fechaAlta,fechaNac, sintomas, propietario, run, domicilio, telefono, email].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }

        guardarPaciente({nombre, sexo, especie, peso, raza, altura, fechaIngreso, fechaAlta, fechaNac, sintomas, propietario, run, domicilio, telefono, email, id})
        setAlerta({
            msg:'Guardado Correctamente'
        })
        setNombre('')
        setSexo('')
        setEspecie('')
        setPeso('')
        setRaza('')
        setAltura('')
        /* Vacunas */
        setFechaIngreso('')
        setFechaAlta('')
        setFechaNac('')
        setSintomas('')
        /* Propietario */
        setPropietario('')
        setRun('')
        setDomicilio('')
        setTelefono('')
        setEmail('')
        setId('')
    }
    const { msg } = alerta

    return (
        <>
            <form
                className="bg-gray-200 bg-opacity-50 py-7 px-6 mb-10 lg:mb-5 shadow-sm rounded-md"
                onSubmit={handleSubmit}
            >
                
                <h1 className="px-10 py-3 mb-6 text-gray-800 uppercase font-bold rounded text-center text-xl">Datos De Mascota</h1>
                
                <div className="flex flex-row -mx-3 mb-6">
                    <div className="w-full px-3 mb-6 md:mb-0">
                        <label
                            htmlFor="nombre"
                            className="text-gray-800 uppercase font-bold"
                        >Nombre</label>
                        <input 
                            id="nombre"
                            type="text"
                            placeholder="Nombre Mascota"
                            className="border-2 w-full p-2 mt-2 rounded"
                            value={nombre}
                            onChange={e => setNombre(e.target.value)}
                        />
                    </div>

                    <div className="w-full px-3 md:mb-0">
                        <label 
                            htmlFor="especie"
                            className="text-gray-800 uppercase font-bold"
                        >Especie
                        </label>
                        <div className="border-2 w-full p-2 mt-2 bg-white rounded">
                            <select
                                className="bg-white "
                                id="sexo"
                                value={especie}
                                onChange={e => setEspecie(e.target.value)}>
                                // Opciones de Animal
                                <option>-- Tipo Animal --</option>
                                <option>Felino</option>
                                <option>Canina</option>
                                <option>Ave</option>
                                <option>Reptil</option>
                                <option>Peces</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                <div className="flex flex-row -mx-3 mb-6">
                    <div className="w-full px-3 mb-6 md:mb-0">
                        <label
                            htmlFor="fechaNac"
                            className="text-gray-800 uppercase font-bold"
                        >Fecha Nacimiento</label>
                        <input 
                            id="fechaNac"
                            type="date"
                            placeholder="Nombre Mascota"
                            className="border-2 w-full p-2 mt-2 rounded"
                            value={fechaNac}
                            onChange={e => setFechaNac(e.target.value)}
                        />
                    </div>
                    <div className="w-full px-3 md:mb-0">
                        <label 
                            htmlFor="sexo"
                            className="text-gray-800 uppercase font-bold"
                        >Sexo y Condición
                        </label>
                        <div className="border-2 w-full p-2 mt-2 bg-white rounded">
                            <select
                                className="bg-white "
                                id="sexo"
                                value={sexo}
                                onChange={e => setSexo(e.target.value)}>
                                // Opciones de Sexo
                                <option>-- Seleccione Sexo --</option>
                                <option>Macho</option>
                                <option>Hembra</option>
                                <option>Macho Castrado</option>
                                <option>Hembra Esteril</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                <div className="flex flex-row -mx-3 mb-6">
                    <div className="w-full px-3 mb-6 md:mb-0">
                        <label
                            htmlFor="peso"
                            className="text-gray-800 uppercase font-bold"
                        >Peso
                        </label>
                        <input 
                            id="peso"
                            type="text"
                            placeholder="Pesaje en Kg"
                            className="border-2 w-full p-2 mt-2 rounded"
                            value={peso}
                            onChange={e => setPeso(e.target.value)}
                        />
                    </div>
                    <div className="w-full px-3 mb-6 md:mb-0">
                        <label
                            htmlFor="raza"
                            className="text-gray-800 uppercase font-bold"
                        >Raza
                        </label>
                        <input 
                            id="raza"
                            type="text"
                            placeholder="Ej: Mestizo u Otro"
                            className="border-2 w-full p-2 mt-2 rounded"
                            value={raza}
                            onChange={e => setRaza(e.target.value)}
                        />
                    </div>

                    <div className="w-full px-3 mb-6 md:mb-0">
                        <label
                            htmlFor="altura"
                            className="text-gray-800 px uppercase font-bold"
                        >Altura
                        </label>
                        <input 
                            id="altura"
                            type="text"
                            placeholder="Talla en Cm"
                            className="border-2 w-full p-2 mt-2 rounded"
                            value={altura}
                            onChange={e => setAltura(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex flex-row -mx-3 my-6">
                    <div className="w-full px-3 md:mb-0">
                        <label
                            htmlFor="fechaIngreso"
                            className="text-gray-800 uppercase font-bold"
                        >Fecha Ingreso</label>
                        <input 
                            id="fechaIngreso"
                            type="date"
                            className="border-2 w-full p-2 mt-2 rounded"
                            value={fechaIngreso}
                            onChange={e => setFechaIngreso(e.target.value)}
                        />
                    </div>

                    <div className="w-full px-3 mb-6 md:mb-0">
                        <label
                            htmlFor="fechaAlta"
                            className="text-gray-800 uppercase font-bold"
                        >Fecha Alta</label>
                        <input 
                            id="fechaAlta"
                            type="date"
                            className="border-2 w-full p-2 mt-2 rounded"
                            value={fechaAlta}
                            onChange={e => setFechaAlta(e.target.value)}
                        />
                    </div>
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="sintomas"
                        className="text-gray-800 uppercase font-bold"
                    >Sintomas</label>
                    <textarea
                        id="sintomas"
                        placeholder="Descrición de los Sintomas"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded"
                        value={sintomas}
                        onChange={e => setSintomas(e.target.value)}
                    />
                </div>

                <div className="flex flex-row justify-center mb-6 py-3 mx-3">
                    <h1 className="text-gray-800 font-bold text-xl uppercase">Datos Propietario</h1>
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="propietario"
                        className="text-gray-800 uppercase font-bold "
                    >Nombre Propietario</label>
                    <input 
                        id="propietario"
                        type="text"
                        placeholder="Nombre del Propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded"
                        value={propietario}
                        onChange={e => setPropietario(e.target.value)}
                    />
                </div>

                <div className="flex flex-row -mx-3 mb-6">
                    <div className="w-full px-3 mb-6 md:mb-0">
                        <label
                            htmlFor="run"
                            className="text-gray-800 uppercase font-bold"
                        >Run
                        </label>
                        <input 
                            id="run"
                            type="text"
                            placeholder="Run"
                            className="border-2 w-full p-2 mt-2 rounded"
                            value={run}
                            onChange={e => setRun(e.target.value)}
                        />
                    </div>

                    <div className="w-full px-3 mb-6 md:mb-0">
                        <label
                            htmlFor="domicilio"
                            className="text-gray-800 uppercase font-bold"
                        >Domicilio
                        </label>
                        <input 
                            id="domicilio"
                            type="text"
                            placeholder="Domicilio"
                            className="border-2 w-full p-2 mt-2 rounded"
                            value={domicilio}
                            onChange={e => setDomicilio(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex flex-row -mx-3 mb-6">
                    <div className="w-full px-3 mb-6 md:mb-0">
                        <label
                            htmlFor="telefono"
                            className="text-gray-800 uppercase font-bold"
                        >Telefono
                        </label>
                        <input 
                            id="telefono"
                            type="telefono"
                            placeholder="Telefono"
                            className="border-2 w-full p-2 mt-2 rounded"
                            value={telefono}
                            onChange={e => setTelefono(e.target.value)}
                        />
                    </div>

                    <div className="w-full px-3 mb-6 md:mb-0">
                        <label
                            htmlFor="email"
                            className="text-gray-800 px uppercase font-bold"
                        >Email
                        </label>
                        <input 
                            id="email"
                            type="email"
                            placeholder="E-mail"
                            className="border-2 w-full p-2 mt-2 rounded"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    
                </div>
                <input 
                    type="submit"
                    className="bg-black w-full p-3 rounded text-lime-400 uppercase font-bold hover:bg-lime-300 hover:text-black cursor-pointer transition-colors duration-300"
                    value={ id ? "Guardar Cambios": "Agregar Paciente"} 
                />
            </form>
        {msg && <Alerta alerta={alerta} />}
        </> 
    )
}

export default Formulario