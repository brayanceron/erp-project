import { useEffect, useState } from "react";
import { useForm } from "../hooks/useForm";
import { useFetch } from '../hooks/useFetch'

type LocationProps = {
    getData: (country: string, city: string) => void,
    countryDefault?: { id: string, name: string },
    cityDefault?: { id: string, name: string },
}

export function LocationComponent({ getData, countryDefault, cityDefault }: LocationProps) {

    console.log("=============== RENDER  Location =============================");

    const { formData, onChangeField, setField } = useForm({ country: '', city: '' }) // const {formData, onChangeField, setField} = useForm({country : {id:'', name:''}, city : {id:'', name:''} })
    const [urlCities, setUrlCities] = useState("")
    const { data: countries, isLoading: isLoadingCountries, error: errorCountries } = useFetch("http://localhost:5000/api/ubicacion/pais/get")
    const { data: cities, error: errorCities, isLoading: isLoadingCities } = useFetch(urlCities)

    useEffect(() => {
        if (errorCountries === null && isLoadingCountries === false) {
            let val = countryDefault ? countries.find((item: any) => item['id'] == countryDefault['id']) : countries[0]
            if (!val) { val = countries[0] }  // alert  countryDefault not found 
            setField('country', val['id'])
        }
    }, [countries])

    useEffect(() => {
        if (!formData.country) return
        setUrlCities(`http://localhost:5000/api/ubicacion/pais/get/${formData.country}/ciudades`)
    }, [formData.country])

    useEffect(() => {
        if (errorCities === null && isLoadingCities === false && formData.country) { // if (cities && formData.country) {
            let val = cityDefault ? cities.find((item: any) => item['id'] == cityDefault['id']) : cities[0]
            if (!val) { val = cities[0] } // alert  cityDefault not found 
            setField('city', val['id'])
        }
    }, [cities])

    useEffect(() => {
        if (!countries || !cities) return

        const itemSelectedCountries = countries.find((item: any) => item['id'] == formData.country) // const itemSelectedCountries = countries.find(item => item['id'] == formData.country)
        const itemSelectedCity = cities.find((item: any) => item['id'] == formData.city) // const itemSelectedCity = cities.find(item => item['id'] == formData.city)

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

                    {
                        isLoadingCountries ?
                            <span className="loading loading-infinity loading-lg"></span>
                            : errorCountries !== null ?
                                <select className="select appearance-none input grow is-invalid"><option value="">Error</option></select>
                                :
                                <select className="select appearance-none input grow"
                                    aria-label="select"
                                    name="country"
                                    id="country"
                                    onChange={onChangeField}
                                    value={formData.country}
                                >
                                    {/* {countries.map((item: any) => <option key={item.id} value={item.id}>{item.name}</option>)} */}
                                    {countries.map((item: any) => <option key={item.id} value={item.id}>{item.name}</option>)}
                                </select>
                    }
                </div>
            </div>


            <div className="w-auto">
                <label className="label label-text" htmlFor="city"> City </label>
                <div className="input-group w-auto">

                    <span className="input-group-text">
                        <span className="icon-[tabler--building-estate] text-base-content/80 size-5"></span>
                    </span>

                    {
                        isLoadingCities || isLoadingCountries ?
                            <span className="loading loading-infinity loading-lg"></span>
                            : errorCities !== null ?
                                <select className="select appearance-none input grow is-invalid"><option value="">Error</option></select>
                                :
                                <select
                                    className="select appearance-none input grow"
                                    aria-label="select"
                                    name="city"
                                    id="city"
                                    onChange={onChangeField}
                                    value={formData.city}
                                >
                                    {/* {cities.map((item: any) => <option key={item.id} value={item.id}>{item.name}</option>)} */}
                                    {cities.map((item: any) => <option key={item.id} value={item.id}>{item.name}</option>)}
                                </select>
                    }
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