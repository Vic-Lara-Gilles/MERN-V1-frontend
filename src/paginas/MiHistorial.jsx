import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PawPrint, LogOut, ArrowLeft, Calendar, FileText } from 'lucide-react';
import useClienteAuth from '../hooks/useClienteAuth';
import clienteAxios from '../config/axios';

const MiHistorial = () => {
  const { cliente, cerrarSesionCliente } = useClienteAuth();
  const [citas, setCitas] = useState([]);
  const [consultas, setConsultas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [vistaActiva, setVistaActiva] = useState('citas');

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const token = localStorage.getItem('token_cliente');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        
        const [citasRes, consultasRes] = await Promise.all([
          clienteAxios(`/citas/cliente/${cliente._id}`, config),
          clienteAxios(`/consultas/cliente/${cliente._id}`, config),
        ]);
        
        setCitas(citasRes.data);
        setConsultas(consultasRes.data);
      } catch (error) {
        console.log(error);
      }
      setCargando(false);
    };
    if (cliente._id) obtenerDatos();
  }, [cliente]);

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-CL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getEstadoBadge = (estado) => {
    const badges = {
      pendiente: 'bg-yellow-100 text-yellow-800',
      confirmada: 'bg-blue-100 text-blue-800',
      'en-curso': 'bg-purple-100 text-purple-800',
      completada: 'bg-green-100 text-green-800',
      cancelada: 'bg-red-100 text-red-800',
    };
    return badges[estado] || 'bg-gray-100 text-gray-800';
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
            <Link to="/portal/mis-mascotas" className="text-sm text-gray-700 hover:text-blue-600">Mis Mascotas</Link>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Mi Historial</h2>
            <p className="text-gray-600">Citas y consultas médicas de tus mascotas</p>
          </div>
          <Link to="/portal/dashboard" className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
            <ArrowLeft className="w-5 h-5" />Volver
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b">
          <button
            onClick={() => setVistaActiva('citas')}
            className={`pb-3 px-4 font-semibold transition-colors ${
              vistaActiva === 'citas'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Calendar className="w-4 h-4 inline mr-2" />
            Citas ({citas.length})
          </button>
          <button
            onClick={() => setVistaActiva('consultas')}
            className={`pb-3 px-4 font-semibold transition-colors ${
              vistaActiva === 'consultas'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <FileText className="w-4 h-4 inline mr-2" />
            Consultas ({consultas.length})
          </button>
        </div>

        {cargando ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            {vistaActiva === 'citas' && (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {citas.length === 0 ? (
                  <div className="p-12 text-center">
                    <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No tienes citas registradas</h3>
                    <p className="text-gray-600 mb-4">Solicita una cita para tu mascota</p>
                    <Link to="/portal/solicitar-cita" className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      Solicitar Cita
                    </Link>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mascota</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Veterinario</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Motivo</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {citas.map((cita) => (
                          <tr key={cita._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {formatearFecha(cita.fecha)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {cita.paciente?.nombre}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              Dr(a). {cita.veterinario?.nombre}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                              {cita.motivo}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getEstadoBadge(cita.estado)}`}>
                                {cita.estado.charAt(0).toUpperCase() + cita.estado.slice(1)}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {vistaActiva === 'consultas' && (
              <div className="space-y-4">
                {consultas.length === 0 ? (
                  <div className="bg-white rounded-lg shadow-md p-12 text-center">
                    <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No hay consultas registradas</h3>
                    <p className="text-gray-600">El historial médico aparecerá aquí</p>
                  </div>
                ) : (
                  consultas.map((consulta) => (
                    <div key={consulta._id} className="bg-white rounded-lg shadow-md p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{consulta.paciente?.nombre}</h3>
                          <p className="text-sm text-gray-600">{formatearFecha(consulta.fecha)}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          consulta.estado === 'completada' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {consulta.estado === 'completada' ? 'Completada' : 'En Tratamiento'}
                        </span>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500 mb-1">Veterinario:</p>
                          <p className="font-semibold">Dr(a). {consulta.veterinario?.nombre}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 mb-1">Motivo de Consulta:</p>
                          <p className="font-semibold">{consulta.motivoConsulta.substring(0, 80)}...</p>
                        </div>
                        <div className="md:col-span-2">
                          <p className="text-gray-500 mb-1">Diagnóstico:</p>
                          <p className="text-gray-900">{consulta.diagnostico.substring(0, 150)}...</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default MiHistorial;
