import { useState } from "react"
import { useForm } from "../hooks/useForm"
import { usePost, paramsPost } from "../hooks/usePost"
import { LocationComponent } from "./Location/LocationComponent"
import { ModalComponent, openModal } from "./ModalComponent"
import { useNavigate } from 'react-router'
import { ModalSelectSucursal, openModalSelectSucursal } from "./ModalSelectSucursal"
import SelectRolComponent from "./SelectRolComponent"

export function FormUserComponent({ defaultValues, url, method = Method.POST }: { defaultValues?: any, url: string, method?: Method }) { // export function FormUserComponent({ url, defaultValues, method = Method.POST }: { url: string, defaultValues?: FormFields, method?: Method }) {
    const navigate = useNavigate()
    console.log(defaultValues);
    const { formData, onChangeField, setFields } = useForm({ ...defaultValues }) // const { formData, onChangeField } = useForm({ ...formEmptyFields, ...defaultValues })
    const [messageModal, setMessageModal] = useState('')
    const idModal = "ModalSelectSucursal"

    function getData(country: any, city: any) {
        const CountryAndCity = [
            { field: 'city_birth', value: city.id },
            { field: 'country_birth', value: country.id },
        ]
        setFields(CountryAndCity)
    }

    function getSucursalAndDepartment(sucursal: any, department: any) { // function getSucursalAndDepartment(sucursal: paramsGetData, department: paramsGetData) {
        const fields = [
            { field: 'id_sucursal', value: sucursal.id }, { field: 'name_sucursal', value: sucursal.name },
            { field: 'id_departamento', value: department.id }, { field: 'name_departamento', value: department.name }
        ]
        setFields(fields)
    }

    function postCallback({ error, data, body }: paramsPost) {
        setMessageModal(error ? error.message : data.message)
        if (!error) { return navigate(`/usuario/get/${method == Method.POST ? data.id : method == Method.PUT ? body.id : ''}`) }
        openModal(null, 'modalFormUser')
    }

    const { isLoading, sendReq } = usePost(url, formData, method, postCallback)
    async function onSubmitForm(event: any) {
        event.preventDefault()
        console.log(formData);
        await sendReq()
    }


    return (
        <>
            {
                <ModalSelectSucursal
                    id={idModal}
                    getSucursalAndDepartment={getSucursalAndDepartment}
                    defaultValues={
                        defaultValues ? {
                            defaultLocationSucursal: {
                                country: { id: defaultValues.id_country_sucursal, name: '' },
                                city: { id: defaultValues.id_city_sucursal, name: '' }
                            },
                            defaultSucursal: defaultValues.id_sucursal,
                            defaultDepartament: defaultValues.id_departamento
                        } : undefined
                    }
                />
            }


            <div className="container card p-7 m-3 sm:w-full md:w-[55%] lg:w-[35%] xl:w-[28%]">
                <form action="" onSubmit={onSubmitForm} encType="multipart/form-data">

                    <h3 className="text-2xl font-bold text-center">{method === Method.PUT ? 'Actualizar' : method === Method.POST ? 'Registrar' : ''}</h3>

                    <div className="w-auto">
                        {/* <div className=" inline-block md:w-1/2"> */}
                        <label className="label label-text" htmlFor="names"> Names </label>
                        <div className="input-group w-auto">
                            <span className="input-group-text">
                                <span className="icon-[tabler--text-spellcheck] text-base-content/80 size-5"></span>
                            </span>
                            <input type="text" className="input grow" id="names" value={formData.names} onChange={onChangeField} />
                        </div>
                    </div>

                    <div className="w-auto">
                        {/* <div className=" inline-block md:w-1/3"> */}
                        <label className="label label-text" htmlFor="surnames"> Surnames </label>
                        <div className="input-group w-auto">
                            <span className="input-group-text">
                                <span className="icon-[tabler--text-recognition] text-base-content/80 size-5"></span>
                            </span>
                            <input type="text" className="input grow" id="surnames" value={formData.surnames} onChange={onChangeField} />
                        </div>
                    </div>

                    <div className="w-auto">
                        <label className="label label-text" htmlFor="birthdate"> birthdate </label>
                        <div className="input-group w-auto">
                            <span className="input-group-text">
                                <span className="icon-[tabler--cake] text-base-content/80 size-5"></span>
                            </span>
                            <input type="date" className="input grow" id="birthdate" value={formData.birthdate} onChange={onChangeField} />
                        </div>
                    </div>

                    <div className="w-auto">
                        <label className="label label-text" htmlFor="dni"> DNI </label>
                        <div className="input-group w-auto">
                            <span className="input-group-text">
                                <span className="icon-[tabler--credit-card-filled] text-base-content/80 size-5"></span>
                            </span>
                            <input type="number" placeholder="" className="input grow" id="dni" value={formData.dni} onChange={onChangeField} />
                        </div>
                    </div>

                    <div className="max-w-sm* w-auto pt-2">
                        {/* <h6 className="text-base text-base-content mb-1"> Gender :</h6> */}
                        <label className="label label-text" htmlFor="gender"> Gender </label>
                        <div className="w-full">
                            <ul
                                className="border-base-content/25 divide-base-content/25 flex
    flex-col divide-y rounded-box border first:*:rounded-t-box last:*:rounded-b-box sm:flex-row
    sm:divide-x sm:divide-y-0 first:*:sm:rounded-s-box first:*:sm:rounded-tr-none last:*:sm:rounded-e-box
    last:*:sm:rounded-bl-none rtl:divide-x-reverse">
                                <li className="w-full">
                                    <label className="flex cursor-pointer items-center gap-2 p-3">
                                        <input type="radio" name="gender" id="gender" value={'M'} className="radio ms-3" onChange={onChangeField} defaultChecked={defaultValues ? defaultValues.gender === 'M' ? true : false : false} />
                                        <span className="label label-text text-base"> Male </span>
                                    </label>
                                </li>
                                <li className="w-full">
                                    <label className="flex cursor-pointer items-center gap-2 p-3">
                                        <input type="radio" name="gender" id="gender" value={'F'} className="radio ms-3" onChange={onChangeField} defaultChecked={defaultValues ? defaultValues.gender === 'F' ? true : false : false} />
                                        <span className="label label-text text-base"> Female </span>
                                    </label>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className = "px-2 my-2 border-2 border-gray-200 rounded-md">
                        {
                            (defaultValues?.country_birth && defaultValues?.city_birth) ?
                                <LocationComponent
                                    getData={getData}
                                    countryDefault={defaultValues?.country_birth}
                                    cityDefault={defaultValues?.city_birth}
                                />
                                :
                                <LocationComponent getData={getData} />
                        }
                    </div>

                    <div className="w-auto">
                        <label className="label label-text" htmlFor="email"> Email </label>
                        <div className="input-group w-auto">
                            <span className="input-group-text">
                                <span className="icon-[tabler--mail-filled] text-base-content/80 size-5"></span>
                            </span>
                            <input type="text" placeholder="" className="input grow" id="email" value={formData.email} onChange={onChangeField} />
                        </div>
                    </div>

                    <div className="w-auto">
                        <label className="label label-text" htmlFor="phone"> Phone </label>
                        <div className="input-group w-auto">
                            <span className="input-group-text">
                                <span className="icon-[tabler--phone-filled] text-base-content/80 size-5"></span>
                            </span>
                            <input type="number" placeholder="" className="input grow" id="phone" value={formData.phone} onChange={onChangeField} />
                        </div>
                    </div>

                    {/* <div className="w-auto">
                        <label className="label label-text" htmlFor="role"> Role </label>
                        <div className="input-group w-auto">
                            <span className="input-group-text">
                                <span className="icon-[tabler--user-cog] text-base-content/80 size-5"></span>
                            </span>
                            <input type="text" placeholder="" className="input grow" id="role" value={formData.role} onChange={onChangeField} />
                        </div>
                    </div> 
                    */}
                    <div className="w-auto">
                        <label className="label label-text" htmlFor="phone"> Role </label>
                        <div className="input-group w-auto">
                            <SelectRolComponent value={formData.role} onChangeField={onChangeField}/>
                        </div>
                    </div>

                    <div className = "px-2 my-2 border-2 border-gray-200 rounded-md">
                    <div className="w-full">
                        <label className="label label-text" htmlFor="country"> Branch </label>
                        <div className="input-group w-auto">

                            <span className="input-group-text">
                                <span className="icon-[tabler--world] text-base-content/80 size-5"></span>
                            </span>

                            {
                                <select className="select appearance-none input grow disabledd"
                                    aria-label="select"
                                    name="id_sucursal"
                                    id="id_sucursal"
                                    value={formData?.id_sucursal}
                                    onChange={onChangeField}
                                // disabled
                                >
                                    {
                                        formData ?
                                            formData.id_sucursal ? <option value={formData.id_sucursal}>{formData.name_sucursal}</option>
                                                : <option>Seleccione una sucursal</option>
                                            : <option>Seleccione una sucursal</option>
                                    }
                                </select>
                            }
                        </div>
                    </div>


                    <div className="w-full">
                        <label className="label label-text" htmlFor="country"> Department </label>
                        <div className="input-group w-auto">

                            <span className="input-group-text">
                                <span className="icon-[tabler--world] text-base-content/80 size-5"></span>
                            </span>

                            {
                                <select className="select appearance-none input grow disabledd"
                                    aria-label="select"
                                    name="id_departamento"
                                    id="id_departamento"
                                    value={formData?.id_departamento}
                                    onChange={onChangeField}
                                // disabled
                                >
                                    {
                                        formData ?
                                            formData.id_departamento ? <option value={formData.id_departamento}>{formData.name_departamento}</option>
                                                : <option>Seleccione un departamento</option>
                                            : <option>Seleccione un departamento</option>
                                    }
                                </select>
                            }
                        </div>
                    </div>

                    <button type="button" className="btn btn-outline btn-sm my-1" onClick={_ => { openModalSelectSucursal("ModalSelectSucursal") }}>
                        Buscar sucursal y departamento
                    </button>
                    </div>

                    <div className="w-auto">
                        <label className="label label-text" htmlFor="password"> Password </label>
                        <div className="input-group w-auto">
                            <span className="input-group-text">
                                <span className="icon-[tabler--circle-key-filled] text-base-content/80 size-5" ></span>
                            </span>
                            <input type="password" placeholder="" className="input grow" id="password" value={formData.password} onChange={onChangeField} />
                        </div>
                    </div>


                    <div className="w-auto my-3">
                        <button type="submit" className={`btn btn-block bg-black text-white hover:bg-black ${isLoading && 'btn-disabled'}`}>
                            {isLoading && <span className="loading loading-spinner loading-sm"></span>}
                            <span>{method === Method.PUT ? 'Actualizar' : method === Method.POST ? 'Registrar' : ''}</span>
                        </button>
                    </div>

                </form>
            </div>

            <ModalComponent id="modalFormUser" message={messageModal} />
        </>
    )
}

// <div className="w-auto">
//     <label className="label label-text" htmlFor="password"> Photo </label>
//     <div className="input-group w-auto">
//         {/* <span className="input-group-text"> */}
//         {/* <span className="icon-[tabler--circle-key-filled] text-base-content/80 size-5" ></span> */}
//         {/* </span> */}
//         <input type="file" placeholder="" className="input grow" id="password" /* value={formData.password} */ /* onChange={onChangeField} */ />
//     </div>
// </div>


export enum Method {
    POST = 'POST',
    PUT = 'PUT'
}

/* type FormFields = {
    names?: string,
    surnames?: string,
    birthdate?: string,
    dni?: string,
    gender?: string,
    email?: string,
    phone?: string,
    role?: string,
    password?: string,
    country_birth?: { id: string, name: string },
    city_birth?: { id: string, name: string },
    // country_birth?: string,
    // city_birth?: string,
} */


// TEST EXAMPLE
/* 
<ModalSelectSucursal
                id={idModal+"v2"}
                getSucursalAndDepartment={getSucursalAndDepartment}
                defaultValues={
                    {
                        defaultLocationSucursal: {
                            country: { id: 'COL', name: 'colombia' },
                            city: { id: '4319', name: 'Tumaco' }
                            // city:{ id : '2269' , name : 'Pasto'}
                            // city:{ id : '2282' , name : 'Popayan'}
                            // city:{ id : '2258' , name : 'Cali'}
                        },
                        defaultSucursal: 'cfc44aa0-fb50-4c13-bf82-d8ae7c3ea1ea', //tumaco
                        defaultDepartament: '860f1953-5e01-4e64-ad07-d3c8bb4a15ee', //tumaco dep ventas

                        // defaultSucursal :'08f02c39-a8c6-45ba-a9e2-93fda4e1e3b1', //pasto suc centro exito
                        // defaultDepartament : 'ca742678-a1f5-4d22-97cb-41033436da4d', //pasto dep gerencia

                        // defaultSucursal :'cc7bb3d5-8741-497b-aad4-3557d6b2cc3a', //popayan suc cauca
                        // defaultDepartament : '63c27cab-7cea-4f37-a82b-0cb897dda474', //popayan dep finanzas
                    }
                }
            /> 
*/