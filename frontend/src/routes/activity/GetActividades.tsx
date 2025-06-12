import { useFetch } from "../../hooks/useFetch"
import Header from "./components/Header";
import Calendar from "./components/Calendar";
import { useState } from "react";

const baseUrl = "http://localhost:5000/api/actividad/get/by/usuario/by/mes?id_user=";
const todayDate = new Date();

const GetActividades = () => {
    // const id_user = '8fbb558a-0d76-40fa-84ee-316d5082f34c';
    const id_user = '725b5a63-41fe-4de0-927d-15532a8592fc';
    const [date, setDate] = useState({ month: todayDate.getMonth() + 1, year: todayDate.getFullYear() })

    const { data: tasks, isLoading, error, res } = useFetch(`${baseUrl}${id_user}&month=${date.month}&year=${date.year}`)
    const { data: beforeTasks, isLoading: isLoadingBT, res: resBT } = useFetch(`${baseUrl}${id_user}&month=${date.month === 1 ? 12 : date.month - 1}&year=${date.month === 1 ? date.year - 1: date.year}`)

    const getDate = (val: Date) => { setDate({ ...date, month: val.getMonth() + 1, year: val.getFullYear() }) }

    return (
        <div>
            <Header user_id={id_user} getDate={getDate} />
            {
                (isLoading || isLoadingBT) ? <p>cargando...</p> :
                        !(res?.status ===  404 || res?.status === 200)? <p>{error?.message}</p> : 
                        <Calendar tasks={res?.ok ? tasks : []} beforeTasks={resBT?.ok ? beforeTasks : []} month={date.month} year={date.year} />
            }

        </div>
    )
}


export default GetActividades
