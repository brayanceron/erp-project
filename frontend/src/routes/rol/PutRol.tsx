import { useParams } from "react-router"
import FormRolComponent from "../../components/FormRolComponent"
import { useFetch } from "../../hooks/useFetch";
import { Method } from "../../utils/Methods";

const PutRol = () => {
    const params = useParams();
    const id = params.id;
    const { data, isLoading, error } = useFetch(`http://localhost:5000/api/rol/${id}`);
    return (
        <>
            {
                isLoading ? <p>Cargando...</p>
                    : error ? <p>Hubo un error</p>
                        :
                        <div className="w-full h-full flex justify-center items-center">
                            <FormRolComponent
                                defaultValues={ data }
                                url={ `http://localhost:5000/api/rol/${id}` }
                                method={ Method.PUT }
                            />
                        </div>
            }

        </>
    )
}

export default PutRol
