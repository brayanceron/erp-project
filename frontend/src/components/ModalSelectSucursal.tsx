import { useEffect, useState } from "react";
import { LocationComponent } from "./Location/LocationComponent";
import { useDependentFields } from "../hooks/useDependentFields";
import { HSOverlay } from "flyonui/flyonui"

type defaultValues = {
    defaultLocationSucursal: {
        country: { id: string, name: string },
        city: { id: string, name: string },
    }
    defaultSucursal: string,
    defaultDepartament: string,
}
export type paramsGetData = {
    id: string, name: string
}
// si los valores por defecto de defaultLocationSucursal, defaultSucursal y defaultDepartament no coinciden, el componente pone el primer item que se obtuvo del fetch.

export function ModalSelectSucursal({ id, getSucursalAndDepartment, defaultValues }: { id : string, getSucursalAndDepartment: (sucursal: paramsGetData, department: paramsGetData) => void, defaultValues?: defaultValues }) {

    function getFieldIAndFieldII(fieldI: any, fieldII: any) { // function getFieldIAndFieldII(fieldI: string, fieldII: string) {
        getSucursalAndDepartment(fieldI, fieldII)
    }

    function onSucursales(fieldI: string, _: string) {
        return `http://localhost:5000/api/departamento/get/by/sucursal/${fieldI}` // return `http://localhost:5000/api/departamento/get/by/sucursal/${formData.sucursal}`
    }
    const [urlSucursales, setUrlSucursales] = useState('')
    const [urlDepartment, setUrlDepartment] = useState('')


    const { formData, onChangeField, fielIStatus, fielIIStatus, onSelect } = useDependentFields({
        getData: getFieldIAndFieldII, urlFieldI: urlSucursales, urlFieldII: urlDepartment, setUrlFieldII: setUrlDepartment,
        onChangeFieldI: onSucursales, onChangeFieldII: undefined,
        fieldIDefault: { id: defaultValues?.defaultSucursal || '', name: '' },
        fieldIIDefault: { id: defaultValues?.defaultDepartament || '', name: '' },
    })
    /* const { formData, onChangeField, fielIStatus, fielIIStatus, onSelect } = usePro(
        getFieldIAndFieldII, urlSucursales, urlDepartment, setUrlDepartment, onSucursales, undefined, undefined,
    ) */

    const { fieldIData: sucursales, isLoadingFieldI: isLoadingSucursales, errorFieldI: errorSucursales } = fielIStatus
    const { fieldIIData: departments, isLoadingFieldII: isLoadingDepartments, errorFieldII: errorDepartments } = fielIIStatus

    function getData(country: any, city: any) {
        setUrlSucursales(`http://localhost:5000/api/sucursal/get/by/ubicacion/${country.id}/${city.id}`)
    }

    useEffect(() => { HSOverlay.autoInit() }, []); // solution bug of modals

    return (
        <>
            <div id={id} className="overlay modal overlay-open:opacity-100 hidden" role="dialog" >
                <div className="modal-dialog overlay-open:opacity-100 modal-dialog-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title">Select Branch</h3>
                            <button type="button" className="btn btn-text btn-circle btn-sm absolute end-3 top-3" aria-label="Close" data-overlay={`#${id}`} >
                                <span className="icon-[tabler--x] size-4"></span>
                            </button>
                        </div>
                        <div className="modal-body">

                            {
                                (defaultValues?.defaultLocationSucursal?.country && defaultValues?.defaultLocationSucursal.city) ?
                                    <LocationComponent
                                        getData={getData}
                                        countryDefault={defaultValues?.defaultLocationSucursal.country}
                                        cityDefault={defaultValues?.defaultLocationSucursal.city}
                                        horizontal={true}
                                        filter={true}
                                    />
                                    :
                                    <LocationComponent getData={getData} horizontal={true} filter={true} />
                            }

                            <div className="w-full">
                                <label className="label label-text" htmlFor="country"> Branch </label>
                                <div className="input-group w-auto">

                                    <span className="input-group-text">
                                        <span className="icon-[tabler--world] text-base-content/80 size-5"></span>
                                    </span>

                                    {
                                        isLoadingSucursales ?
                                            <span className="loading loading-infinity loading-lg"></span>
                                            : errorSucursales !== null ?
                                                <select className="select appearance-none input grow is-invalid"><option value="">Error</option></select>
                                                :
                                                <select className="select appearance-none input grow"
                                                    aria-label="select"
                                                    name="fieldI"
                                                    id="fieldI"
                                                    onChange={onChangeField}
                                                    value={formData.fieldI}
                                                >
                                                    {sucursales.map((item: any) => <option key={item.id} value={item.id}>{item.name}</option>)}
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
                                        isLoadingDepartments ?
                                            <span className="loading loading-infinity loading-lg"></span>
                                            : errorDepartments !== null ?
                                                <select className="select appearance-none input grow is-invalid"><option value="">{errorDepartments?.message}</option></select>
                                                :
                                                <select className="select appearance-none input grow"
                                                    aria-label="select"
                                                    name="fieldII"
                                                    id="fieldII"
                                                    onChange={onChangeField}
                                                    value={formData.fieldII}
                                                >
                                                    {departments.map((item: any) => <option key={item.id} value={item.id}>{item.name}</option>)}
                                                </select>
                                    }
                                </div>
                            </div>
                            {/* <button onClick={_ => { console.log(formData, urlSucursales, urlDepartment); }}> mostrar</button> */}

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-soft btn-secondary" data-overlay={`#${id}`}>Close</button>
                            <button type="button" onClick={_ => onSelect()} className="btn btn-primary" >Select Sucursal</button>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}


export function openModalSelectSucursal(idModal: string) {
    try {
        HSOverlay.open(`#${idModal}`)
    } catch (error) {
        console.log("error al abrir el modal");
    }
}
export function closeModalSelectSucursal(idModal: string) {
    HSOverlay.close(`#${idModal}`)
}