import { useLocation, useNavigate } from 'react-router';
import { useFetch } from '../../hooks/useFetch';
import Header from './components/Header'

const user_id = '725b5a63-41fe-4de0-927d-15532a8592fc';
const GetByDate = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search); // Obtener los parámetros de consulta
    const date = params.get('date');

    const { data, isLoading, error } = useFetch(`http://localhost:5000/api/actividad/get/by/usuario/by/fecha?id_user=${user_id}&date=${date}`);

    return (
        <>
            <Header user_id={user_id} getDate={() => { }}></Header>
            <h1 className='text-xl font-extrabold text-center my-9'>Actividades del {date?.replace('-', '/').replace('-', '/')}</h1>
            <div className='grid grid-cols-2 w-fit gap-3 mx-auto'>
                {
                    isLoading ? <p>Cargando...</p> :
                        error ? <p>Hubo un error : {error.message}</p> :
                            data.map((item: any) => <CardTask id={item.id} title={item.title} time={item.time} />)
                }
            </div>
            <p className='text-center mt-10 text-xs'>{data ? data.length : 0} resultado(s) encontrado(s)</p>
        </>
    )
}

const CardTask = ({ id, title, time }: { id: string, title: string, time: string }) => {
    const navigate = useNavigate();
    const onClick = () => navigate(`/actividad/get/${id}`);
    return (
        <div onClick={onClick} className='py-2 px-4 w-auto rounded-md shadow-md border-t-2 transition-transform duration-300 hover:scale-105 hover:bg-gray-200 hover:cursor-pointer'>
            <div className='flex'>
                <div className='mx-3 text-center'>
                    <span className={`icon-[tabler--clock] size-9 inline-block align-middle`}>
                    </span>
                    <p className='text-xs'>{time}</p>
                </div>
                <div>
                    <p className='text-lg font-bold text-start w-full'>{title}</p>
                    <div>
                        <span className={`icon-[tabler--fingerprint] inline-block align-middle`}>
                        </span>
                        <p className='text-sm inline-block'>{id}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GetByDate
