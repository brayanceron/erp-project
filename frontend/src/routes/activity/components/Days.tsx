import {  ReactNode } from "react";
import Day from "./Day";

const Days = ({ tasks, beforeTasks, month, year }: { tasks: [], beforeTasks:[], month : number, year : number }) => {
    return (
        <div className="w-full grid grid-cols-7">
            { generateBeforeDays(beforeTasks, month, year)}
            { generateDays(tasks, month, year)}
        </div>
    );
}

function generateDays(tasks : [],  month = (new Date().getMonth() + 1), year = (new Date().getFullYear())) : ReactNode[] { //mes de 1 a 12
    console.log(tasks, 'NOW')
    const d: ReactNode[] = [];
    let initDate = new Date(year, month - 1)

    // DIAS DEL MES SELECCIONADO
    for (let i = 0; i < 32; i++) {
        if (initDate.getMonth() !== month - 1) break
        const newTasks = tasks.filter(t => {
            const cp = new Date(t['date'])
            return cp.getFullYear() === initDate.getFullYear() && cp.getMonth() === initDate.getMonth() && cp.getDate() === initDate.getDate()
        });
        d.push(<Day date={new Date(initDate.getFullYear(), initDate.getMonth(), initDate.getDate())} tasks={newTasks} key={i} />)
        initDate.setDate(initDate.getDate() + 1)
    }
    return d;
}
function generateBeforeDays(tasks : [],  month = (new Date().getMonth() + 1), year = (new Date().getFullYear())) : ReactNode[] { //mes de 1 a 12
    const d : ReactNode[] = [];
    let initDate = new Date(year, month - 1)
    
    let before_days = initDate.getDay() == 0 ? 7 : initDate.getDay();
    
    // DIAS DEL MES ANTERIOR
    for (let j = before_days - 1; j > 0; j--) {
        let day = new Date(year, month - 1); day.setDate(day.getDate() - j);
        const newTasks = tasks.filter(t => {
            const cp = new Date(t['date'])
            return cp.getFullYear() === day.getFullYear() && cp.getMonth() === day.getMonth() && cp.getDate() === day.getDate()
        });
        d.push(<Day date={day} tasks={newTasks} key={j} />);
    }
    return d ? d : ([<></>]);
}

export default Days
