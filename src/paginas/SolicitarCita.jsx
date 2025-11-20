import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { PawPrint, LogOut, ArrowLeft, Calendar, Clock, FileText, Home, CalendarPlus } from 'lucide-react';
import useClienteAuth from '../hooks/useClienteAuth';
import clienteAxios from '../config/axios';
import Alerta from '../components/Alerta';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SolicitarCita = () => {
  const { cliente, cerrarSesionCliente } = useClienteAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [pacientes, setPacientes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState({});
  const [cita, setCita] = useState({
    paciente: location.state?.pacienteId || '',
    fecha: '',
    hora: '',
    tipoConsulta: 'consulta',
    motivo: '',
    notasAdicionales: '',
  });

  useEffect(() => {
    const obtenerPacientes = async () => {
      try {
        const token = localStorage.getItem('token_cliente');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const { data } = await clienteAxios(`/pacientes/portal/mis-pacientes`, config);
        setPacientes(data);
      } catch (error) {
        console.log(error);
      }
      setCargando(false);
    };
    if (cliente._id) obtenerPacientes();
  }, [cliente]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cita.paciente || !cita.fecha || !cita.hora || !cita.motivo) {
      setAlerta({
        msg: 'Todos los campos marcados con * son obligatorios',
        error: true,
      });
      return;
    }

    const fechaHora = new Date(`${cita.fecha}T${cita.hora}`);
    if (fechaHora <= new Date()) {
      setAlerta({
        msg: 'La fecha y hora debe ser en el futuro',
        error: true,
      });
      return;
    }

    try {
      const token = localStorage.getItem('token_cliente');
      const config = { headers: { Authorization: `Bearer ${token}` } };

      await clienteAxios.post(
        '/citas',
        {
          paciente: cita.paciente,
          fecha: fechaHora,
          motivo: cita.motivo,
          notas: cita.notasAdicionales,
          estado: 'pendiente',
        },
        config
      );

      setAlerta({
        msg: 'Cita solicitada correctamente. Recepción confirmará pronto.',
        error: false,
      });

      setTimeout(() => {
        navigate('/portal/dashboard');
      }, 2000);
    } catch (error) {
      setAlerta({
        msg: error.response?.data?.msg || 'Hubo un error al solicitar la cita',
        error: true,
      });
    }
  };

  const { msg } = alerta;

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

      <main className="container max-w-3xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-slate-900 mb-2">Solicitar Cita</h2>
          <p className="text-muted-foreground text-lg">Completa el formulario para solicitar una cita</p>
        </div>

        {msg && <Alerta alerta={alerta} />}

        <Card>
          <CardContent className="p-6">
            <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-600 rounded">
              <p className="text-sm text-slate-900">
                <strong>Importante:</strong> Tu solicitud será revisada por recepción. 
                Recibirás confirmación por correo electrónico o teléfono.
              </p>
            </div>

          {cargando ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <PawPrint className="w-4 h-4 inline mr-1" />
                  Mascota *
                </label>
                <select
                  value={cita.paciente}
                  onChange={(e) => setCita({ ...cita, paciente: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Selecciona una mascota</option>
                  {pacientes.map((paciente) => (
                    <option key={paciente._id} value={paciente._id}>
                      {paciente.nombre} ({paciente.especie})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Fecha *
                  </label>
                  <input
                    type="date"
                    value={cita.fecha}
                    onChange={(e) => setCita({ ...cita, fecha: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Clock className="w-4 h-4 inline mr-1" />
                    Hora Preferida *
                  </label>
                  <input
                    type="time"
                    value={cita.hora}
                    onChange={(e) => setCita({ ...cita, hora: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <FileText className="w-4 h-4 inline mr-1" />
                  Tipo de Consulta *
                </label>
                <select
                  value={cita.tipoConsulta}
                  onChange={(e) => setCita({ ...cita, tipoConsulta: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="consulta">Consulta General</option>
                  <option value="vacunacion">Vacunación</option>
                  <option value="revision">Revisión / Control</option>
                  <option value="emergencia">Emergencia</option>
                  <option value="cirugia">Cirugía</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Motivo de la Consulta *
                </label>
                <textarea
                  value={cita.motivo}
                  onChange={(e) => setCita({ ...cita, motivo: e.target.value })}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe brevemente el motivo de la consulta..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Notas Adicionales (Opcional)
                </label>
                <textarea
                  value={cita.notasAdicionales}
                  onChange={(e) => setCita({ ...cita, notasAdicionales: e.target.value })}
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Información adicional que consideres importante..."
                />
              </div>

              <div className="flex gap-4">
                <Button type="submit" className="flex-1">
                  Solicitar Cita
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/portal/dashboard">
                    Cancelar
                  </Link>
                </Button>
              </div>
            </form>
          )}
          </CardContent>
        </Card>
      </main>

      <footer className="mt-16 border-t bg-white">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>© 2025 Clínica Veterinaria. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default SolicitarCita;
