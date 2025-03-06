import { useState } from "react"
import { useForm } from "../hooks/useForm"
import { LocationComponent } from "./Location/LocationComponent"
import { ModalComponent, openModal } from "./ModalComponent"
import { useNavigate } from 'react-router'
import { usePost, paramsPost, Method } from "../hooks/usePost"

type FormSucursal = {
    name?: string,
    country?: { id: string, name: string },
    city?: { id: string, name: string },
    phone?: string,
    address?: string,
    description?: string
}
export function FormSucursalComponent({ defaultValues, url, method = Method.POST, }: { defaultValues?: FormSucursal, title?: string, url : string, method? : Method }) {
    let navigate = useNavigate()
    const { formData, onChangeField, setFields } = useForm({ ...defaultValues })
    const [messageModal, setMessageModal] = useState('')

    function getData(country: any, city: any) {
        const CountryAndCity = [
            { field: 'city', value: city.id },
            { field: 'country', value: country.id },
        ]
        setFields(CountryAndCity)
    }

    function postCallback({ error, data, body }: paramsPost) {
        setMessageModal(error ? error.message : data.message)
        if (!error) { return navigate(`/sucursal/get/${method == Method.POST? data.id : method == Method.PUT ? body.id : ''}`) }
        openModal(null, 'modalFormSucursal')
    }

    const { sendReq, isLoading } = usePost(url, formData, method, postCallback)
    async function onSubmitForm(event: any) {
        event.preventDefault()
        await sendReq()
    }

    return (
        <>
            <ModalComponent id="modalFormSucursal" message={messageModal} vertical="middle" />
            <div className="container card p-7 m-3 sm:w-full md:w-[55%] lg:w-[35%] xl:w-[28%]">
                <form action="" onSubmit={onSubmitForm}>

                    <h3 className="text-2xl font-bold text-center">{method == Method.PUT? "Actualizar" : method == Method.POST? "Registrar" : ''}</h3>

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


                    {
                        (defaultValues?.country && defaultValues?.city) ?
                            <LocationComponent
                                getData={getData}
                                countryDefault={defaultValues.country}
                                cityDefault={defaultValues.city} />
                            :
                            <LocationComponent getData={getData} />
                    }

                    <div className="w-auto">
                        <label className="label label-text" htmlFor="phone"> Phone </label>
                        <div className="input-group w-auto">
                            <span className="input-group-text">
                                <span className="icon-[tabler--phone-filled] text-base-content/80 size-5"></span>
                            </span>
                            <input type="number" placeholder="" className="input grow" value={formData.phone} onChange={onChangeField} id="phone" name="phone" />
                        </div>
                    </div>

                    <div className="auto">
                        <label className="label label-text" htmlFor="phone"> Address </label>
                        <div className="input-group w-auto">
                            <span className="input-group-text">
                                <span className="icon-[tabler--location] text-base-content/80 size-5"></span>
                            </span>
                            <input type="text" placeholder="" className="input grow" value={formData.address} onChange={onChangeField} id="address" name="address" />
                        </div>
                    </div>

                    <div className="auto">
                        <label className="label label-text" htmlFor="phone"> Description </label>
                        <div className="input-group w-auto">
                            <span className="input-group-text">
                                <span className="icon-[tabler--baseline-density-small] text-base-content/80 size-5"></span>
                            </span>
                            {/* <input type="number" placeholder="" className="input grow"   id="description" name="description"/> */}
                            {/* <input type="text" placeholder="" className="input grow" /> */}
                            <textarea className="textarea max-w-sm" value={formData.description} onChange={onChangeField} id="description" name="description" aria-label="Textarea" ></textarea>
                        </div>
                    </div>

                    <div className="w-auto my-3">
                        <button type="submit" className={`btn btn-block bg-black text-white hover:bg-black ${isLoading && "btn-disabled"}`}>
                            {isLoading && <span className="loading loading-spinner loading-sm"></span>}
                            <span>{method == Method.PUT? "Actualizar" : method == Method.POST? "Registrar" : ''}</span>
                        </button>
                    </div>

                </form>
            </div>
        </>
    )
}