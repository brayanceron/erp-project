// import React from "react";
import { AlertComponent } from "../components/AlertComponent";
import { useFetch } from "../hooks/useFetch"
import { useParams, useNavigate } from "react-router";
import { ItemInfo } from "./ItemInfo";

export function GetSucursal() {
    let params = useParams();
    let id = params.id || ''

    const { data: sucursal, error: errorSucursal, isLoading: isLoadingSucursal } = useFetch(`http://localhost:5000/api/sucursal/${id}`)
    const { data: departamentos, error: errorDepartamentos, isLoading: isLoadingDepartamentos } = useFetch(`http://localhost:5000/api/departamento/get/by/sucursal/${id}`)
    console.log(sucursal);

    return (
        <>
            <div className=" flex justify-center">
                <svg version="1.1" width="200" viewBox="0 0 463 463" enable-background="new 0 0 463 463"><g><path d="m455.5,400h-24.5v-56.5c0-4.142-3.357-7.5-7.5-7.5h-64.5v-24.5c0-4.142-3.357-7.5-7.5-7.5h-32.731l-7.531-240.984c-0.262-8.42-7.067-15.016-15.492-15.016h-32.492c-8.425,0-15.229,6.596-15.492,15.016l-7.531,240.984h-34.712l-6.281-200.984c-0.262-8.42-7.067-15.016-15.492-15.016h-32.492c-8.425,0-15.229,6.596-15.492,15.016l-6.281,200.984h-33.981c-4.143,0-7.5,3.358-7.5,7.5v24.5h-48.5c-4.143,0-7.5,3.358-7.5,7.5v56.5h-24.5c-4.143,0-7.5,3.358-7.5,7.5s3.357,7.5 7.5,7.5h448c4.143,0 7.5-3.358 7.5-7.5s-3.357-7.5-7.5-7.5zm-39.5-49v49h-57v-49h57zm-115.738-159h-41.524l.531-17h40.462l.531,17zm-1-32h-39.524l.781-25h37.962l.781,25zm-40.993,47h42.462l.781,25h-44.024l.781-25zm39.743-87h-37.024l.531-17h35.962l.531,17zm-40.993,127h44.962l.531,17h-46.024l.531-17zm6.235-184h32.492c0.271,0 0.491,0.212 0.5,0.484l.766,24.516h-35.024l.766-24.516c0.009-0.272 0.228-0.484 0.5-0.484zm-7.235,216h46.962l.781,25h-48.524l.781-25zm-68.757-79h-39.524l.781-25h37.962l.781,25zm-39.993,15h40.462l.531,17h-41.524l.531-17zm38.743-55h-37.024l.531-17h35.962l.531,17zm-39.743,87h42.462l.781,25h-44.024l.781-25zm4.985-144h32.492c0.271,0 0.491,0.212 0.5,0.484l.766,24.516h-35.024l.766-24.516c0.009-0.272 0.228-0.484 0.5-0.484zm-6.235,184h44.962l.531,17h-46.024l.531-17zm-42.019,32h241v81h-17v-56.5c0-4.142-3.357-7.5-7.5-7.5s-7.5,3.358-7.5,7.5v56.5h-17v-56.5c0-4.142-3.357-7.5-7.5-7.5s-7.5,3.358-7.5,7.5v56.5h-17v-56.5c0-4.142-3.357-7.5-7.5-7.5s-7.5,3.358-7.5,7.5v56.5h-17v-56.5c0-4.142-3.357-7.5-7.5-7.5h-120.5v-17zm-56,32h169v49h-169v-49z" /><path d="m79.5,360h-16c-4.143,0-7.5,3.358-7.5,7.5s3.357,7.5 7.5,7.5h16c4.143,0 7.5-3.358 7.5-7.5s-3.357-7.5-7.5-7.5z" /><path d="m119.5,360h-16c-4.143,0-7.5,3.358-7.5,7.5s3.357,7.5 7.5,7.5h16c4.143,0 7.5-3.358 7.5-7.5s-3.357-7.5-7.5-7.5z" /><path d="m159.5,360h-16c-4.143,0-7.5,3.358-7.5,7.5s3.357,7.5 7.5,7.5h16c4.143,0 7.5-3.358 7.5-7.5s-3.357-7.5-7.5-7.5z" /><path d="m199.5,360h-16c-4.143,0-7.5,3.358-7.5,7.5s3.357,7.5 7.5,7.5h16c4.143,0 7.5-3.358 7.5-7.5s-3.357-7.5-7.5-7.5z" /><path d="m375.5,375h24c4.143,0 7.5-3.358 7.5-7.5s-3.357-7.5-7.5-7.5h-24c-4.143,0-7.5,3.358-7.5,7.5s3.357,7.5 7.5,7.5z" /></g></svg>
            </div>

            {
                isLoadingSucursal ? <div className="flex justify-center pt-5"><span className="loading loading-bars loading-lg"></span></div>
                    : errorSucursal ?
                        <div className="w-full flex justify-center">
                            <div className="sm:w-full md:w-1/3 max-w-[450px]"><AlertComponent message={errorSucursal.message} /></div>
                        </div>
                        :
                        <>
                            <div className="text-center text-3xl font-bold">
                                <h1>{sucursal.name}</h1>
                            </div>

                            <div className="text-center w-full flex justify-center mt-2">
                                <ItemInfo text={sucursal.id} icon="fingerprint" classContainer="text-center" />
                            </div>


                            <div className="w-full flex justify-center">
                                <div className="sm:w-full md:w-1/2 mt-5 mb-8 grid sm:grid-cols-1 md:grid-cols-3">
                                    <ItemInfo text={sucursal.name} icon="text-spellcheck" />
                                    <ItemInfo text={sucursal.phone} icon="phone" />
                                    <ItemInfo text={sucursal.address} icon="map-pin" />
                                    <ItemInfo text={sucursal.country} icon="world" />
                                    <ItemInfo text={sucursal.city} icon="building-estate" />
                                    <ItemInfo text={`${departamentos instanceof Array ? departamentos.length : 0} departamento(s)`} icon="puzzle" />

                                    <div className="col-span-full mt-2 sm:mx-1 md:mx-0">
                                        <textarea className="textarea w-full max-h-[200px]" disabled placeholder="Description" id="textareaLabel">
                                            {sucursal.description}
                                        </textarea>
                                        <div className="label">
                                            <span className="label-text-alt"> </span>
                                            <span className="label-text-alt">Description</span>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </>
            }

            {
                !errorSucursal ?
                    isLoadingDepartamentos ? <div className="flex justify-center pt-5"><span className="loading loading-bars loading-lg"></span></div> :
                        errorDepartamentos ?
                            <div className="w-full flex justify-center">
                                <div className="sm:w-full md:w-1/3 max-w-[450px]"><AlertComponent message={errorDepartamentos.message} /></div>
                            </div>
                            :
                            <>
                                <div className="w-full flex justify-center">
                                    <div className="flex flex-wrap justify-center sm:w-full md:w-4/5">
                                        {
                                            departamentos.map((item: any, index: number) => {
                                                return <CardDepartamento key={index} id={item.id} name={item.name} phone={item.phone} email={item.email} />
                                            })
                                        }
                                    </div>
                                </div>
                                <h1 className="text-center py-5 text-gray-400 text-sm">{`${departamentos instanceof Array ? departamentos.length : 0} departamento(s) encontrado(s)`}</h1>

                            </>
                    :
                    <></>
            }


        </>
    )
}

function CardDepartamento({ id, name, phone, email }: { id : string , name: string, phone: string, email: string }) {
    let  navigate = useNavigate();
    function onClickCardDepartamento(id: string) {
        navigate(`/departamento/get/${id}`)
    }

    return (
        <>
            <div onClick={_ => onClickCardDepartamento(id)} className="card w-[200px] h-[200px] bg-gray-200 justify-center text-center m-2 transition-transform duration-300 hover:bg-gray-300 hover:scale-105">

                <div className="h-full"></div>
                <h1 className="text-xl">{name}</h1>
                <div className="h-full"></div>

                <div className="flex w-full justify-between">

                    <div className="w-auto m-0 px-1 py-1">
                        <div className="flex w-full m-0 p-0 items-start justify-start">
                            <span className="icon-[tabler--mail] m-0 p-0 mr-1"></span>
                            <p className="text-[0.6rem] m-0 p-0">{email}</p>
                        </div>
                    </div>

                    <div className="w-auto m-0 px-1 py-1">
                        <div className="flex w-full m-0 p-0 items-center justify-end">
                            <span className="icon-[tabler--phone] m-0 p-0 mr-1"></span>
                            <p className="text-[0.6rem] m-0 p-0">{phone}</p>
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}
