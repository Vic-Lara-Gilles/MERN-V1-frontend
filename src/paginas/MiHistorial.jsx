import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PawPrint, LogOut, ArrowLeft, Calendar, FileText, Home, CalendarPlus } from 'lucide-react';
import useClienteAuth from '../hooks/useClienteAuth';
import clienteAxios from '../config/axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
              <PawPrint className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900">Portal Cliente</h1>
              <p className="text-xs text-muted-foreground">Clínica Veterinaria</p>
            </div>
          </div>

          <nav className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/portal/dashboard">
                <Home className="h-4 w-4 mr-2" />
                Inicio
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/portal/mis-mascotas">
                <PawPrint className="h-4 w-4 mr-2" />
                Mascotas
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/portal/mi-historial">
                <FileText className="h-4 w-4 mr-2" />
                Historial
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/portal/solicitar-cita">
                <CalendarPlus className="h-4 w-4 mr-2" />
                Solicitar
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={cerrarSesionCliente}
              className="text-destructive hover:text-destructive"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Salir
            </Button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-slate-900 mb-2">Mi Historial</h2>
          <p className="text-muted-foreground text-lg">Citas y consultas médicas de tus mascotas</p>
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
                    <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">No tienes citas registradas</h3>
                    <p className="text-muted-foreground mb-4">Solicita una cita para tu mascota</p>
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
                    <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">No tienes consultas registradas</h3>
                    <p className="text-muted-foreground">El historial médico aparecerá aquí después de las consultas</p>
                  </CardContent>
                ) : (
                  <CardContent className="p-6 space-y-4">
                    {consultas.map((consulta) => (
                      <div key={consulta._id} className="border rounded-lg p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-bold text-slate-900">{consulta.paciente?.nombre}</h3>
                            <p className="text-sm text-muted-foreground">{formatearFecha(consulta.fecha)}</p>
                          </div>
                          <Badge variant="outline" className={
                            consulta.estado === 'completada' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }>
                            {consulta.estado === 'completada' ? 'Completada' : 'En Tratamiento'}
                          </Badge>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground mb-1">Veterinario:</p>
                            <p className="font-semibold text-slate-900">Dr(a). {consulta.veterinario?.nombre}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground mb-1">Motivo de Consulta:</p>
                            <p className="font-semibold text-slate-900">{consulta.motivoConsulta.substring(0, 80)}...</p>
                          </div>
                          <div className="md:col-span-2">
                            <p className="text-muted-foreground mb-1">Diagnóstico:</p>
                            <p className="text-slate-900">{consulta.diagnostico.substring(0, 150)}...</p>
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

      <footer className="mt-16 border-t bg-white">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>© 2025 Clínica Veterinaria. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default MiHistorial;
