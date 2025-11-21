import { useEffect, useState } from 'react';
import { Calendar, TrendingUp, Users, PawPrint, FileText, Download, Filter } from 'lucide-react';
import useConsultas from '../../hooks/useConsultas';
import usePacientes from '../../hooks/usePacientes';
import useClientes from '../../hooks/useClientes';
import useAuth from '../../hooks/useAuth';

const Reportes = () => {
  const { consultas, obtenerConsultas } = useConsultas();
  const { pacientes, obtenerPacientes } = usePacientes();
  const { clientes, obtenerClientes } = useClientes();
  const { auth } = useAuth();

  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [filtroVeterinario, setFiltroVeterinario] = useState('');

  useEffect(() => {
    obtenerConsultas();
    obtenerPacientes();
    obtenerClientes();

    // Establecer fecha de inicio: hace 30 días
    const hoy = new Date();
    const hace30Dias = new Date(hoy);
    hace30Dias.setDate(hoy.getDate() - 30);
    setFechaInicio(hace30Dias.toISOString().split('T')[0]);
    setFechaFin(hoy.toISOString().split('T')[0]);
  }, []);

  // Filtrar consultas por rango de fechas
  const consultasFiltradas = consultas.filter((consulta) => {
    const fechaConsulta = new Date(consulta.fecha).toISOString().split('T')[0];
    const cumpleFecha =
      (!fechaInicio || fechaConsulta >= fechaInicio) &&
      (!fechaFin || fechaConsulta <= fechaFin);
    const cumpleVet = !filtroVeterinario || consulta.veterinario?._id === filtroVeterinario;
    return cumpleFecha && cumpleVet;
  });

  // Estadísticas generales
  const totalConsultas = consultasFiltradas.length;
  const consultasCompletadas = consultasFiltradas.filter(c => c.estado === 'completada').length;
  const consultasEnTratamiento = consultasFiltradas.filter(c => c.estado === 'en-tratamiento').length;

  // Top diagnósticos
  const diagnosticosMap = {};
  consultasFiltradas.forEach((c) => {
    if (c.diagnostico) {
      const diag = c.diagnostico.toLowerCase().trim();
      diagnosticosMap[diag] = (diagnosticosMap[diag] || 0) + 1;
    }
  });
  const topDiagnosticos = Object.entries(diagnosticosMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  // Top medicamentos prescritos
  const medicamentosMap = {};
  consultasFiltradas.forEach((c) => {
    if (c.medicamentos) {
      c.medicamentos.forEach((med) => {
        const nombre = med.nombre.toLowerCase().trim();
        medicamentosMap[nombre] = (medicamentosMap[nombre] || 0) + 1;
      });
    }
  });
  const topMedicamentos = Object.entries(medicamentosMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  // Consultas por veterinario
  const veterinariosMap = {};
  consultasFiltradas.forEach((c) => {
    if (c.veterinario) {
      const nombre = c.veterinario.nombre;
      veterinariosMap[nombre] = (veterinariosMap[nombre] || 0) + 1;
    }
  });
  const consultasPorVet = Object.entries(veterinariosMap).sort((a, b) => b[1] - a[1]);

  // Consultas por especie
  const especiesMap = {};
  consultasFiltradas.forEach((c) => {
    if (c.paciente?.especie) {
      const especie = c.paciente.especie;
      especiesMap[especie] = (especiesMap[especie] || 0) + 1;
    }
  });
  const consultasPorEspecie = Object.entries(especiesMap).sort((a, b) => b[1] - a[1]);

  // Consultas por mes (últimos 6 meses)
  const consultasPorMes = {};
  consultasFiltradas.forEach((c) => {
    const fecha = new Date(c.fecha);
    const mes = fecha.toLocaleDateString('es-CL', { year: 'numeric', month: 'short' });
    consultasPorMes[mes] = (consultasPorMes[mes] || 0) + 1;
  });

  // Lista de veterinarios únicos
  const veterinariosUnicos = Array.from(
    new Set(consultas.map((c) => c.veterinario).filter(Boolean))
  );

  const handleExportar = () => {
    // Preparar CSV básico
    let csv = 'Fecha,Paciente,Cliente,Veterinario,Diagnóstico,Estado\n';
    consultasFiltradas.forEach((c) => {
      csv += `${new Date(c.fecha).toLocaleDateString('es-CL')},`;
      csv += `${c.paciente?.nombre || 'N/A'},`;
      csv += `${c.cliente?.nombre || 'N/A'} ${c.cliente?.apellido || ''},`;
      csv += `${c.veterinario?.nombre || 'N/A'},`;
      csv += `"${c.diagnostico?.replace(/"/g, '""') || 'N/A'}",`;
      csv += `${c.estado}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `reporte-consultas-${fechaInicio}-${fechaFin}.csv`;
    link.click();
  };

  const limpiarFiltros = () => {
    const hoy = new Date();
    const hace30Dias = new Date(hoy);
    hace30Dias.setDate(hoy.getDate() - 30);
    setFechaInicio(hace30Dias.toISOString().split('T')[0]);
    setFechaFin(hoy.toISOString().split('T')[0]);
    setFiltroVeterinario('');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-slate-900 dark:text-lime-500" />
            Reportes y Estadísticas
          </h1>
          <p className="text-muted-foreground dark:text-slate-300 mt-1">
            Análisis de consultas médicas y actividad clínica
          </p>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-transparent dark:border-gray-700 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground dark:text-gray-400" />
            <input
              type="date"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
              placeholder="Fecha de inicio"
              className="w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-slate-900 dark:focus:ring-lime-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            />
          </div>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground dark:text-gray-400" />
            <input
              type="date"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
              placeholder="Fecha de fin"
              className="w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-slate-900 dark:focus:ring-lime-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground dark:text-gray-400" />
            <select
              value={filtroVeterinario}
              onChange={(e) => setFiltroVeterinario(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-slate-900 dark:focus:ring-lime-500 focus:border-transparent appearance-none bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            >
              <option value="">Todos los veterinarios</option>
              {veterinariosUnicos.map((vet) => (
                <option key={vet._id} value={vet._id}>
                  {vet.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-between items-center">
          {(fechaInicio || fechaFin || filtroVeterinario) && (
            <button
              onClick={limpiarFiltros}
              className="px-4 py-2 text-sm font-medium text-slate-900 dark:text-lime-500 hover:text-slate-700 dark:hover:text-lime-400 transition-colors"
            >
              Limpiar filtros
            </button>
          )}
          <button
            onClick={handleExportar}
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-lime-600 text-white rounded-lg hover:bg-slate-800 dark:hover:bg-lime-700 transition-colors text-sm font-medium ml-auto"
          >
            <Download className="w-4 h-4" />
            Exportar CSV
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Diagnósticos */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-transparent dark:border-gray-700 p-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
            Top 10 Diagnósticos Más Frecuentes
          </h3>
          {topDiagnosticos.length > 0 ? (
            <div className="space-y-3">
              {topDiagnosticos.map(([diagnostico, cantidad], index) => {
                const porcentaje = Math.round((cantidad / totalConsultas) * 100);
                return (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-slate-900 dark:text-white capitalize truncate">
                        {index + 1}. {diagnostico.substring(0, 40)}...
                      </span>
                      <span className="text-gray-600 dark:text-slate-300">
                        {cantidad} ({porcentaje}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full"
                        style={{ width: `${porcentaje}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center py-4">No hay datos disponibles</p>
          )}
        </div>

        {/* Top Medicamentos */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-transparent dark:border-gray-700 p-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
            Top 10 Medicamentos Más Prescritos
          </h3>
          {topMedicamentos.length > 0 ? (
            <div className="space-y-3">
              {topMedicamentos.map(([medicamento, cantidad], index) => {
                const max = topMedicamentos[0][1];
                const porcentaje = Math.round((cantidad / max) * 100);
                return (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-slate-900 dark:text-white capitalize">
                        {index + 1}. {medicamento}
                      </span>
                      <span className="text-gray-600 dark:text-slate-300">{cantidad} veces</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-green-600 dark:bg-green-500 h-2 rounded-full"
                        style={{ width: `${porcentaje}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center py-4">No hay datos disponibles</p>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Consultas por Veterinario */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-transparent dark:border-gray-700 p-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
            Consultas por Veterinario
          </h3>
          {consultasPorVet.length > 0 ? (
            <div className="space-y-3">
              {consultasPorVet.map(([nombre, cantidad], index) => {
                const porcentaje = Math.round((cantidad / totalConsultas) * 100);
                return (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-slate-900 dark:text-white">Dr(a). {nombre}</span>
                      <span className="text-gray-600 dark:text-slate-300">
                        {cantidad} ({porcentaje}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-purple-600 dark:bg-purple-500 h-2 rounded-full"
                        style={{ width: `${porcentaje}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center py-4">No hay datos disponibles</p>
          )}
        </div>

        {/* Consultas por Especie */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-transparent dark:border-gray-700 p-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <PawPrint className="w-5 h-5 text-slate-900 dark:text-lime-500" />
            Consultas por Especie
          </h3>
          {consultasPorEspecie.length > 0 ? (
            <div className="space-y-3">
              {consultasPorEspecie.map(([especie, cantidad], index) => {
                const porcentaje = Math.round((cantidad / totalConsultas) * 100);
                const colors = ['bg-blue-600 dark:bg-blue-500', 'bg-green-600 dark:bg-green-500', 'bg-yellow-600 dark:bg-yellow-500', 'bg-red-600 dark:bg-red-500', 'bg-purple-600 dark:bg-purple-500'];
                return (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-slate-900 dark:text-white">{especie}</span>
                      <span className="text-gray-600 dark:text-slate-300">
                        {cantidad} ({porcentaje}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={`${colors[index % colors.length]} h-2 rounded-full`}
                        style={{ width: `${porcentaje}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center py-4">No hay datos disponibles</p>
          )}
        </div>
      </div>

      {/* Distribución de Pacientes por Especie */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-transparent dark:border-gray-700 p-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <PawPrint className="w-5 h-5 text-slate-900 dark:text-lime-500" />
          Distribución de Pacientes por Especie
        </h3>
        {pacientes.length > 0 ? (
          <div className="space-y-3">
            {(() => {
              const especiesCount = pacientes.reduce((acc, paciente) => {
                acc[paciente.especie] = (acc[paciente.especie] || 0) + 1;
                return acc;
              }, {});
              const totalPacientes = pacientes.length;
              return Object.entries(especiesCount)
                .sort((a, b) => b[1] - a[1])
                .map(([especie, count], index) => {
                  const porcentaje = Math.round((count / totalPacientes) * 100);
                  const colors = [
                    'bg-amber-600 dark:bg-amber-500',
                    'bg-purple-600 dark:bg-purple-500',
                    'bg-sky-600 dark:bg-sky-500',
                    'bg-pink-600 dark:bg-pink-500',
                    'bg-emerald-600 dark:bg-emerald-500',
                    'bg-slate-600 dark:bg-slate-500'
                  ];
                  return (
                    <div key={especie}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-slate-900 dark:text-white">{especie}</span>
                        <span className="text-gray-600 dark:text-slate-300">
                          {count} pacientes ({porcentaje}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className={`${colors[index % colors.length]} h-2 rounded-full transition-all`}
                          style={{ width: `${porcentaje}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                });
            })()}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-center py-4">No hay pacientes registrados</p>
        )}
      </div>

      {/* Resumen del período */}
      <div className="bg-slate-50 dark:bg-gray-800 rounded-lg p-6 border border-slate-200 dark:border-gray-700">
        <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Resumen del Período</h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-gray-500 dark:text-gray-400">Período analizado:</p>
            <p className="font-semibold text-slate-900 dark:text-white">
              {new Date(fechaInicio).toLocaleDateString('es-CL')} -{' '}
              {new Date(fechaFin).toLocaleDateString('es-CL')}
            </p>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400">Total de pacientes:</p>
            <p className="font-semibold text-slate-900 dark:text-white">{pacientes.length}</p>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400">Total de clientes:</p>
            <p className="font-semibold text-slate-900 dark:text-white">{clientes.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reportes;
