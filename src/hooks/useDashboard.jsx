import { useState } from 'react'

const useDashboard = () => {
    const [vistaActiva, setVistaActiva] = useState('hoy')

    return {
        vistaActiva,
        setVistaActiva
    }
}

export default useDashboard
