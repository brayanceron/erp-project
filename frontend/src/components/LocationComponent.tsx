import { useEffect, useState } from "react";

export function LocationComponent({ setCountry, setCity, countryDefault = {}, cityDefault = {} }: { setCountry: any, setCity: any, countryDefault: any, cityDefault: any }) {

    console.log("=============== RENDER =============================");

    const [countries, setCountries] = useState([])
    // const [countrySelected, setCountrySelected] = useState({ id: '', name: '' })
    const [countrySelected, setCountrySelected] = useState('')

    const [cities, setCities] = useState([])
    // const [citySelected, setCitySelected] = useState({ id: '', name: '' })
    const [citySelected, setCitySelected] = useState('')


    const getCountries = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/ubicacion/pais/get")
            if (res.status == 200) {
                const data = await res.json()
                setCountries(data)

                // const val = countryDefault ? countryDefault : data[0]
                const val = countryDefault ? countryDefault['id'] : data[0]['id']
                setCountrySelected(val) //********** */
                setCountry(val)
                return
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getCitiesByCountry = async () => {
        setCities([])
        try {
            const res = await fetch(`http://localhost:5000/api/ubicacion/pais/get/${countrySelected}/ciudades`)
            // const res = await fetch(`http://localhost:5000/api/ubicacion/pais/get/${countrySelected['id']}/ciudades`)
            if (res.status == 200) {
                const data = await res.json()
                setCities(data)

                const val = cityDefault ? cityDefault['id'] : data[0]['id']
                setCitySelected(val)
                setCity(val)
                return
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => { getCountries() }, [])

    useEffect(() => {
        if (countries.length > 0 && countrySelected) getCitiesByCountry()
    }, [countrySelected])

    //--------------------------------------------
    const onChangeCountry = (event: any) => {
        setCountrySelected(event.target.value) //********** */
        setCountry(event.target.value)
    }

    const onChangeCity = (event: any) => {
        // const itemSelected = cities.find(item => item['id'] == event.target.value)
        setCitySelected(event.target.value) ////********* */
        setCity(event.target.value)
    }


    return (
        <div className="my-2">
            {/* <h4> {title} </h4> */}


            <div className="w-auto">
                <label className="label label-text" htmlFor="country"> Country </label>
                <div className="input-group w-auto">

                    <span className="input-group-text">
                        <span className="icon-[tabler--world] text-base-content/80 size-5"></span>
                    </span>

                    {countries.length > 0 ?
                        <select className="select appearance-none input grow"
                            aria-label="select"
                            name="country"
                            id="country"
                            onChange={onChangeCountry}

                            // value={countrySelected['id']}
                            value={countrySelected}
                        >
                            {countries.map((item: any) => <option key={item.id} value={item.id}>{item.name}</option>)}

                        </select>
                        : <span className="loading loading-infinity loading-lg"></span>
                    }
                    {/* : <option>Error</option>// : <option disabled selected>Error</option> */}
                </div>
            </div>


            <div className="w-auto">
                <label className="label label-text" htmlFor="city"> City </label>
                <div className="input-group w-auto">

                    <span className="input-group-text">
                        <span className="icon-[tabler--building-estate] text-base-content/80 size-5"></span>
                    </span>

                    {cities.length > 0 ?
                        <select
                            className="select appearance-none input grow"
                            aria-label="select"
                            name="city"
                            id="city"
                            onChange={onChangeCity}

                            // value={citySelected['id']}
                            value={citySelected}
                        >
                            {cities.map((item: any) => <option key={item.id} value={item.id}>{item.name}</option>)}
                        </select>

                        : <span className="loading loading-infinity loading-lg"></span>
                    }
                    {/* : <option>Error</option>// : <option disabled selected>Error</option> */}
                </div>
            </div>

            <button className="btn btn-primary my-5 py-1" onClick={event => {
                event.preventDefault()
                console.log(countrySelected, citySelected);
            }}>
                ok
            </button>

        </div>
    )
}