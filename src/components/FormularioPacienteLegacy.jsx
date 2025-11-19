import { useState, useEffect } from "react"
import Alerta from "./Alerta"
import usePacientes from "../hooks/usePacientes"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PawPrint, User, Calendar, Save, X } from "lucide-react"

const Formulario = () => {
    const [nombre, setNombre] = useState('')
    const [especie, setEspecie] = useState('')
    const [fechaNac, setFechaNac] = useState('')
    const [sexo, setSexo] = useState('')
    const [peso, setPeso] = useState('')
    const [raza, setRaza] = useState('')
    const [altura, setAltura] = useState('')
    /* Vacunas */

    const [fechaIngreso, setFechaIngreso] = useState('')
    const [fechaAlta, setFechaAlta] = useState('')
    const [sintomas, setSintomas] = useState('')

    /* Propietario */
    const [propietario, setPropietario] = useState('')
    const [run, setRun] = useState('')
    const [domicilio, setDomicilio] = useState('')
    const [telefono, setTelefono] = useState('')
    const [email, setEmail] = useState('')
    const [id, setId] = useState(null)
    
    const [alerta, setAlerta] = useState({})
    const { guardarPaciente, paciente } = usePacientes()

    useEffect(() =>{
        if(paciente?.nombre){
            setNombre(paciente.nombre)
            setSexo(paciente.sexo)
            setEspecie(paciente.especie)
            setPeso(paciente.peso)
            setRaza(paciente.raza)
            setAltura(paciente.altura)
            /* Vacunas */
            setFechaIngreso(paciente.fechaIngreso)
            setFechaAlta(paciente.fechaAlta)
            setFechaNac(paciente.fechaNac)
            setSintomas(paciente.sintomas)
            /* Propietario */
            setPropietario(paciente.propietario)
            setRun(paciente.run)
            setDomicilio(paciente.domicilio)
            setTelefono(paciente.telefono)
            setEmail(paciente.email)
            setId(paciente._id)
        }
    },[paciente])

    const handleSubmit = e => {
        e.preventDefault()

        // validar el formulario
        if([nombre, sexo, especie, peso, raza, altura, fechaIngreso, fechaAlta,fechaNac, sintomas, propietario, run, domicilio, telefono, email].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }

        guardarPaciente({nombre, sexo, especie, peso, raza, altura, fechaIngreso, fechaAlta, fechaNac, sintomas, propietario, run, domicilio, telefono, email, id})
        setAlerta({
            msg:'Guardado Correctamente'
        })
        setNombre('')
        setSexo('')
        setEspecie('')
        setPeso('')
        setRaza('')
        setAltura('')
        /* Vacunas */
        setFechaIngreso('')
        setFechaAlta('')
        setFechaNac('')
        setSintomas('')
        /* Propietario */
        setPropietario('')
        setRun('')
        setDomicilio('')
        setTelefono('')
        setEmail('')
        setId('')
    }
    const { msg } = alerta

    return (
        <Card className="shadow-xl border-0 bg-linear-to-br from-white to-slate-50">
            <CardHeader className="space-y-1 border-b bg-card">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                        <PawPrint className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                        <CardTitle className="text-2xl">
                            {id ? "Editar Paciente" : "Nuevo Paciente"}
                        </CardTitle>
                        <CardDescription>
                            {id ? "Actualiza la información del paciente" : "Registra un nuevo paciente en el sistema"}
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Datos de la Mascota */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 pb-2 border-b">
                            <PawPrint className="h-5 w-5 text-primary" />
                            <h3 className="text-lg font-semibold text-foreground">Datos de la Mascota</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="nombre">Nombre de la Mascota</Label>
                                <Input
                                    id="nombre"
                                    type="text"
                                    placeholder="Ej: Max, Luna, Firulais"
                                    value={nombre}
                                    onChange={e => setNombre(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="especie">Especie</Label>
                                <Select value={especie} onValueChange={setEspecie}>
                                    <SelectTrigger id="especie">
                                        <SelectValue placeholder="Selecciona una especie" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Felino">Felino</SelectItem>
                                        <SelectItem value="Canina">Canina</SelectItem>
                                        <SelectItem value="Ave">Ave</SelectItem>
                                        <SelectItem value="Reptil">Reptil</SelectItem>
                                        <SelectItem value="Peces">Peces</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="fechaNac">Fecha de Nacimiento</Label>
                                <Input
                                    id="fechaNac"
                                    type="date"
                                    value={fechaNac}
                                    onChange={e => setFechaNac(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="sexo">Sexo y Condición</Label>
                                <Select value={sexo} onValueChange={setSexo}>
                                    <SelectTrigger id="sexo">
                                        <SelectValue placeholder="Selecciona el sexo" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Macho">Macho</SelectItem>
                                        <SelectItem value="Hembra">Hembra</SelectItem>
                                        <SelectItem value="Macho Castrado">Macho Castrado</SelectItem>
                                        <SelectItem value="Hembra Esteril">Hembra Esteril</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="peso">Peso (Kg)</Label>
                                <Input
                                    id="peso"
                                    type="text"
                                    placeholder="Ej: 15.5"
                                    value={peso}
                                    onChange={e => setPeso(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="raza">Raza</Label>
                                <Input
                                    id="raza"
                                    type="text"
                                    placeholder="Ej: Mestizo, Labrador"
                                    value={raza}
                                    onChange={e => setRaza(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="altura">Altura (Cm)</Label>
                                <Input
                                    id="altura"
                                    type="text"
                                    placeholder="Ej: 45"
                                    value={altura}
                                    onChange={e => setAltura(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="fechaIngreso">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        Fecha de Ingreso
                                    </div>
                                </Label>
                                <Input
                                    id="fechaIngreso"
                                    type="date"
                                    value={fechaIngreso}
                                    onChange={e => setFechaIngreso(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="fechaAlta">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        Fecha de Alta
                                    </div>
                                </Label>
                                <Input
                                    id="fechaAlta"
                                    type="date"
                                    value={fechaAlta}
                                    onChange={e => setFechaAlta(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="sintomas">Síntomas o Motivo de Consulta</Label>
                            <Textarea
                                id="sintomas"
                                placeholder="Describe los síntomas o motivo de la visita..."
                                className="min-h-[100px] resize-none"
                                value={sintomas}
                                onChange={e => setSintomas(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Datos del Propietario */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 pb-2 border-b">
                            <User className="h-5 w-5 text-primary" />
                            <h3 className="text-lg font-semibold text-foreground">Datos del Propietario</h3>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="propietario">Nombre Completo</Label>
                            <Input
                                id="propietario"
                                type="text"
                                placeholder="Nombre del propietario"
                                value={propietario}
                                onChange={e => setPropietario(e.target.value)}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="run">RUN</Label>
                                <Input
                                    id="run"
                                    type="text"
                                    placeholder="12.345.678-9"
                                    value={run}
                                    onChange={e => setRun(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="domicilio">Domicilio</Label>
                                <Input
                                    id="domicilio"
                                    type="text"
                                    placeholder="Dirección completa"
                                    value={domicilio}
                                    onChange={e => setDomicilio(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="telefono">Teléfono</Label>
                                <Input
                                    id="telefono"
                                    type="tel"
                                    placeholder="+56 9 1234 5678"
                                    value={telefono}
                                    onChange={e => setTelefono(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="correo@ejemplo.com"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Botones de Acción */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                        <Button 
                            type="submit" 
                            className="flex-1 gap-2"
                            size="lg"
                        >
                            <Save className="h-4 w-4" />
                            {id ? "Guardar Cambios" : "Agregar Paciente"}
                        </Button>
                        {id && (
                            <Button 
                                type="button"
                                variant="outline"
                                size="lg"
                                onClick={() => {
                                    setNombre('')
                                    setSexo('')
                                    setEspecie('')
                                    setPeso('')
                                    setRaza('')
                                    setAltura('')
                                    setFechaIngreso('')
                                    setFechaAlta('')
                                    setFechaNac('')
                                    setSintomas('')
                                    setPropietario('')
                                    setRun('')
                                    setDomicilio('')
                                    setTelefono('')
                                    setEmail('')
                                    setId('')
                                }}
                                className="gap-2"
                            >
                                <X className="h-4 w-4" />
                                Cancelar
                            </Button>
                        )}
                    </div>

                    {msg && (
                        <div className="pt-2">
                            <Alerta alerta={alerta} />
                        </div>
                    )}
                </form>
            </CardContent>
        </Card>
    )
}

export default Formulario