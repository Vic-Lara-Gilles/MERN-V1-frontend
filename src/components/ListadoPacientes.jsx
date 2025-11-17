import usePacientes from "../hooks/usePacientes"
import Paciente from "./Paciente"

const ListadoPacientes = () => {

    const { pacientes } = usePacientes()
    console.log(pacientes)

    return (
        <>
            { pacientes.length ? 
            (
                <>
                    <h2 className="bg-black text-3xl py-4 mx-10 rounded-md text-yellow-400 font-semibold text-center md:flex-col">Listado de Pacientes | Busqueda por Run</h2>
                    {pacientes.map( paciente  => (
                        <Paciente
                            key={paciente._id}
                            paciente={paciente}
                            run={paciente.run}
                        />
                    ))}
                    
                </>
            ):(
                <>
                    <div>
                        <h2 className="bg-black flex-items-start text-3xl py-4 mx-10 rounded-md text-yellow-400 text-center"> No hay pacientes Registrados </h2>
                    </div>
                </>
            )}
        </>
    )
}

export default ListadoPacientes