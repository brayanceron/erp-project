import { useState } from "react"
import { useFetch } from "../hooks/useFetch"
import { useForm } from "../hooks/useForm"
import { paramsPost, usePost } from "../hooks/usePost"
import { ModalComponent, openModal } from "./ModalComponent"
import { useNavigate } from "react-router"
import { AlertComponent } from "./AlertComponent"

type FormDepartment = {
    name: string,
    phone: string,
    email: string,
    branch: string,
    description: string
}
export function FormDepartmentComponent({ idSucursal, defaultValues, url, method = Method.POST }: { idSucursal: string, defaultValues?: FormDepartment, url: string, method?: Method }) {
    const navigate = useNavigate()
    const { data: sucursal, isLoading: isLoadingSucursal, error: errorSucursal } = useFetch(`http://localhost:5000/api/sucursal/${idSucursal}`)
    const { formData, onChangeField } = useForm({ ...defaultValues, id_sucursal: idSucursal })
    const [messageModal, setMessageModal] = useState('')


    function postCallback({ error, data, body }: paramsPost) {
        setMessageModal(error ? error.message : data.message)
        if (!error) { return navigate(`/departamento/get/${method == Method.POST ? data.id : method == Method.PUT ? body.id : ''}`)  }
        openModal(null, 'modal')
    }

    const { sendReq, isLoading } = usePost(url, formData, method, postCallback)
    function onSubmitForm(event: React.FormEvent) {
        event.preventDefault()
        sendReq()
    }

    return (
        <>
            <ModalComponent message={messageModal} id="modal" />
            {
                errorSucursal ?
                    <div className="w-full flex justify-center my-4">
                        <div className="sm:w-full md:w-1/3 max-w-[450px]"><AlertComponent message={errorSucursal.message} /></div>
                    </div>
                    :
                    <div className="container card p-7 m-3 sm:w-full md:w-[55%] lg:w-[35%] xl:w-[28%]">
                        <form action="" onSubmit={onSubmitForm}>

                            <h3 className="text-2xl font-bold text-center">{method == Method.PUT ? "Actualizar" : method == Method.POST ? "Registrar" : ''}</h3>

                            <div className="w-auto">
                                {/* <div className=" inline-block md:w-1/2"> */}
                                <label className="label label-text" htmlFor="names"> Name </label>
                                <div className="input-group w-auto">
                                    <span className="input-group-text">
                                        <span className="icon-[tabler--text-spellcheck] text-base-content/80 size-5"></span>
                                    </span>
                                    <input type="text" className="input grow" value={formData.name} onChange={onChangeField} id="name" name="name" />
                                </div>
                            </div>

                            <div className="w-auto">
                                <label className="label label-text" htmlFor="phone"> Phone </label>
                                <div className="input-group w-auto">
                                    <span className="input-group-text">
                                        <span className="icon-[tabler--phone-filled] text-base-content/80 size-5"></span>
                                    </span>
                                    <input type="number" placeholder="" className="input grow" value={formData.phone} onChange={onChangeField} id="phone" name="phone" />
                                </div>
                            </div>

                            <div className="w-auto">
                                <label className="label label-text" htmlFor="phone"> Email </label>
                                <div className="input-group w-auto">
                                    <span className="input-group-text">
                                        <span className="icon-[tabler--mail] text-base-content/80 size-5"></span>
                                    </span>
                                    <input type="email" placeholder="" className="input grow" value={formData.email} onChange={onChangeField} id="email" name="email" />
                                </div>
                            </div>

                            <div className="w-auto">
                                <label className="label label-text" htmlFor="country"> Branch </label>
                                <div className="input-group w-auto">

                                    <span className="input-group-text">
                                        <span className="icon-[tabler--building-factory-2] text-base-content/80 size-5"></span>
                                    </span>
                                    <select className="select w-full" onClick={onChangeField} id="id_sucursal" name="id_sucursal" >
                                        {
                                            isLoadingSucursal ? <option>Cargando...</option> :
                                                <option value={sucursal.id} className="h-[500px] w-full" >
                                                    {sucursal.name}, {sucursal.country},{sucursal.city}, {sucursal.address},
                                                </option>
                                        }
                                    </select>
                                </div>
                            </div>


                            <div className="auto">
                                <label className="label label-text" htmlFor="phone"> Description </label>
                                <div className="input-group w-auto">
                                    <span className="input-group-text">
                                        <span className="icon-[tabler--baseline-density-small] text-base-content/80 size-5"></span>
                                    </span>
                                    <textarea value={formData.description} onChange={onChangeField} className="textarea max-w-sm" id="description" name="description" aria-label="Textarea" ></textarea>
                                </div>
                            </div>

                            <div className="w-auto my-3">
                                <button type="submit" className={`btn btn-block bg-black text-white hover:bg-black ${isLoading && "btn-disabled"}`}>
                                    {isLoading && <span className="loading loading-spinner loading-sm"></span>}
                                    <span>{method == Method.PUT ? "Actualizar" : method == Method.POST ? "Registrar" : ''}</span>
                                </button>
                            </div>

                        </form>
                    </div>
            }
        </>
    )
}
export enum Method {
    POST = 'POST',
    PUT = 'PUT'
}