import { useParams } from "react-router"
import { useFetch } from "../../hooks/useFetch";

const GetRol = () => {
    const params = useParams()
    const id = params.id;

    const { data, isLoading, error } = useFetch(`http://localhost:5000/api/rol/${id}`);

    return (

        <div className="w-full flex">
            {
                isLoading ? <p>Cargando...</p> :
                    error ? <p>Hubo un error</p> :

                        <div className="mx-auto my-4 p-3 border-solid border-2 border-gray-200 rounded-md inline-block w-auto min-w-[700px] shadow-md">
                            <h1 className="text-2xl font-bold text-center">{data.name}</h1>
                            <div className="px-5 py-1 inline-block text-center text-md w-full">
                                <span className="icon-[tabler--fingerprint] size-4 inline-block mx-1"></span>
                                <p className="inline-block mx-1">{data.id}</p>
                            </div>
                            
                            <div className="w-full">
                                <label className="label label-text text-sm"> Description : </label>
                                <textarea className="textarea" rows={10} disabled >
                                    {data.description}
                                </textarea>
                            </div>
                        </div>
            }
        </div>
    )
}

export default GetRol
