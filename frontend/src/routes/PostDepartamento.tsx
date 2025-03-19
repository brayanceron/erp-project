import { FormDepartmentComponent } from "../components/FormDepartmentComponent";
import { useSearchParams } from 'react-router'

export function PostDepartamento() {
    const [searchParams] = useSearchParams();
    const idSucursal = searchParams.get('idSucursal') || ''
    return (
        <>
            <div>
                <div className="w-full h-full flex justify-center items-center">
                    <FormDepartmentComponent idSucursal={idSucursal} url="http://localhost:5000/api/departamento" />
                </div>
            </div>
        </>
    )
}