import { useEffect, useState } from "react"
import { useForm } from "../../hooks/useForm"
import { useFetch } from "../../hooks/useFetch"

export type LocationProps = {
    getData: (country: string, city: string) => void,
    countryDefault?: { id: string, name: string },
    cityDefault?: { id: string, name: string },
}

export function useLocation({ getData, countryDefault, cityDefault }: LocationProps) {


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


    return {
        countries, cities,
        isLoadingCountries, isLoadingCities,
        errorCountries, errorCities,
        formData, onChangeField,
    }

}