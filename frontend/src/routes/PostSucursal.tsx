import { FormSucursalComponent } from "../components/FormSucursalComponent";

export function PostSucursal() {
    return (
        <div>
            <div className="w-full h-full flex justify-center items-center">
                <FormSucursalComponent url="http://localhost:5000/api/sucursal/"/>
            </div>
        </div>
    )
}