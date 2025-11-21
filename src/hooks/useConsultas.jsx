import { useContext } from 'react';
import ConsultasContext from '../context/ConsultasProvider';

const useConsultas = () => {
    return useContext(ConsultasContext);
};

export default useConsultas;
