import { useEffect, useState } from "react";
import { useForm } from "../hooks/useForm";

type LocationProps = {
    getData: (country: string, city : string) => void,
    countryDefault?: { id: string, name: string },
    cityDefault?: { id: string, name: string },
}

export function LocationComponent({ getData, countryDefault, cityDefault }: LocationProps) {

    console.log("=============== RENDER  Location =============================");

    const [countries, setCountries] = useState([])
    const [cities, setCities] = useState([])

    const {formData, onChangeField, setField} = useForm({country : '', city : '' }) // const {formData, onChangeField, setField} = useForm({country : {id:'', name:''}, city : {id:'', name:''} })

    const getCountries = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/ubicacion/pais/get")
            if (res.status == 200) {
                const data = await res.json()
                setCountries(data)

                let val = countryDefault ? data.find((item: any) => item['id'] == countryDefault['id']) : data[0]
                if (!val) { val = data[0] }  // alert  countryDefault not found 
                // setCountrySelected(val['id'])
                // setCountry(val)
                setField('country', val['id'])
                return
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getCitiesByCountry = async () => {
        setCities([])
        try {
            const res = await fetch(`http://localhost:5000/api/ubicacion/pais/get/${formData.country}/ciudades`) // const res = await fetch(`http://localhost:5000/api/ubicacion/pais/get/${countrySelected['id']}/ciudades`)
            if (res.status == 200) {
                const data = await res.json()
                setCities(data)

                let val = cityDefault ? data.find((item: any) => item['id'] == cityDefault['id']) : data[0]
                if (!val) { val = data[0] } // alert  cityDefault not found 
                // setCitySelected(val['id'])
                // setCity(val)
                setField('city', val['id'])
                return
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => { getCountries() }, [])

    useEffect(() => {
        console.log("VEZ ::: ", countries.length );
        if (countries.length > 0 && formData.country) { getCitiesByCountry(); }
    }, [formData.country])

    useEffect(()=>{
        const itemSelectedCountries = countries.find(item => item['id'] == formData.country)
        const itemSelectedCity = cities.find(item => item['id'] == formData.city)

        if (!itemSelectedCountries || !itemSelectedCity) return;
        getData(itemSelectedCountries, itemSelectedCity)
    }, [formData.city])


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
                            onChange={onChangeField}
                            value={formData.country}
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
                            onChange={onChangeField}
                            value={formData.city}
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
                console.log(">>>>", formData);
                // console.log(countrySelected, citySelected);
            }}>
                ok
            </button>

        </div>
    )
}