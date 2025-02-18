import { useEffect, useState } from "react"
import { CardSucursal, CardSucursalType } from "../components/CardSucursal"
import { useLocation } from "../components/Location/useLocation"
import { useFetch } from "../hooks/useFetch"
// import { Pagination } from "../components/Navigation/Pagination"


export function GetSucursales() {
    const [sucursales, setSucursales] = useState([])

    async function getData() {
        const res = await fetch('http://localhost:5000/api/sucursal')
        const data = await res.json()
        if (res.ok) {
            setSucursales(data)
        }
        // console.log(data);
    }
    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <ZoneSelector />

            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 p-3">
                {
                    sucursales.map((item: CardSucursalType, index) => {
                        return <CardSucursal key={index} name={item.name} country={item.country} city={item.city} phone={item.phone} address={item.address} />
                    })
                }
            </div>

            {/* <Pagination /> */}

        </>
    )

}


function ZoneSelector() {

    const { data: continents, error: errorContinent,
        isLoading: isLoadingContinent } = useFetch("http://localhost:5000/api/ubicacion/continente/get")

    const [continentSelected, setContinentSelected] = useState('')
    const onChangeContinent = (event: any) => { setContinentSelected(event.target.value) }


    const { isLoadingCountries, isLoadingCities, errorCountries, errorCities, formData,
        onChangeField, countries, cities } = useLocation({ getData: () => { }, continent: continentSelected })


    return (

        <>
            <div className="join drop-shadow mt-3 w-full justify-center">
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
                <input type="radio" name="continent" aria-label="NoExist" value={"NoExist"} onChange={onChangeContinent}
                    className="join-item btn btn-sm hover:bg-black hover:text-white"
                />
                <input type="radio" name="continent" aria-label="All" value={''} onChange={onChangeContinent}
                    className="join-item btn btn-sm hover:bg-black hover:text-white"
                />
            </div>


            <br />


            <div className="join mt-3 mb-0 mx-2 w-full justify-center">

                <select
                    className="select select-sm rounded-full sm:w-auto md:w-60 lg:w-56 appearance-none join-item pr-10"
                    aria-label="select"
                    name="country"
                    id="country"
                    onChange={onChangeField}
                    value={formData.country}
                >
                    {
                        isLoadingCountries ?
                            <option>Cargando...</option>
                            : errorCountries !== null ?
                                <option>{"Error :("}</option> :
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
                >
                    {
                        isLoadingCities || isLoadingCountries ?
                            <option>Cargando...</option>
                            : errorCities !== null ?
                                <option>{"Error :("}</option> :
                                cities.map((item: any) => <option key={item.id} value={item.id}>{item.name}</option>)
                    }
                </select>
            </div>

            <div className="flex px-3 justify-end mt-0 mx-0">
                
                <button className="btn btn-square btn-sm btn-secondary" aria-label="Icon Button">
                    <span className="icon-[tabler--filter]"></span>
                </button>

                <button className="btn btn-square btn-sm btn-soft ml-1 mr-2" aria-label="Soft Icon Button">
                    <span className="icon-[tabler--layout-grid]"></span>
                </button>

            </div>
        </>
    )
}