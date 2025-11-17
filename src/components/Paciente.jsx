import usePacientes from "../hooks/usePacientes"

const Paciente = ({paciente}) => {

    const { setEdicion, eliminarPaciente } = usePacientes()
    
    const {nombre, sexo, especie, peso, raza, altura, fechaIngreso, fechaAlta, fechaNac, sintomas, propietario, run, domicilio, telefono, email, _id} = paciente

    const formatearFecha = (fecha) => {
        const nuevaFecha = new Date(fecha)
        return new Intl.DateTimeFormat('es-MX', {dateStyle: 'long'}).format(nuevaFecha)
    }

    const calcularAños = (fechaNacimiento) => {
        const fechaActual = new Date();
        const anoActual = parseInt(fechaActual.getFullYear());
        const mesActual = parseInt(fechaActual.getMonth()) + 1;
        const diaActual = parseInt(fechaActual.getDate());
    

        const anoNacimiento = parseInt(String(fechaNacimiento).substring(0, 4));
        const mesNacimiento = parseInt(String(fechaNacimiento).substring(5, 7));
        const diaNacimiento = parseInt(String(fechaNacimiento).substring(8, 10));
    
        let edad = anoActual - anoNacimiento;
        if (mesActual < mesNacimiento) {
            edad--;
        } else if (mesActual === mesNacimiento) {
            if (diaActual < diaNacimiento) {
                edad--;
            }
        }
        return edad; 
    };
    
    const calcularMeses = (fechaNacimiento) => {
        const fechaActual = new Date();
        const mesActual = parseInt(fechaActual.getMonth()) + 1;
        const diaActual = parseInt(fechaActual.getDate());

        const mesNacimiento = parseInt(String(fechaNacimiento).substring(5, 7));
        const diaNacimiento = parseInt(String(fechaNacimiento).substring(8, 10));

        let meses = 0;
        if (mesActual < mesNacimiento) {
            meses = (12 - mesNacimiento) + mesActual;
        } else if (mesActual === mesNacimiento) {
            if (diaActual < diaNacimiento) {
                meses = 11;
            }
        } else {
            meses = mesActual - mesNacimiento;
        }
        return meses;
    };

    return (
        <div className="mx-10 my-10 bg-gray-200 bg-opacity-50 shadow-md rounded px-7 py-5 ">
            
            <div className="flex justify-center pb-5 mx-3">
                <h1 className="text-gray-700 font-bold text-xl uppercase">Datos Mascota</h1>
            </div>

            <div>
                <div class="flex flex-col p-3 bg-gray-100  rounded mx-3 mb-6">
                    <p className="font-bold text-gray-800 uppercase ml-4 my-2">Nombre : {' '}
                        <span className="font-normal text-black normal-case">{nombre}</span>
                    </p>
                    <p className="font-bold text-gray-800 uppercase ml-4 my-2">Especie :{' '}
                        <span className="font-normal text-black normal-case">{especie}</span>
                    </p>
                    <p className="font-bold text-gray-800 uppercase ml-4 my-2">Sexo :{' '}
                        <span className="font-normal text-black normal-case">{sexo}</span>
                    </p>
                    <p className="font-bold text-gray-800 uppercase ml-4 my-2">peso :{' '}
                        <span className="font-normal text-black normal-case">{peso} Kg</span>
                    </p>
                    <p className="font-bold text-gray-800 uppercase ml-4 my-2">edad :{' '}
                        <span className="font-normal text-black normal-case">{calcularAños(fechaNac)} Años  /  {calcularMeses(fechaNac)} meses</span>
                    </p>

                    <p className="font-bold text-gray-800 uppercase ml-4 my-2">Raza :{' '}
                        <span className="font-normal text-black normal-case">{raza}</span>
                    </p>

                    <p className="font-bold text-gray-800 uppercase ml-4 my-2">altura :{' '}
                        <span className="font-normal text-black normal-case">{altura} Cm</span>
                    </p>
                    <p className="font-bold text-gray-800 uppercase ml-4 my-2">Fecha Nac :{' '}
                        <span className="font-normal text-black normal-case">{formatearFecha(fechaNac)}</span>
                    </p>
                </div>

                <div className="flex flex-col p-3 bg-gray-100  rounded mx-3 mb-6">
                    <p className="font-bold  justify-center text-gray-800 uppercase ml-4 my-2">Fecha Ingreso:{' '}
                        <span className="font-normal text-black normal-case">{formatearFecha(fechaIngreso)}</span>
                    </p>
                    <p className="font-bold justify-center text-gray-800 uppercase ml-4 my-2">Fecha de Alta:{' '}
                        <span className="font-normal text-black normal-case">{formatearFecha(fechaAlta)}</span>
                    </p>
                </div> 
            </div>

            <div className="flex flex-row bg-gray-100  rounded mx-3 mb-6">
                <p className="font-bold text-gray-800 ml-6 uppercase  mb-10 my-2">Sintomas:{' '}
                    <span className="font-normal text-black normal-case">{sintomas}</span>
                </p>
            </div>

            <div className="flex flex-row justify-center pb-5 mx-3">
                <h1 className="text-black font-bold text-xl uppercase">Datos Propietario</h1>
            </div>

            <div className=" bg-gray-100 py-1 pl-3 mx-3 rounded">
                    <p className="font-bold text-gray-800 uppercase ml-3 pt-3 my-4">Propietario:{' '}
                        <span className="font-normal text-black normal-case">{propietario}</span>
                    </p>

                    <p className="font-bold text-gray-800 uppercase ml-3 my-6">Run:{' '}
                        <span className="font-normal text-black normal-case">{run}</span>
                    </p>
                
                    <p className="font-bold text-gray-800 ml-3 my-6 uppercase">Telefono:{' '}
                        <span className="font-normal text-black normal-case">{telefono}</span>
                    </p>

                    <p className="font-bold text-gray-800 ml-3 my-6 uppercase">Email:{' '}
                        <span className="font-normal text-black normal-case">{email}</span>
                    </p>

                    <p className="font-bold text-gray-800 uppercase ml-3 my-6">Domicilio:{' '}
                        <span className="font-normal text-black normal-case">{domicilio}</span>
                    </p>
                
            </div>

            <div className="flex mt-5 py-2 pl-3 justify-between">
                <button
                    type="button"
                    className="py-3 px-10 bg-black text-lime-400 hover:bg-sky-500 hover:text-white uppercase font-semibold rounded transition-colors duration-300"
                    onClick={() => setEdicion(paciente)}
                >Editar</button>

                <button
                    type="button"
                    className=" py-3 px-10 bg-black text-lime-400 mr-2 hover:bg-red-500 hover:text-white uppercase font-semibold rounded transition-colors duration-300"
                    onClick={() => eliminarPaciente(_id)}
                >Eliminar</button>
            </div>
        </div>
    )
}

export default Paciente