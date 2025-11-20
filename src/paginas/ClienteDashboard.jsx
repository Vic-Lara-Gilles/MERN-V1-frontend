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
  TrendingUp,
  Home
} from 'lucide-react';
import useClienteAuth from '../hooks/useClienteAuth';
import clienteAxios from '../config/axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ClienteDashboard = () => {
  const { cliente, cerrarSesionCliente } = useClienteAuth();
  const [estadisticas, setEstadisticas] = useState({
    totalMascotas: 0,
    proximasCitas: 0,
    ultimaConsulta: null,
  });
  const [pacientes, setPacientes] = useState([]);
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
        const { data: pacientesData } = await clienteAxios(`/pacientes/portal/mis-pacientes`, config);
        setPacientes(pacientesData.slice(0, 3)); // Solo las primeras 3 mascotas
        
        // Obtener citas del cliente
        const { data: citas } = await clienteAxios(`/citas/portal/mis-citas`, config);
        
        // Contar próximas citas (pendientes o confirmadas)
        const hoy = new Date();
        const proximasCitas = citas.filter(
          (cita) =>
            new Date(cita.fecha) >= hoy &&
            (cita.estado === 'pendiente' || cita.estado === 'confirmada')
        );

        setEstadisticas({
          totalMascotas: pacientesData.length,
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
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
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

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Bienvenida */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-slate-900 mb-2">
            ¡Bienvenido, {cliente.nombre}!
          </h2>
          <p className="text-muted-foreground text-lg">
            Gestiona la información de tus mascotas y consulta su historial médico
          </p>
        </div>

        {/* Estadísticas */}
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Mis Mascotas
              </CardTitle>
              <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <PawPrint className="h-5 w-5 text-gray-900" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{estadisticas.totalMascotas}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Mascotas registradas
              </p>
              <Button variant="link" className="px-0 mt-2" asChild>
                <Link to="/portal/mis-mascotas">
                  Ver todas →
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Próximas Citas
              </CardTitle>
              <div className="h-10 w-10 rounded-lg bg-purple-50 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{estadisticas.proximasCitas}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Citas confirmadas
              </p>
              <Button variant="link" className="px-0 mt-2" asChild>
                <Link to="/portal/mi-historial">
                  Ver calendario →
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Última Consulta
              </CardTitle>
              <div className="h-10 w-10 rounded-lg bg-green-50 flex items-center justify-center">
                <FileText className="h-5 w-5 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-semibold">
                {estadisticas.ultimaConsulta ? estadisticas.ultimaConsulta : 'Sin registro'}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Historial médico
              </p>
              <Button variant="link" className="px-0 mt-2" asChild>
                <Link to="/portal/mi-historial">
                  Ver historial →
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Información Personal y Acciones */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Datos del Cliente */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Mis Datos Personales
              </CardTitle>
              <CardDescription>
                Información de contacto registrada
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Nombre Completo</p>
                  <p className="text-base font-semibold text-slate-900">
                    {cliente.nombre} {cliente.apellido}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">RUT</p>
                  <p className="text-base font-semibold text-slate-900">{cliente.rut}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    Email
                  </p>
                  <p className="text-base font-semibold text-slate-900">{cliente.email}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                    <Phone className="h-4 w-4" />
                    Teléfono
                  </p>
                  <p className="text-base font-semibold text-slate-900">{cliente.telefono}</p>
                </div>
                {cliente.direccion && (
                  <div className="md:col-span-2 space-y-1">
                    <p className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      Dirección
                    </p>
                    <p className="text-base font-semibold text-slate-900">
                      {cliente.direccion}
                      {cliente.comuna && `, ${cliente.comuna}`}
                      {cliente.ciudad && `, ${cliente.ciudad}`}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Acciones Rápidas */}
          <Card>
            <CardHeader>
              <CardTitle>Acciones Rápidas</CardTitle>
              <CardDescription>
                Gestiona tus citas y mascotas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" size="lg" asChild>
                <Link to="/portal/mis-mascotas">
                  <PawPrint className="h-5 w-5 mr-3" />
                  Ver Mis Mascotas
                </Link>
              </Button>
              <Button className="w-full justify-start bg-purple-600 hover:bg-purple-700" size="lg" asChild>
                <Link to="/portal/solicitar-cita">
                  <CalendarPlus className="h-5 w-5 mr-3" />
                  Solicitar Cita
                </Link>
              </Button>
              <Button className="w-full justify-start bg-green-600 hover:bg-green-700" size="lg" asChild>
                <Link to="/portal/mi-historial">
                  <Clock className="h-5 w-5 mr-3" />
                  Ver Historial
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Resumen de Mascotas */}
        {pacientes.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <PawPrint className="h-5 w-5" />
                    Mis Mascotas
                  </CardTitle>
                  <CardDescription>
                    {estadisticas.totalMascotas > 3 
                      ? `Mostrando 3 de ${estadisticas.totalMascotas} mascotas` 
                      : `${estadisticas.totalMascotas} ${estadisticas.totalMascotas === 1 ? 'mascota registrada' : 'mascotas registradas'}`
                    }
                  </CardDescription>
                </div>
                {estadisticas.totalMascotas > 3 && (
                  <Button variant="outline" asChild>
                    <Link to="/portal/mis-mascotas">
                      Ver todas
                    </Link>
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {pacientes.map((mascota) => (
                  <div key={mascota._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-slate-900">{mascota.nombre}</h3>
                        <p className="text-xs text-muted-foreground">{mascota.numeroHistoriaClinica}</p>
                      </div>
                      <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center">
                        <PawPrint className="h-4 w-4 text-gray-900" />
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Especie:</span>
                        <span className="font-medium text-slate-900">{mascota.especie}</span>
                      </div>
                      {mascota.raza && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Raza:</span>
                          <span className="font-medium text-slate-900">{mascota.raza}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Sexo:</span>
                        <span className="font-medium text-slate-900">{mascota.sexo}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Información importante */}
        <Card className="mt-8 border-blue-200 bg-blue-50/50">
          <CardHeader>
            <CardTitle className="text-blue-900 flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Información Importante
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Las citas solicitadas deben ser confirmadas por nuestra recepción</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Puedes ver el historial médico completo de tus mascotas</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Para cambios en tus datos personales, contacta con recepción</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>En caso de emergencia, llámanos directamente al teléfono de la clínica</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t bg-white">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>© 2025 Clínica Veterinaria. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default ClienteDashboard;
