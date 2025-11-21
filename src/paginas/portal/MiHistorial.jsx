import { useEffect, useState } from 'react';
import { Calendar, FileText } from 'lucide-react';
import useClienteAuth from '../../hooks/useClienteAuth';
import clienteAxios from '../../config/axios';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const MiHistorial = () => {
  const { cliente } = useClienteAuth();
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
          clienteAxios(`/citas/portal/mis-citas`, config),
          clienteAxios(`/consultas/portal/mis-consultas`, config),
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
      confirmada: 'bg-blue-100 text-gray-900',
      'en-curso': 'bg-purple-100 text-purple-800',
      completada: 'bg-green-100 text-green-800',
      cancelada: 'bg-red-100 text-red-800',
    };
    return badges[estado] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">Mi Historial</h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">Citas y consultas médicas de tus mascotas</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b">
          <button
            onClick={() => setVistaActiva('citas')}
            className={`pb-3 px-4 font-semibold transition-colors ${
              vistaActiva === 'citas'
                ? 'text-gray-900 border-b-2 border-blue-600'
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
                ? 'text-gray-900 border-b-2 border-blue-600'
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
              <Card>
                {citas.length === 0 ? (
                  <CardContent className="p-12 text-center">
                    <Calendar className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">No tienes citas registradas</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">Solicita una cita para tu mascota</p>
                    <Button asChild>
                      <Link to="/portal/solicitar-cita">
                        Solicitar Cita
                      </Link>
                    </Button>
                  </CardContent>
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
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
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
                              <Badge variant="outline" className={getEstadoBadge(cita.estado)}>
                                {cita.estado.charAt(0).toUpperCase() + cita.estado.slice(1)}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </Card>
            )}

            {vistaActiva === 'consultas' && (
              <Card>
                {consultas.length === 0 ? (
                  <CardContent className="p-12 text-center">
                    <FileText className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">No tienes consultas registradas</h3>
                    <p className="text-gray-600 dark:text-gray-400">El historial médico aparecerá aquí después de las consultas</p>
                  </CardContent>
                ) : (
                  <CardContent className="p-6 space-y-4">
                    {consultas.map((consulta) => (
                      <div key={consulta._id} className="border rounded-lg p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">{consulta.paciente?.nombre}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{formatearFecha(consulta.fecha)}</p>
                          </div>
                          <Badge variant="outline" className={
                            consulta.estado === 'completada' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }>
                            {consulta.estado === 'completada' ? 'Completada' : 'En Tratamiento'}
                          </Badge>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600 dark:text-gray-400 mb-1">Veterinario:</p>
                            <p className="font-semibold text-slate-900 dark:text-white">Dr(a). {consulta.veterinario?.nombre}</p>
                          </div>
                          <div>
                            <p className="text-gray-600 dark:text-gray-400 mb-1">Motivo de Consulta:</p>
                            <p className="font-semibold text-slate-900 dark:text-white">{consulta.motivoConsulta.substring(0, 80)}...</p>
                          </div>
                          <div className="md:col-span-2">
                            <p className="text-gray-600 dark:text-gray-400 mb-1">Diagnóstico:</p>
                            <p className="text-slate-900 dark:text-white">{consulta.diagnostico.substring(0, 150)}...</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                )}
              </Card>
            )}
          </>
        )}
      </main>

      <footer className="mt-16 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>© 2025 Clínica Veterinaria. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default MiHistorial;
