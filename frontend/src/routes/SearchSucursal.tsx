import { useEffect, useState } from "react"
import { useFetch } from "../hooks/useFetch"
import { CardSucursal } from "../components/CardSucursal"
import { AlertComponent } from "../components/AlertComponent"

export function SearchSucursal() {
    const [live, setLive] = useState(false)
    const [pattern, setText] = useState('')
    const [params, setParams] = useState({ id: false, name: true, city: false })
    const [url, setUrl] = useState('')
    const { data: sucursales, isLoading: isLoadingSucursales, error: errorSucursales } = useFetch(url)

    function onKeyUp(event: React.KeyboardEvent) { if (event.code === "Enter" || live) { getSucursales() } }
    function onChangeSearch(event: any) { setText(event.target.value) }
    function onChangeParams(event: any) {
        const key = event.target.id
        const value = event.target.checked
        setParams({ ...params, [key]: value })
    }

    function getSucursales() {
        if (!pattern) return
        let urlParam = `${params.id ? `id=${pattern}&` : ''}${params.name ? `name=${pattern}&` : ''}${params.city ? `city=${pattern}&` : ''}t=1`
        if (!urlParam) { alert("debe seleccionar un parametro"); return }
        setUrl(`http://localhost:5000/api/sucursal/search?${urlParam}`);
    }

    useEffect(() => {
        getSucursales()
    }, [params])

    return (
        <>
            <div className="w-full flex justify-center items-center pt-8 pb-2">
                    <span className="icon-[tabler--building-factory-2] size-20"></span>
            </div>

            <div className="w-full flex justify-center items-center pt-2 pb-2">
                <div className="sm:w-full max-w-[500px]">
                    <div className="relative">
                        <span onClick={_ => setLive(!live)} className={`icon-[tabler--access-point] ${live ? "bg-green-600" : "bg-gray-300"} text-base-content absolute start-3 top-1/2 size-4 flex-shrink-0 -translate-y-1/2 hover:cursor-pointer hover:bg-gray-500`} ></span>
                        <input onKeyUp={onKeyUp} onChange={onChangeSearch} value={pattern} className="input ps-8 rounded-full text-center" type="text" placeholder="Search for an action" role="combobox" aria-expanded="false" data-combo-box-input="" />
                        <span onClick={_ => getSucursales()} className="icon-[tabler--search] text-base-content absolute end-3 top-1/2 size-4 flex-shrink-0 -translate-y-1/2 hover:cursor-pointer hover:bg-gray-500" ></span>
                    </div>
                </div>
            </div>


            <div className="flex w-full gap-3 horizontal-scrollbar justify-center">
                <div className="flex items-center">
                    <input type="checkbox" className="checkbox checkbox-xs" id="id" name="id" onChange={onChangeParams} checked={params.id} />
                    <label className="label label-text text-xs" htmlFor="id"> Id </label>
                </div>
                <div className="flex items-center">
                    <input type="checkbox" className="checkbox checkbox-xs" id="name" name="name" onChange={onChangeParams} checked={params.name} />
                    <label className="label label-text text-xs" htmlFor="name"> Name </label>
                </div>
                <div className="flex items-center">
                    <input type="checkbox" className="checkbox checkbox-xs" id="city" name="city" onChange={onChangeParams} checked={params.city} />
                    <label className="label label-text text-xs" htmlFor="city"> City </label>
                </div>
            </div>






            {
                !url ? <p></p>
                    : isLoadingSucursales ? <div className="flex justify-center pt-5"><span className="loading loading-bars loading-lg"></span></div>
                        : errorSucursales ?
                            <div className="w-full flex justify-center pt-5">
                                <div className="sm:w-full md:w-1/3 max-w-[450px]"><AlertComponent message={errorSucursales.message} /></div>
                            </div>
                            :
                            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 p-3">
                                {sucursales.map((item: any) => <CardSucursal key={item.id} id={item.id} name={item.name} country={item.country} city={item.city} address={item.address} phone={item.phone} />)}
                            </div>
            }

        </>
    )
}