const Alerta = ({alerta}) => {
    return (
        <div className={`${alerta.error ? 'bg-black' : 'bg-black'} bg-black text-center p-3 py-6 rounded  my-5 uppercase text-white font-bold text-sm mb-10`} >
            {alerta.msg}
        </div>
    )
};

export default Alerta;

