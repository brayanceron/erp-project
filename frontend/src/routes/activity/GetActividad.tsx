import { useParams } from "react-router";
import { useFetch } from "../../hooks/useFetch"

const GetActividad = (  ) => {
    let params = useParams();
    let id = params.id || '';

    const { data, isLoading, error } = useFetch(`http://localhost:5000/api/actividad/${id}`);

    return (
        <div>
            
            {
                isLoading ? <p>Cargando...</p> :
                    error ? <p>Hubo un error:  {error.message} </p> :
                        <div className="shadow-md rounded-md m-3 p-4">

                            <h1 className="text-4xl font-extrabold">{data.title}</h1>

                            <div className="flex w-full my-6">
                                <IconLabel label={data.id}   icon={"fingerprint"} />
                                <IconLabel label={data.date} icon={"calendar"} />
                                <IconLabel label={data.time} icon={"clock"} />
                            </div>

                            <IconLabel label="Description" icon={"text-recognition"} bg="transparent" text_color="black" />

                            <div className="border-[3px] border-gray-500 border-dashed py-6 px-2">
                                <h1 className="text-xl font-bold">{data.title}</h1>
                                <br />
                                <p>{data.description}</p>
                            </div>

                        </div>
            }
        </div>
    )
}

function IconLabel({ label, icon, bg = 'black', text_color = "white" }: { label: string, icon: string, bg?: string, text_color?: string }) {
    return (
        <p className={`bg-${bg} py-[2px] px-2 w-full rounded-lg inline-block mr-1 box-border`}>
            <span className={`input-group-text align-text-top text-${text_color} text-sm`}>
                <span className={`icon-[tabler--${icon}] text-${text_color} text-base-content/80 size-5 mr-1 text-sm`}></span>
                {label}
            </span>
        </p>
    );
}



export default GetActividad
