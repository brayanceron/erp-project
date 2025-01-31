import { useEffect, useState } from "react";

type LocationProps = {
    setCountry: (value: string) => void,
    setCity: (value: string) => void,
    countryDefault?: { id: string, name: string },
    cityDefault?: { id: string, name: string },
}

export function LocationComponent({ setCountry, setCity, countryDefault, cityDefault }: LocationProps) {

    console.log("=============== RENDER =============================");

    const [countries, setCountries] = useState([])
    const [countrySelected, setCountrySelected] = useState('')

    const [cities, setCities] = useState([])
    const [citySelected, setCitySelected] = useState('')


    const getCountries = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/ubicacion/pais/get")
            if (res.status == 200) {
                const data = await res.json()
                setCountries(data)

                let val = countryDefault ? data.find((item: any) => item['id'] == countryDefault['id']) : data[0]
                if (!val) { val = data[0] }  // alert  countryDefault not found 
                setCountrySelected(val['id'])
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
            const res = await fetch(`http://localhost:5000/api/ubicacion/pais/get/${countrySelected}/ciudades`) // const res = await fetch(`http://localhost:5000/api/ubicacion/pais/get/${countrySelected['id']}/ciudades`)

            if (res.status == 200) {
                console.log("ok");
                const data = await res.json()
                setCities(data)

                let val = cityDefault ? data.find((item: any) => item['id'] == cityDefault['id']) : data[0]
                if (!val) { val = data[0] } // alert  cityDefault not found 
                setCitySelected(val['id'])
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
        const itemSelected = countries.find(item => item['id'] == event.target.value)
        if (!itemSelected) return;
        setCountrySelected(event.target.value) //********** */
        setCountry(itemSelected) // setCountry(event.target.value)
    }

    const onChangeCity = (event: any) => {
        const itemSelected = cities.find(item => item['id'] == event.target.value)
        if (!itemSelected) return;
        setCitySelected(event.target.value) ////********* */
        setCity(itemSelected) // setCity(event.target.value)
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