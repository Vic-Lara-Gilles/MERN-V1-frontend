import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PawPrint, LogOut, ArrowLeft, Calendar, Home, FileText, CalendarPlus } from 'lucide-react';
import useClienteAuth from '../hooks/useClienteAuth';
import clienteAxios from '../config/axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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
        const { data } = await clienteAxios(`/pacientes/portal/mis-pacientes`, config);
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
          <h2 className="text-4xl font-bold text-slate-900 mb-2">Mis Mascotas</h2>
          <p className="text-muted-foreground text-lg">Información de tus mascotas registradas</p>
        </div>

        {cargando ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : pacientes.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <PawPrint className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No tienes mascotas registradas</h3>
              <p className="text-muted-foreground">Contacta con recepción para registrar a tu mascota</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pacientes.map((paciente) => (
              <Card key={paciente._id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="bg-linear-to-r from-blue-500 to-purple-500 text-white">
                  <CardTitle className="text-white">{paciente.nombre}</CardTitle>
                  <CardDescription className="text-blue-100">{paciente.numeroHistoriaClinica}</CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-3">
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
                  <Button className="mt-4 w-full" asChild>
                    <Link to="/portal/solicitar-cita" state={{ pacienteId: paciente._id }}>
                      <Calendar className="w-4 h-4 mr-2" />
                      Solicitar Cita
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
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

export default MisMascotas;
