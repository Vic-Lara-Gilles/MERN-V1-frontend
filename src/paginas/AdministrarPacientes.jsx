import { useState } from "react"
import Formulario from "../components/Formulario"
import ListadoPacientes from "../components/ListadoPacientes"

const AdministrarPacientes = () => {

    const [mostrarFormulario, setMostrarFormulario] = useState(false)

    return (
        <div className="flex flex-col md:flex-row">
            <button
                type="button"
                className="bg-black mx-10 p-4 mb-10 md:hidden text-sm text-lime-300 inline-flex items-center justify-center rounded-md hover:bg-lime-400 hover:text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white uppercase font-bold transition-colors duration-300"
                onClick={() => setMostrarFormulario(!mostrarFormulario)}
            >{mostrarFormulario ? 'Ocultar Formulario': 'Mostrar Formulario'}</button>

            <div className={`${mostrarFormulario ? 'block':'hidden' } md:block md:w-1/2 lg:w-2/5`}>
                <Formulario />
            </div>

            <div className="md:w-1/2 lg:w-3/5">
                <ListadoPacientes />
            </div>
        </div>
    )
}

export default AdministrarPacientes