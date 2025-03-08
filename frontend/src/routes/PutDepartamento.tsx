import { AlertComponent } from "../components/AlertComponent";
import { FormDepartmentComponent, Method } from "../components/FormDepartmentComponent";
import { useFetch } from "../hooks/useFetch";
import { useParams } from "react-router"

export function PutDepartamento() {
    const params = useParams()
    const id = params.id

    const { isLoading, data: department, error } = useFetch(`http://localhost:5000/api/departamento/${id}`)

    return (
        <>{
            isLoading ? <div className="flex justify-center pt-5"><span className="loading loading-bars loading-lg"></span></div> :
                error ?
                    <div className="w-full flex justify-center my-4">
                        <div className="sm:w-full md:w-1/3 max-w-[450px]"><AlertComponent message={error.message} /></div>
                    </div>
                    :
                    <div>
                        <div className="w-full h-full flex justify-center items-center">

                            <FormDepartmentComponent
                                // idSucursal="fdsf"
                                idSucursal={department.id_sucursal}
                                url={`http://localhost:5000/api/departamento/${id}`}
                                defaultValues={department}
                                method={Method.PUT}
                            />
                        </div>
                    </div>

        }
        </>
    )
}