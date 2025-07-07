import { FormSucursalComponent } from "../components/FormSucursalComponent";
import { useParams } from "react-router"
import { useFetch } from "../hooks/useFetch";
import { Method } from "../utils/Methods";
import { AlertComponent } from "../components/AlertComponent";

export function PutSucursal() {
    let params = useParams()
    let id = params.id

    const { isLoading, data: sucursal, error } = useFetch(`http://localhost:5000/api/sucursal/${id}`)

    return (
        <>
            {
                isLoading ? <div className="flex justify-center pt-5"><span className="loading loading-bars loading-lg"></span></div>
                    : error ?
                        <div className="w-full flex justify-center my-4">
                            <div className="sm:w-full md:w-1/3 max-w-[450px]"><AlertComponent message={error.message} /></div>
                        </div>
                        :
                        <div>
                            <div className="w-full h-full flex justify-center items-center">
                                <FormSucursalComponent
                                    defaultValues={
                                        {
                                            ...sucursal,
                                            country: { id: sucursal.country_id, name: sucursal.country },
                                            city: { id: sucursal.city_id, name: sucursal.city }
                                        }
                                    }
                                    method={Method.PUT} url={`http://localhost:5000/api/sucursal/${id}`}
                                />
                            </div>
                        </div>
            }
        </>
    )
}