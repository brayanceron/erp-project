import Days from "./Days";

const Calendar = ({ tasks, beforeTasks, month, year }: { tasks: [], beforeTasks: [], month : number, year : number }) => {

    return (
        <div className="p-1 border-gray-200 border-solid border-2 shadow-md m-2">
            <DaysHeaders />
            <Days tasks={tasks} beforeTasks={beforeTasks} month={month} year={year}/>
        </div>
    );
}

const DaysHeaders = () => {
    const days = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
    return (
        <div className="w-full grid grid-cols-7 text-center">
            {days.map(d => <p className='font-bold'>{d}</p>)}
        </div>
    );
}


export default Calendar
