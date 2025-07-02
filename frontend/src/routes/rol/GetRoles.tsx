import { NavLink } from "react-router";
import { useFetch } from "../../hooks/useFetch"

const GetRoles = () => {

    const { data, error, isLoading } = useFetch("http://localhost:5000/api/rol/");
    console.log(data)

    return (
        isLoading ? <p>Cargando...</p>
            : error ? <p>Hubo un error</p> :
                <div>
                    <h1 className="text-xl text-center my-6">CARGOS / ROLES</h1>
                    <div className="">
                        {data.map((item: any) => { return <CardRol id={item.id} name={item.name} /> })}
                    </div>
                </div>
    )
}

const CardRol = ({ id, name, }: { id: string, name: string }) => {

    return (
        <NavLink to={`/rol/get/${id}`} className="inline-block">
            <div className="w-fit flex h-full items-center py-1 px-4 mx-2 my-2 shadow-md rounded-md border-solid align-top transition-transform duration-300 hover:scale-110 hover:bg-gray-200 hover:cursor-pointer">
                <div className="m-0 p-0 inline-block align-center">
                    <span className="icon-[tabler--user-hexagon] size-6"></span>
                </div>
                <div className="m-0 ml-1 p-0 inline-block align-center text-sm font-medium">
                    <h1 className="align-center h-full">{name}</h1>
                </div>
            </div>
        </NavLink>
    )
}

export default GetRoles
