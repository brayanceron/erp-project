import { useNavigate } from "react-router";

const TaskItem = ({ title, id }: { title: string, id: string }) => {
    const navigate = useNavigate()
    const onclick = () => navigate(`/actividad/get/${id}`);

    return (
        <div onClick={onclick} className="w-full bg-gray-200 rounded-xl mt-[3px] hover:bg-gray-300 hover:cursor-pointer p-0">
            <span className={`icon-[tabler--circle-check-filled] size-5 inline-block mx-1 align-middle`}>
            </span>
            <p className="inline text-sm">{title}</p>
        </div>
    );
}

export default TaskItem
