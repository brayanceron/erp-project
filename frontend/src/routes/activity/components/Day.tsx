import { Link } from "react-router";
import TaskItem from "./TaskItem";

function Day({ date, tasks, limit = 4 }: { date: Date, tasks: string[], limit?: number }) {
    let h = '200px';
    const day : string =  formatDate(date)
    return (
        <div className={`w-full h-[${h}] shadow-md rounded-lg inline-block px-1 mx-1`}>
            <div className="pt-2 mb-4">
                <span className={`icon-[tabler--calendar-week] size-4 inline-block mx-1 align-middle`}>
                </span>
                <p className="text-xs inline">{day.split('-').reverse().join('/')}</p>
            </div>

            {tasks.map((item: any, index: number) => index < limit && <TaskItem title={item.title} id={item.id} />)}

            {
                tasks.length > limit &&
                <div className="text-start p-1"><Link to={`/actividad/get/by/date?date=${day}`} className="text-sm link link-animated">Ver más</Link></div>
            }
        </div>
    );
}

function formatDate(date : Date) : string {
    const year = date.getFullYear(); // Obtiene el año
    const month = String(date.getMonth() +1).padStart(2, '0'); 
    const numberDay = String(date.getDate()).padStart(2, '0'); 

    return `${year}-${month}-${numberDay}`; 
}

export default Day
