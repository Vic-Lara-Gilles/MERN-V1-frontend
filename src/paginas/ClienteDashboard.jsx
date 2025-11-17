import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  PawPrint,
  Calendar,
  FileText,
  LogOut,
  User,
  Phone,
  Mail,
  MapPin,
  Clock,
  CalendarPlus,
} from 'lucide-react';
import useClienteAuth from '../hooks/useClienteAuth';
import clienteAxios from '../config/axios';

const ClienteDashboard = () => {
  const { cliente, cerrarSesionCliente } = useClienteAuth();
  const [estadisticas, setEstadisticas] = useState({
    totalMascotas: 0,
    proximasCitas: 0,
    ultimaConsulta: null,
  });
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerEstadisticas = async () => {
      try {
        const token = localStorage.getItem('token_cliente');
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        };

        // Obtener pacientes del cliente
        const { data: pacientes } = await clienteAxios(`/pacientes/cliente/${cliente._id}`, config);
        
        // Obtener citas del cliente
        const { data: citas } = await clienteAxios(`/citas/cliente/${cliente._id}`, config);
        
        // Contar próximas citas (pendientes o confirmadas)
        const hoy = new Date();
        const proximasCitas = citas.filter(
          (cita) =>
            new Date(cita.fecha) >= hoy &&
            (cita.estado === 'pendiente' || cita.estado === 'confirmada')
        );

        setEstadisticas({
          totalMascotas: pacientes.length,
          proximasCitas: proximasCitas.length,
          ultimaConsulta: null, // Se puede implementar más adelante
        });
      } catch (error) {
        console.log(error);
      }
      setCargando(false);
    };

    if (cliente._id) {
      obtenerEstadisticas();
    }
  }, [cliente]);

  if (cargando) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-md border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <PawPrint className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Portal Cliente</h1>
              <p className="text-sm text-gray-600">Clínica Veterinaria</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/portal/mis-mascotas"
              className="text-sm text-gray-700 hover:text-blue-600 font-medium"
            >
              Mis Mascotas
            </Link>
            <Link
              to="/portal/mi-historial"
              className="text-sm text-gray-700 hover:text-blue-600 font-medium"
            >
              Historial
            </Link>
            <Link
              to="/portal/solicitar-cita"
              className="text-sm text-gray-700 hover:text-blue-600 font-medium"
            >
              Solicitar Cita
            </Link>
            <button
              onClick={cerrarSesionCliente}
              className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-medium"
            >
              <LogOut className="w-4 h-4" />
              Salir
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Bienvenida */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            ¡Bienvenido, {cliente.nombre}!
          </h2>
          <p className="text-gray-600">
            Desde aquí puedes ver la información de tus mascotas y gestionar tus citas
          </p>
        </div>

        {/* Estadísticas */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium mb-1">Mis Mascotas</p>
                <p className="text-4xl font-bold">{estadisticas.totalMascotas}</p>
              </div>
              <PawPrint className="w-16 h-16 text-blue-200" />
            </div>
            <Link
              to="/portal/mis-mascotas"
              className="mt-4 inline-block text-sm text-white underline hover:text-blue-100"
            >
              Ver todas →
            </Link>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium mb-1">Próximas Citas</p>
                <p className="text-4xl font-bold">{estadisticas.proximasCitas}</p>
              </div>
              <Calendar className="w-16 h-16 text-purple-200" />
            </div>
            <Link
              to="/portal/mi-historial"
              className="mt-4 inline-block text-sm text-white underline hover:text-purple-100"
            >
              Ver calendario →
            </Link>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium mb-1">Última Consulta</p>
                <p className="text-lg font-semibold">
                  {estadisticas.ultimaConsulta ? estadisticas.ultimaConsulta : 'Sin registro'}
                </p>
              </div>
              <FileText className="w-16 h-16 text-green-200" />
            </div>
            <Link
              to="/portal/mi-historial"
              className="mt-4 inline-block text-sm text-white underline hover:text-green-100"
            >
              Ver historial →
            </Link>
          </div>
        </div>

        {/* Información Personal */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Datos del Cliente */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              Mis Datos
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Nombre Completo</p>
                <p className="font-semibold text-gray-900">
                  {cliente.nombre} {cliente.apellido}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">RUT</p>
                <p className="font-semibold text-gray-900">{cliente.rut}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1 flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  Email
                </p>
                <p className="font-semibold text-gray-900">{cliente.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1 flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  Teléfono
                </p>
                <p className="font-semibold text-gray-900">{cliente.telefono}</p>
              </div>
              {cliente.direccion && (
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-500 mb-1 flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    Dirección
                  </p>
                  <p className="font-semibold text-gray-900">
                    {cliente.direccion}
                    {cliente.comuna && `, ${cliente.comuna}`}
                    {cliente.ciudad && `, ${cliente.ciudad}`}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Acciones Rápidas */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Acciones Rápidas</h3>
            <div className="space-y-3">
              <Link
                to="/portal/mis-mascotas"
                className="w-full flex items-center gap-3 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <PawPrint className="w-5 h-5" />
                Ver Mis Mascotas
              </Link>
              <Link
                to="/portal/solicitar-cita"
                className="w-full flex items-center gap-3 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <CalendarPlus className="w-5 h-5" />
                Solicitar Cita
              </Link>
              <Link
                to="/portal/mi-historial"
                className="w-full flex items-center gap-3 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Clock className="w-5 h-5" />
                Ver Historial
              </Link>
            </div>
          </div>
        </div>

        {/* Información importante */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-2">📌 Información Importante</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• Las citas solicitadas deben ser confirmadas por nuestra recepción</li>
            <li>• Puedes ver el historial médico completo de tus mascotas</li>
            <li>• Para cambios en tus datos personales, contacta con recepción</li>
            <li>• En caso de emergencia, llámanos directamente</li>
          </ul>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 bg-white border-t py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-600">
          <p>© 2025 Clínica Veterinaria. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default ClienteDashboard;
