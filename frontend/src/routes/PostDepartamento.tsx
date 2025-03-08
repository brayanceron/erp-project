import { FormDepartmentComponent } from "../components/FormDepartmentComponent";

export function PostDepartamento() {
    return (
        <>
            <div>
                <div className="w-full h-full flex justify-center items-center">
                    <FormDepartmentComponent idSucursal="cfc44aa0-fb50-4c13-bf82-d8ae7c3ea1ea" url="http://localhost:5000/api/departamento" />
                </div>
            </div>
        </>
    )
}