import React, { memo } from "react";
import usePacientes from "../hooks/usePacientes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Calendar, Weight, Ruler, Cake, User, Phone, Mail, MapPin, FileText } from "lucide-react";

const Paciente = memo(function Paciente({ paciente }) {

    const { setEdicion, eliminarPaciente } = usePacientes()
    
    const {nombre, sexo, especie, peso, raza, altura, fechaIngreso, fechaAlta, fechaNac, sintomas, propietario, run, domicilio, telefono, email, _id} = paciente

    const formatearFecha = (fecha) => {
        const nuevaFecha = new Date(fecha)
        return new Intl.DateTimeFormat('es-MX', {dateStyle: 'long'}).format(nuevaFecha)
    }

    const calcularAños = (fechaNacimiento) => {
        const fechaActual = new Date();
        const anoActual = parseInt(fechaActual.getFullYear());
        const mesActual = parseInt(fechaActual.getMonth()) + 1;
        const diaActual = parseInt(fechaActual.getDate());
    

        const anoNacimiento = parseInt(String(fechaNacimiento).substring(0, 4));
        const mesNacimiento = parseInt(String(fechaNacimiento).substring(5, 7));
        const diaNacimiento = parseInt(String(fechaNacimiento).substring(8, 10));
    
        let edad = anoActual - anoNacimiento;
        if (mesActual < mesNacimiento) {
            edad--;
        } else if (mesActual === mesNacimiento) {
            if (diaActual < diaNacimiento) {
                edad--;
            }
        }
        return edad; 
    };
    
    const calcularMeses = (fechaNacimiento) => {
        const fechaActual = new Date();
        const mesActual = parseInt(fechaActual.getMonth()) + 1;
        const diaActual = parseInt(fechaActual.getDate());

        const mesNacimiento = parseInt(String(fechaNacimiento).substring(5, 7));
        const diaNacimiento = parseInt(String(fechaNacimiento).substring(8, 10));

        let meses = 0;
        if (mesActual < mesNacimiento) {
            meses = (12 - mesNacimiento) + mesActual;
        } else if (mesActual === mesNacimiento) {
            if (diaActual < diaNacimiento) {
                meses = 11;
            }
        } else {
            meses = mesActual - mesNacimiento;
        }
        return meses;
    };

    return (
        <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                    <div className="space-y-1">
                        <CardTitle className="text-2xl">{nombre}</CardTitle>
                        <div className="flex gap-2 flex-wrap">
                            <Badge variant="outline">{especie}</Badge>
                            <Badge variant="secondary">{sexo}</Badge>
                            <Badge variant="outline">{raza}</Badge>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button 
                            size="icon" 
                            variant="outline"
                            onClick={() => setEdicion(paciente)}
                        >
                            <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                            size="icon" 
                            variant="destructive"
                            onClick={() => eliminarPaciente(_id)}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
                {/* Datos de la Mascota */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                        <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Datos de la Mascota</h3>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                                <Weight className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">Peso:</span>
                                <span className="text-muted-foreground">{peso} Kg</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <Ruler className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">Altura:</span>
                                <span className="text-muted-foreground">{altura} Cm</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <Cake className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">Edad:</span>
                                <span className="text-muted-foreground">{calcularAños(fechaNac)} años, {calcularMeses(fechaNac)} meses</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">Fecha Nac.:</span>
                                <span className="text-muted-foreground">{formatearFecha(fechaNac)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Historial Clínico */}
                    <div className="space-y-3">
                        <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Historial Clínico</h3>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">Ingreso:</span>
                                <span className="text-muted-foreground">{formatearFecha(fechaIngreso)}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">Alta:</span>
                                <span className="text-muted-foreground">{formatearFecha(fechaAlta)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Síntomas */}
                {sintomas && (
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Síntomas</h3>
                        </div>
                        <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md">{sintomas}</p>
                    </div>
                )}

                {/* Datos del Propietario */}
                <div className="space-y-3 pt-4 border-t">
                    <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Datos del Propietario</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="flex items-center gap-2 text-sm">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">Nombre:</span>
                            <span className="text-muted-foreground">{propietario}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">RUN:</span>
                            <span className="text-muted-foreground">{run}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">Teléfono:</span>
                            <span className="text-muted-foreground">{telefono}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">Email:</span>
                            <span className="text-muted-foreground truncate">{email}</span>
                        </div>
                        <div className="flex items-start gap-2 text-sm md:col-span-2">
                            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                            <div className="flex-1">
                                <span className="font-medium">Domicilio:</span>
                                <span className="text-muted-foreground ml-2">{domicilio}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
});

export default Paciente;