import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { PawPrint, LogOut, ArrowLeft, Calendar, Clock, FileText } from 'lucide-react';
import useClienteAuth from '../hooks/useClienteAuth';
import clienteAxios from '../config/axios';
import Alerta from '../components/Alerta';

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
        const { data } = await clienteAxios(`/pacientes/cliente/${cliente._id}`, config);
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
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50">
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
            <Link to="/portal/mi-historial" className="text-sm text-gray-700 hover:text-blue-600">Mi Historial</Link>
            <button onClick={cerrarSesionCliente} className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700">
              <LogOut className="w-4 h-4" />Salir
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Solicitar Cita</h2>
            <p className="text-gray-600">Completa el formulario para solicitar una cita</p>
          </div>
          <Link to="/portal/dashboard" className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
            <ArrowLeft className="w-5 h-5" />Volver
          </Link>
        </div>

        {msg && <Alerta alerta={alerta} />}

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-600 rounded">
            <p className="text-sm text-blue-800">
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
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  Solicitar Cita
                </button>
                <Link
                  to="/portal/dashboard"
                  className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition duration-200 text-center"
                >
                  Cancelar
                </Link>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  );
};

export default SolicitarCita;
