import { FormUserComponent, Method } from "../components/FormUserComponent";
import { useParams } from 'react-router'
import { useFetch } from "../hooks/useFetch";


export function PutUser() {
    const params = useParams()
    const idUser = params.id

    const { data: usuario, isLoading, error } = useFetch(`http://localhost:5000/api/usuario/${idUser}?extended=true`)
    // const {} = usuario

    return (
        <>
            {
                isLoading ? <p>Cargando...</p> :
                    error ? <p>Hubo un error</p> :
                        <div>
                            <div className="w-full h-full flex justify-center items-center">
                                <FormUserComponent
                                    url='http://localhost:5000/api/usuario/'
                                    defaultValues={{
                                        ...usuario,
                                        ["country_birth"]: { name: usuario?.name_country_birth, id: usuario?.id_country_birth },
                                        ["city_birth"]: { name: usuario?.name_city_birth, id: usuario?.id_city_birth }
                                    }}
                                    method={Method.PUT}
                                />
                            </div>
                        </div>
            }
        </>
    )
}