import { useState } from "react"
import { CardSucursal, CardSucursalType } from "../components/CardSucursal"
import { useLocation } from "../components/Location/useLocation"
import { useFetch } from "../hooks/useFetch"
import { AlertComponent } from "../components/AlertComponent"
// import { Pagination } from "../components/Navigation/Pagination"


export function GetSucursales() {
    const [urlSucursal, setUrlSucursal] = useState(``)    // const { data : sucursales ,error: errorSucursal, isLoading:  isLoadingSucursal } = useFetch(`http://localhost:5000/api/sucursal`)
    const { data: sucursales, error: errorSucursal, isLoading: isLoadingSucursal, res } = useFetch(urlSucursal)

    function updateUrlSucursales(country: any, city: any, allSucursales: boolean) {
        if (allSucursales) { setUrlSucursal((`http://localhost:5000/api/sucursal`)); return }
        setUrlSucursal(`http://localhost:5000/api/sucursal/get/by/ubicacion/${country.id || 'bad'}/${city.id || 'bad'}`) //url = `http://localhost:5000/api/sucursal/get/by/ubicacion/${country.id ? country.id : 'bad'}/${city.id ? city.id : 'bad'}`
    }

    return (
        <>
            <ZoneSelector updateUrlSucursales={updateUrlSucursales} />

            {
                isLoadingSucursal ?
                    <div className="flex justify-center pt-5"><span className="loading loading-bars loading-lg"></span></div>
                    : errorSucursal ?
                        <div className="w-full flex justify-center">
                            <div className="sm:w-full md:w-1/3 max-w-[450px]"><AlertComponent message={errorSucursal.message} /></div>
                        </div>
                        : sucursales && res?.ok ?
                            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 p-3">
                                {sucursales.map((item: CardSucursalType, index: number) => {
                                    return <CardSucursal key={index} name={item.name} country={item.country} city={item.city} phone={item.phone} address={item.address} />
                                })}
                            </div>
                            :
                            <AlertComponent message={"Se ha presentado un error"} />
            }

            {/* <Pagination /> */}

        </>
    )

}


function ZoneSelector({ updateUrlSucursales }: { updateUrlSucursales: (country: any, city: any, continentSelected: boolean) => void }) {

    const { data: continents, error: errorContinent,
        isLoading: isLoadingContinent } = useFetch("http://localhost:5000/api/ubicacion/continente/get")
    const [filter, setFilter] = useState(false)

    const [continentSelected, setContinentSelected] = useState('')
    const onChangeContinent = (event: any) => { setContinentSelected(event.target.value) }


    const { isLoadingCountries, isLoadingCities, errorCountries, errorCities, formData,
        onChangeField, countries, cities } = useLocation({ getData: (country, city) => updateUrlSucursales(country, city, continentSelected === 'noContinent' ? true : false), continent: continentSelected, filter: filter })


    return (

        <>
            <div className="join drop-shadow mt-3 w-full justify-center">
                <input type="radio" name="continent" aria-label="All Branch" value={'noContinent'} onChange={onChangeContinent}
                    className="join-item btn btn-sm hover:bg-black hover:text-white"
                />
                {
                    isLoadingContinent ? <h1>Loading...</h1> :
                        errorContinent !== null ? <h1>{"Error :("}</h1> :
                            continents.continents.map((item: any, index: number) => {
                                return (
                                    <input key={index} type="radio" name="continent" aria-label={item} value={item} onChange={onChangeContinent}
                                        className="join-item btn btn-sm hover:bg-black hover:text-white"
                                    />
                                )
                            })
                }
                <input type="radio" name="continent" aria-label="All Countries" value={''} onChange={onChangeContinent}
                    className="join-item btn btn-sm hover:bg-black hover:text-white" defaultChecked={true}
                />
            </div>


            <br />

            {
                continentSelected !== 'noContinent' ?

                    <div className="join mt-3 mb-0 mx-2 w-full justify-center">

                        <select
                            className="select select-sm rounded-full sm:w-auto md:w-60 lg:w-56 appearance-none join-item pr-10"
                            aria-label="select"
                            name="country"
                            id="country"
                            onChange={onChangeField}
                            value={formData.country}
                            disabled={formData.country ? false : true}
                        >
                            {
                                isLoadingCountries ?
                                    <option>Cargando...</option>
                                    : errorCountries !== null ?
                                        <option value={"bad"}>{"Error :("}</option> :
                                        countries.map((item: any) => <option key={item.id} value={item.id}>{item.name}</option>)
                            }
                        </select>

                        <select
                            className="select select-sm rounded-full sm:w-auto md:w-60 lg:w-56 appearance-none join-item pr-10"
                            aria-label="select"
                            name="city"
                            id="city"
                            onChange={onChangeField}
                            value={formData.city}
                            disabled={formData.city ? false : true}
                        >
                            {
                                isLoadingCities || isLoadingCountries ?
                                    <option>Cargando...</option>
                                    : errorCities !== null ?
                                        <option value={"bad"}>{"Error :("}</option> :
                                        cities.map((item: any) => <option key={item.id} value={item.id}>{item.name}</option>)
                            }
                        </select>
                    </div>

                    : ''
            }

            <div className="flex px-3 justify-end mt-0 mx-0">

                <button aria-label="Icon Button"
                    className={`btn btn-square btn-sm ${filter ? 'bg-black text-white' : 'btn-outline'}`}
                    onClick={_ => setFilter(!filter)}>
                    <span className="icon-[tabler--filter]"></span>
                </button>

                <button className="btn btn-square btn-sm btn-soft ml-1 mr-2" aria-label="Soft Icon Button">
                    <span className="icon-[tabler--layout-grid]"></span>
                </button>

            </div>
        </>
    )
}