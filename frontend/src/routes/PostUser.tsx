import { FormUserComponent } from '../components/FormUserComponent'
import { useSearchParams } from 'react-router'
import { useFetch } from '../hooks/useFetch';
import { useEffect, useState } from 'react';

export function PostUser() {
    const [searchParams] = useSearchParams()
    const id_sucursal = searchParams.get('idSucursal');
    const id_departamento = searchParams.get('idDepartment');
    const { ready, defaultValues } = usePostUserRoute(id_sucursal, id_departamento)

    return (
        <div>
            <div className="w-full h-full flex justify-center items-center">
                {
                    ready ?
                        <FormUserComponent url='http://localhost:5000/api/usuario/' defaultValues={defaultValues} />
                        : <p>Wait...</p>
                }
            </div>
        </div>
    );
}

const usePostUserRoute: (id_sucursal: string | null, id_departamento: string | null) => any = (id_sucursal, id_departamento) => {
    const [ready, setReady] = useState(false);
    const [urlSucursal, setUrlSucursal] = useState(id_sucursal ? `http://localhost:5000/api/sucursal/${id_sucursal}` : '')
    const [defaultValues, setDefaultValues] = useState((!id_sucursal && !id_departamento) ? {} : { id_sucursal, id_departamento, name_sucursal: null, name_departamento: null, id_country_sucursal: null, id_city_sucursal: null })

    const { data: sucursal, error: errorSucursal, isLoading: isLoadingSucursal } = useFetch(urlSucursal)
    const { data: departamento, error: errorDepartamento, isLoading: isLoadingDepartamento } = useFetch(id_departamento ? `http://localhost:5000/api/departamento/${id_departamento}` : '')

    useEffect(() => { setReady((!isLoadingSucursal && !isLoadingDepartamento) ? true : false) }, [isLoadingSucursal, isLoadingDepartamento])
    useEffect(() => {
        if (!errorSucursal && !isLoadingSucursal) {
            setDefaultValues({
                ...defaultValues, name_sucursal: sucursal.name, id_sucursal: sucursal.id,
                id_country_sucursal: sucursal.country_id,
                id_city_sucursal: sucursal.city_id
            })
        }
    }
        , [sucursal])

    useEffect(() => {
        if (!errorDepartamento && !isLoadingDepartamento) {
            setDefaultValues({ ...defaultValues, name_departamento: departamento.name, id_departamento: departamento.id })
        }
    },
        [departamento])

    useEffect(() => {
        if (errorDepartamento || isLoadingDepartamento) return; // if (!id_sucursal && id_departamento) {} 
        setUrlSucursal(`http://localhost:5000/api/sucursal/${departamento.id_sucursal}`)
    }, [departamento])

    return { defaultValues, ready }
}
