import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PawPrint, LogOut, ArrowLeft, Calendar } from 'lucide-react';
import useClienteAuth from '../hooks/useClienteAuth';
import clienteAxios from '../config/axios';

const MisMascotas = () => {
  const { cliente, cerrarSesionCliente } = useClienteAuth();
  const [pacientes, setPacientes] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerPacientes = async () => {
      try {
        const token = localStorage.getItem('token_cliente');
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const { data } = await clienteAxios(`/pacientes/cliente/${cliente._id}`, config);
        setPacientes(data);
      } catch (error) {
        console.log(error);
      }
      setCargando(false);
    };
    if (cliente._id) obtenerPacientes();
  }, [cliente]);

  const calcularEdad = (fechaNacimiento) => {
    if (!fechaNacimiento) return 'N/A';
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) edad--;
    return edad > 0 ? `${edad} año${edad !== 1 ? 's' : ''}` : 'Menos de 1 año';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <header className="bg-white shadow-md border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <PawPrint className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">Portal Cliente</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/portal/dashboard" className="text-sm text-gray-700 hover:text-blue-600">Dashboard</Link>
            <Link to="/portal/mi-historial" className="text-sm text-gray-700 hover:text-blue-600">Historial</Link>
            <Link to="/portal/solicitar-cita" className="text-sm text-gray-700 hover:text-blue-600">Solicitar Cita</Link>
            <button onClick={cerrarSesionCliente} className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700">
              <LogOut className="w-4 h-4" />Salir
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Mis Mascotas</h2>
            <p className="text-gray-600">Información de tus mascotas registradas</p>
          </div>
          <Link to="/portal/dashboard" className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
            <ArrowLeft className="w-5 h-5" />Volver
          </Link>
        </div>

        {cargando ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : pacientes.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <PawPrint className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No tienes mascotas registradas</h3>
            <p className="text-gray-600">Contacta con recepción para registrar a tu mascota</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pacientes.map((paciente) => (
              <div key={paciente._id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 text-white">
                  <h3 className="text-xl font-bold">{paciente.nombre}</h3>
                  <p className="text-sm text-blue-100">{paciente.numeroHistoriaClinica}</p>
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Especie:</span>
                    <span className="font-semibold">{paciente.especie}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Raza:</span>
                    <span className="font-semibold">{paciente.raza || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Edad:</span>
                    <span className="font-semibold">{calcularEdad(paciente.fechaNacimiento)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Sexo:</span>
                    <span className="font-semibold">{paciente.sexo}</span>
                  </div>
                  {paciente.peso && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Peso:</span>
                      <span className="font-semibold">{paciente.peso} kg</span>
                    </div>
                  )}
                  {paciente.esterilizado !== undefined && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Esterilizado:</span>
                      <span className={`font-semibold ${paciente.esterilizado ? 'text-green-600' : 'text-gray-600'}`}>
                        {paciente.esterilizado ? 'Sí' : 'No'}
                      </span>
                    </div>
                  )}
                  <Link
                    to="/portal/solicitar-cita"
                    state={{ pacienteId: paciente._id }}
                    className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <Calendar className="w-4 h-4" />
                    Solicitar Cita
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default MisMascotas;
