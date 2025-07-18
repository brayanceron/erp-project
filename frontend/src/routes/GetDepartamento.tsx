import { useContext } from "react"
import { AlertComponent } from "../components/AlertComponent"
import { UserContext } from "../auth/UserContext"
import { useFetch } from "../hooks/useFetch"
import { ItemInfo } from "./ItemInfo"
import { useParams, useNavigate, Link } from 'react-router'

export function GetDepartamento() {
    const { user: loginUser } = useContext<any>(UserContext); // const {user, isLoading : isLoadingUser, error : errorUser} = useContext<any>(UserContext);
    let params = useParams();
    let departmentId = params.id || loginUser.id_departamento || '';

    const { data: departament, isLoading: isLoadingDepartament, error: errorDepartament } = useFetch(`http://localhost:5000/api/departamento/${departmentId}?extended=1`)

    return (
        <>

            {
                isLoadingDepartament ? <div className="flex justify-center pt-5"><span className="loading loading-bars loading-lg"></span></div>
                    : errorDepartament ?
                        <div className="w-full flex justify-center">
                            <div className="sm:w-full md:w-1/3 max-w-[450px]"><AlertComponent message={errorDepartament.message} /></div>
                        </div>
                        :
                        <>
                            <div className=" flex justify-center">
                                <svg version="1.1" width="170" viewBox="0 0 511.995 511.995" ><g><g><path d="M296.045,409.576c-4.304-4.303-9.394-7.724-14.937-10.103l18.425-18.425c2.929-2.93,2.929-7.678,0-10.607 c-2.929-2.928-7.678-2.928-10.606,0l-27.592,27.593c-2.042,2.042-2.73,5.074-1.771,7.797c0.96,2.723,3.397,4.653,6.268,4.963 c7.494,0.811,14.274,4.059,19.608,9.392c6.492,6.492,9.892,15.124,9.571,24.305c-0.319,9.172-4.333,17.561-11.302,23.621 c-12.18,10.589-30.572,10.615-42.781,0.06c-6.324-5.467-10.298-13.024-11.192-21.281c-0.311-2.87-2.241-5.308-4.964-6.267 c-2.722-0.959-5.754-0.272-7.796,1.77l-51.498,51.498l-42.281-42.28c5.532-2.388,10.509-5.771,14.81-10.072 c18.618-18.617,18.618-48.91,0-67.528c-9.018-9.019-21.008-13.985-33.76-13.986c-0.001,0-0.002,0-0.004,0 c-12.753,0-24.744,4.967-33.763,13.986c-4.301,4.302-7.686,9.279-10.072,14.811l-42.282-42.284l51.499-51.498 c2.042-2.042,2.73-5.074,1.771-7.797c-0.96-2.723-3.397-4.653-6.268-4.963c-7.494-0.811-14.274-4.059-19.608-9.392 c-6.492-6.492-9.892-15.124-9.572-24.306c0.32-9.172,4.334-17.562,11.304-23.622c12.178-10.589,30.569-10.615,42.78-0.057 c6.323,5.467,10.297,13.024,11.191,21.281c0.311,2.87,2.241,5.307,4.964,6.266c2.722,0.96,5.755,0.271,7.796-1.77l24.924-24.924 c2.929-2.93,2.929-7.678,0-10.607c-2.929-2.928-7.678-2.928-10.606,0l-15.746,15.746c-2.831-6.598-7.146-12.527-12.711-17.339 c-17.818-15.407-44.659-15.37-62.434,0.085c-10.143,8.819-15.986,21.043-16.452,34.418c-0.46,13.19,4.627,26.106,13.956,35.436 c4.305,4.304,9.395,7.726,14.938,10.104L2.216,341.235c-2.929,2.93-2.929,7.678,0,10.607l48.452,48.452 c3.377,3.376,8.184,4.82,12.858,3.864c4.684-0.958,8.547-4.182,10.332-8.625c1.645-4.093,4.076-7.767,7.227-10.917 c6.187-6.188,14.41-9.594,23.157-9.594h0.002c8.747,0.001,16.97,3.407,23.155,9.594c12.769,12.769,12.769,33.546,0,46.314 c-3.15,3.15-6.824,5.582-10.919,7.228c-4.442,1.786-7.667,5.649-8.624,10.334c-0.956,4.674,0.49,9.48,3.866,12.856l48.452,48.451 c1.464,1.464,3.384,2.196,5.303,2.196s3.839-0.732,5.303-2.196l47.623-47.623c2.831,6.599,7.147,12.528,12.713,17.341 c17.818,15.404,44.66,15.367,62.434-0.089c10.142-8.819,15.984-21.042,16.451-34.417 C310.46,431.822,305.374,418.906,296.045,409.576z" /></g></g><g><g><path d="M509.779,160.154l-47.62-47.619c6.598-2.831,12.527-7.147,17.34-12.712c15.406-17.82,15.369-44.661-0.086-62.434 c-8.819-10.143-21.043-15.986-34.418-16.452c-13.192-0.476-26.105,4.627-35.435,13.956c-4.304,4.305-7.725,9.394-10.104,14.938 L351.821,2.196c-2.928-2.928-7.677-2.928-10.606,0l-48.452,48.452c-3.376,3.376-4.821,8.182-3.865,12.857 c0.958,4.686,4.183,8.548,8.624,10.332c4.095,1.647,7.769,4.079,10.919,7.229c12.769,12.768,12.769,33.544,0,46.313 c-6.186,6.187-14.409,9.594-23.155,9.594c-8.747,0.001-16.971-3.406-23.159-9.594c-3.151-3.15-5.582-6.824-7.228-10.918 c-1.785-4.442-5.648-7.667-10.333-8.624c-4.677-0.957-9.481,0.49-12.856,3.865l-79.883,79.923c-2.929,2.929-2.929,7.677,0,10.606 c1.464,1.465,3.384,2.197,5.303,2.197c1.919,0,3.839-0.732,5.303-2.196l26.15-26.149l42.3,42.3 c-6.599,2.831-12.529,7.148-17.341,12.713c-15.407,17.82-15.369,44.661,0.087,62.433c8.82,10.143,21.043,15.986,34.418,16.452 c13.184,0.434,26.105-4.628,35.434-13.956c4.305-4.305,7.726-9.394,10.105-14.938l42.349,42.349l-24.079,24.079 c-2.929,2.929-2.929,7.677,0,10.607c1.464,1.464,3.384,2.196,5.303,2.196s3.839-0.732,5.303-2.196l58.79-58.79 c0.143-0.144,0.274-0.295,0.404-0.447l17.771-17.772c2.378,5.505,5.784,10.56,10.06,14.836 c9.329,9.329,22.239,14.427,35.435,13.955c13.376-0.466,25.599-6.309,34.419-16.453c15.43-17.747,15.488-44.562,0.134-62.375 c-4.794-5.562-10.705-9.882-17.287-12.723l15.015-15.015c2.929-2.929,2.929-7.677,0-10.607c-2.928-2.928-7.677-2.928-10.606,0 l-24.163,24.163c-2.038,2.039-2.728,5.064-1.774,7.785c0.954,2.72,3.381,4.653,6.246,4.973 c8.233,0.918,15.765,4.902,21.208,11.217c10.521,12.206,10.482,30.58-0.091,42.74c-6.06,6.97-14.45,10.985-23.622,11.305 c-9.187,0.325-17.814-3.08-24.306-9.571c-5.304-5.305-8.547-12.048-9.379-19.502c-0.32-2.864-2.253-5.292-4.973-6.246 c-2.721-0.954-5.745-0.265-7.784,1.774l-51.438,51.439l-51.495-51.496c-2.042-2.041-5.073-2.731-7.796-1.77 c-2.723,0.959-4.653,3.397-4.964,6.267c-0.811,7.495-4.058,14.275-9.391,19.608c-6.492,6.492-15.13,9.884-24.305,9.571 c-9.173-0.32-17.561-4.334-23.622-11.304c-10.59-12.177-10.616-30.569-0.059-42.779c5.467-6.324,13.025-10.298,21.282-11.192 c2.871-0.311,5.308-2.24,6.267-4.963c0.959-2.724,0.271-5.755-1.771-7.797l-51.498-51.498l42.281-42.28 c2.387,5.532,5.771,10.509,10.072,14.809c9.019,9.02,21.01,13.988,33.762,13.987c0.002,0,0.004,0,0.005,0 c12.752-0.001,24.741-4.967,33.76-13.987c18.618-18.617,18.617-48.91,0-67.527c-4.3-4.299-9.277-7.683-14.81-10.071l42.281-42.281 l51.495,51.5c2.041,2.041,5.073,2.728,7.796,1.77c2.723-0.959,4.653-3.397,4.964-6.267c0.811-7.495,4.058-14.275,9.391-19.608 c6.493-6.492,15.112-9.888,24.306-9.571c9.173,0.32,17.562,4.334,23.622,11.303c10.59,12.179,10.615,30.571,0.059,42.781 c-5.468,6.323-13.026,10.297-21.282,11.191c-2.871,0.311-5.308,2.24-6.267,4.964c-0.959,2.723-0.271,5.754,1.771,7.796 l51.495,51.494l-3.784,3.785c-2.929,2.928-2.929,7.677,0,10.606c2.928,2.928,7.677,2.929,10.606-0.001l9.087-9.088 C512.708,167.832,512.708,163.084,509.779,160.154z" /></g></g><g><g><path d="M353.091,142.723c-2.928-2.928-7.677-2.928-10.606,0l-18.698,18.698c-2.929,2.93-2.929,7.678,0,10.607 c1.464,1.464,3.384,2.196,5.303,2.196s3.839-0.732,5.303-2.196l18.698-18.698C356.02,150.4,356.02,145.652,353.091,142.723z" /></g></g><g><g><path d="M174.375,356.34l-18.699-18.698c-2.929-2.928-7.678-2.929-10.606,0.001c-2.929,2.929-2.929,7.677,0,10.606l18.699,18.698 c1.464,1.464,3.384,2.196,5.303,2.196c1.919,0,3.839-0.732,5.303-2.196C177.304,364.017,177.304,359.269,174.375,356.34z" /></g></g></svg>
                            </div>
                            
                            <div className="text-center text-3xl font-bold">
                                <h1>{departament.name}</h1>
                            </div>

                            <div className="text-center w-full flex justify-center mt-2">
                                <ItemInfo text={departament.id} icon="fingerprint" classContainer="text-center" />
                            </div>

                            <div className="w-full flex justify-center">
                                <div className="sm:w-full md:w-1/2 mt-5 mb-8 grid sm:grid-cols-1 md:grid-cols-3">
                                    {/* <ItemInfo text={departament.name} icon="text-spellcheck" /> */}
                                    <ItemInfo text={departament.phone} icon="phone" />
                                    <ItemInfo text={departament.email} icon="mail" />
                                    <ItemInfo text={departament.sucursal.name} icon="building-factory-2" />
                                    <ItemInfo text={departament.sucursal.country} icon="world" />
                                    <ItemInfo text={departament.sucursal.city} icon="building-estate" />
                                    <ItemInfo text={departament.sucursal.address} icon="map-pin" />

                                    <div className="col-span-full mt-2 sm:mx-1 md:mx-0">
                                        <textarea className="textarea w-full max-h-[200px]" disabled placeholder="Description" id="textareaLabel" value={departament.description}>
                                        </textarea>
                                        <div className="label">
                                            <span className="label-text-alt"> </span>
                                            <span className="label-text-alt">Description</span>
                                        </div>
                                    </div>


                                </div>
                            </div>


                            <div className="text-center w-full flex justify-center mt-0 mb-8">
                                <Link to={`/sucursal/get/${departament.sucursal.id}`} className="btn btn-square btn-sm bg-black hover:bg-gray-700" aria-label="Icon Button" >
                                    <span className="icon-[tabler--building-factory-2] text-white"></span>
                                </Link>
                                <Link to={`/departamento/put/${departament.id}`} className="btn btn-square btn-sm bg-black hover:bg-gray-700" aria-label="Icon Button" >
                                    <span className="icon-[tabler--pencil] text-white"></span>
                                </Link>
                                <Link to={`/usuario/post?idSucursal=${departament.sucursal.id}&&idDepartment=${departament.id}`} className="btn btn-square btn-sm bg-black hover:bg-gray-700" aria-label="Icon Button" >
                                    <span className="icon-[tabler--user-plus] text-white"></span>
                                </Link>
                            </div>


                            <div className="w-full flex justify-center gap-1">
                                {
                                    departament.usuarios.map((item: any, index: number) => {
                                        return <UserCard key={index} id={item.id} name={item.names} role={item.role} />
                                    })
                                }

                            </div>

                        </>
            }

        </>
    )
}

function UserCard({ id, name, role }: { id: string, name: string, role: string }) {
    let navigate = useNavigate()
    function onClickUserCard(id: string) { navigate(`/usuario/get/${id}`) }

    return (
        <div onClick={_ => onClickUserCard(id)} className="w-fit border-base-content/20 flex items-center gap-3 rounded-lg border bg-base-100 p-2 shadow hover:cursor-pointer" >
            <img src="https://cdn.flyonui.com/fy-assets/avatar/avatar-10.png" alt="Sophia" className="size-8 rounded-full object-cover" />
            <div className="flex flex-col items-start pe-4">
                <span className="text-base-content font-medium">{name}</span>
                <span className="text-base-content/80 -mt-1 text-xs">{role}</span>
            </div>
        </div>
    )
}